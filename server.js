/**
 * DAHBI CAR – Location de Voitures Premium au Maroc
 * Main Express Server
 */

'use strict';

const express = require('express');
const path = require('path');
const session = require('express-session');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const db = require('./database/db');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'dahbicars_secret_jwt_2024_change_in_production';
const SESSION_SECRET = process.env.SESSION_SECRET || 'dahbicars_session_2024_change_in_production';

// ─── Multer Storage ───────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'public', 'uploads', 'cars');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `car-${Date.now()}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only images are allowed'));
  }
});

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200, standardHeaders: true, legacyHeaders: false });
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, message: { error: 'Too many login attempts' } });
app.use('/api/', limiter);

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/fonts', express.static(path.join(__dirname, 'fonts')));

// ─── Auth Middleware ──────────────────────────────────────────────────────────
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1] || req.session.adminToken;
  if (!token) return res.status(401).json({ error: 'Authentication required' });
  try {
    req.admin = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// Admin HTML pages are served freely; auth is enforced client-side via JWT

// ─── API: Auth ────────────────────────────────────────────────────────────────
app.post('/api/admin/login', authLimiter, (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username);
  if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = bcrypt.compareSync(password, admin.password_hash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: admin.id, username: admin.username, role: admin.role }, JWT_SECRET, { expiresIn: '24h' });
  req.session.adminLoggedIn = true;
  req.session.adminToken = token;
  req.session.adminUser = { id: admin.id, username: admin.username, role: admin.role };

  res.json({ success: true, token, user: { id: admin.id, username: admin.username, role: admin.role } });
});

app.post('/api/admin/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

app.get('/api/admin/me', requireAuth, (req, res) => {
  res.json({ user: req.admin });
});

// ─── API: Cars ────────────────────────────────────────────────────────────────
app.get('/api/cars', (req, res) => {
  const { category, minPrice, maxPrice, seats, search, available } = req.query;
  let query = 'SELECT * FROM cars WHERE 1=1';
  const params = [];

  if (category && category !== 'all') { query += ' AND category = ?'; params.push(category); }
  if (minPrice) { query += ' AND price_per_day >= ?'; params.push(Number(minPrice)); }
  if (maxPrice) { query += ' AND price_per_day <= ?'; params.push(Number(maxPrice)); }
  if (seats) { query += ' AND seats >= ?'; params.push(Number(seats)); }
  if (search) { query += ' AND (name LIKE ? OR brand LIKE ? OR model LIKE ?)'; const s = `%${search}%`; params.push(s, s, s); }
  if (available === 'true') { query += ' AND is_available = 1'; }

  query += ' ORDER BY is_featured DESC, created_at DESC';
  const cars = db.prepare(query).all(...params);
  res.json({ cars, total: cars.length });
});

app.get('/api/cars/featured', (req, res) => {
  const cars = db.prepare('SELECT * FROM cars WHERE is_featured = 1 AND is_available = 1 ORDER BY created_at DESC LIMIT 6').all();
  res.json({ cars });
});

app.get('/api/cars/slug/:slug', (req, res) => {
  const car = db.prepare('SELECT * FROM cars WHERE slug = ?').get(req.params.slug);
  if (!car) return res.status(404).json({ error: 'Car not found' });
  res.json({ car });
});

app.get('/api/cars/:id', (req, res) => {
  const car = db.prepare('SELECT * FROM cars WHERE id = ?').get(req.params.id);
  if (!car) return res.status(404).json({ error: 'Car not found' });
  res.json({ car });
});

// Admin car routes
app.get('/api/admin/cars', requireAuth, (req, res) => {
  const cars = db.prepare('SELECT * FROM cars ORDER BY created_at DESC').all();
  res.json({ cars, total: cars.length });
});

// Separate image upload endpoint
app.post('/api/admin/upload', requireAuth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ url: `/uploads/cars/${req.file.filename}` });
});

app.post('/api/admin/cars', requireAuth, (req, res) => {
  const { name, brand, model, category, price_per_day, seats, fuel_type, transmission, year, description, features, image_url, is_available, is_featured, slug: customSlug } = req.body;
  if (!name || !price_per_day) return res.status(400).json({ error: 'Name and price are required' });

  const slug = customSlug || name.toLowerCase().replace(/[àâä]/g,'a').replace(/[éèêë]/g,'e').replace(/[îï]/g,'i').replace(/[ôö]/g,'o').replace(/[ùûü]/g,'u').replace(/[ç]/g,'c').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const finalImage = image_url || '/images/car-002-0.webp';
  const boolAvail = is_available === true || is_available === 1 || is_available === 'true' || is_available === '1' ? 1 : 0;
  const boolFeat = is_featured === true || is_featured === 1 || is_featured === 'true' || is_featured === '1' ? 1 : 0;

  try {
    const result = db.prepare(`
      INSERT INTO cars (name, brand, model, slug, category, price_per_day, seats, fuel_type, transmission, year, description, features, image_url, is_available, is_featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(name, brand || name.split(' ')[0], model || name.split(' ')[1] || name, slug, category || 'Berline', Number(price_per_day), Number(seats) || 5, fuel_type || 'Diesel', transmission || 'Manuelle', Number(year) || new Date().getFullYear(), description || '', features || '', finalImage, boolAvail, boolFeat);
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/admin/cars/:id', requireAuth, (req, res) => {
  const { name, brand, model, category, price_per_day, seats, fuel_type, transmission, year, description, features, image_url, is_available, is_featured, slug: customSlug } = req.body;
  const car = db.prepare('SELECT * FROM cars WHERE id = ?').get(req.params.id);
  if (!car) return res.status(404).json({ error: 'Car not found' });

  const slug = customSlug || (name ? name.toLowerCase().replace(/[àâä]/g,'a').replace(/[éèêë]/g,'e').replace(/[îï]/g,'i').replace(/[ôö]/g,'o').replace(/[ùûü]/g,'u').replace(/[ç]/g,'c').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : car.slug);
  const finalImage = image_url !== undefined ? image_url : car.image_url;
  const boolAvail = is_available !== undefined ? (is_available === true || is_available === 1 || is_available === 'true' || is_available === '1' ? 1 : 0) : car.is_available;
  const boolFeat = is_featured !== undefined ? (is_featured === true || is_featured === 1 || is_featured === 'true' || is_featured === '1' ? 1 : 0) : car.is_featured;

  try {
    db.prepare(`
      UPDATE cars SET name=?, brand=?, model=?, slug=?, category=?, price_per_day=?, seats=?, fuel_type=?, transmission=?, year=?, description=?, features=?, image_url=?, is_available=?, is_featured=?, updated_at=CURRENT_TIMESTAMP WHERE id=?
    `).run(name || car.name, brand || car.brand, model || car.model, slug, category || car.category, Number(price_per_day) || car.price_per_day, Number(seats) || car.seats, fuel_type || car.fuel_type, transmission || car.transmission, Number(year) || car.year, description !== undefined ? description : car.description, features !== undefined ? features : car.features, finalImage, boolAvail, boolFeat, req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/admin/cars/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM cars WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// ─── API: Bookings ────────────────────────────────────────────────────────────
app.post('/api/bookings', (req, res) => {
  const { car_id, customer_name, customer_email, customer_phone, pickup_location, dropoff_location, pickup_date, return_date, notes } = req.body;

  if (!car_id || !customer_name || !customer_email || !customer_phone || !pickup_date || !return_date) {
    return res.status(400).json({ error: 'All required fields must be provided' });
  }

  const car = db.prepare('SELECT * FROM cars WHERE id = ?').get(car_id);
  if (!car) return res.status(404).json({ error: 'Car not found' });

  const start = new Date(pickup_date);
  const end = new Date(return_date);
  if (end <= start) return res.status(400).json({ error: 'Return date must be after pickup date' });

  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  const total_price = days * car.price_per_day;
  const booking_ref = 'LTC' + Date.now().toString(36).toUpperCase();

  try {
    const result = db.prepare(`
      INSERT INTO bookings (booking_ref, car_id, customer_name, customer_email, customer_phone, pickup_location, dropoff_location, pickup_date, return_date, days, total_price, notes, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `).run(booking_ref, car_id, customer_name, customer_email, customer_phone, pickup_location || 'Casablanca', dropoff_location || pickup_location || 'Casablanca', pickup_date, return_date, days, total_price, notes || '');

    res.json({ success: true, booking_ref, booking_id: result.lastInsertRowid, total_price, days });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/bookings/ref/:ref', (req, res) => {
  const booking = db.prepare(`
    SELECT b.*, c.name as car_name, c.brand, c.model, c.image_url 
    FROM bookings b LEFT JOIN cars c ON b.car_id = c.id 
    WHERE b.booking_ref = ?
  `).get(req.params.ref);
  if (!booking) return res.status(404).json({ error: 'Booking not found' });
  res.json({ booking });
});

// Admin booking routes
app.get('/api/admin/bookings', requireAuth, (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const offset = (Number(page) - 1) * Number(limit);
  let query = 'SELECT b.*, c.name as car_name FROM bookings b LEFT JOIN cars c ON b.car_id = c.id WHERE 1=1';
  const params = [];
  if (status) { query += ' AND b.status = ?'; params.push(status); }
  query += ' ORDER BY b.created_at DESC LIMIT ? OFFSET ?';
  params.push(Number(limit), offset);

  const bookings = db.prepare(query).all(...params);
  const total = db.prepare('SELECT COUNT(*) as count FROM bookings' + (status ? ' WHERE status = ?' : '')).get(...(status ? [status] : [])).count;
  res.json({ bookings, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
});

app.put('/api/admin/bookings/:id/status', requireAuth, (req, res) => {
  const { status } = req.body;
  const valid = ['pending', 'confirmed', 'active', 'completed', 'cancelled'];
  if (!valid.includes(status)) return res.status(400).json({ error: 'Invalid status' });
  db.prepare('UPDATE bookings SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(status, req.params.id);
  res.json({ success: true });
});

app.delete('/api/admin/bookings/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM bookings WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// ─── API: Contact ─────────────────────────────────────────────────────────────
app.post('/api/contact', (req, res) => {
  const { name, email, phone, message, subject } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'Name, email, and message are required' });

  db.prepare('INSERT INTO contact_messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)').run(name, email, phone || '', subject || 'General Inquiry', message);
  res.json({ success: true, message: 'Your message has been received. We will contact you soon.' });
});

app.get('/api/admin/messages', requireAuth, (req, res) => {
  const messages = db.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 100').all();
  res.json({ messages });
});

app.put('/api/admin/messages/:id/read', requireAuth, (req, res) => {
  db.prepare('UPDATE contact_messages SET is_read = 1 WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

app.put('/api/admin/messages/mark-all-read', requireAuth, (req, res) => {
  db.prepare('UPDATE contact_messages SET is_read = 1').run();
  res.json({ success: true });
});

app.delete('/api/admin/messages/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM contact_messages WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// ─── API: Dashboard Stats ─────────────────────────────────────────────────────
app.get('/api/admin/stats', requireAuth, (req, res) => {
  const total_cars = db.prepare('SELECT COUNT(*) as count FROM cars').get().count;
  const available_cars = db.prepare('SELECT COUNT(*) as count FROM cars WHERE is_available = 1').get().count;
  const total_bookings = db.prepare('SELECT COUNT(*) as count FROM bookings').get().count;
  const pending_bookings = db.prepare("SELECT COUNT(*) as count FROM bookings WHERE status = 'pending'").get().count;
  const confirmed_bookings = db.prepare("SELECT COUNT(*) as count FROM bookings WHERE status = 'confirmed'").get().count;
  const completed_bookings = db.prepare("SELECT COUNT(*) as count FROM bookings WHERE status = 'completed'").get().count;
  const cancelled_bookings = db.prepare("SELECT COUNT(*) as count FROM bookings WHERE status = 'cancelled'").get().count;
  const total_revenue = db.prepare("SELECT COALESCE(SUM(total_price), 0) as total FROM bookings WHERE status IN ('confirmed', 'active', 'completed')").get().total;
  const unread_messages = db.prepare('SELECT COUNT(*) as count FROM contact_messages WHERE is_read = 0').get().count;
  const total_messages = db.prepare('SELECT COUNT(*) as count FROM contact_messages').get().count;
  const recent_bookings = db.prepare("SELECT b.*, c.name as car_name FROM bookings b LEFT JOIN cars c ON b.car_id = c.id ORDER BY b.created_at DESC LIMIT 5").all();
  const recent_messages = db.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 5').all();
  const category_stats = db.prepare('SELECT category, COUNT(*) as count FROM cars GROUP BY category ORDER BY count DESC').all();

  res.json({
    stats: { total_cars, available_cars, total_bookings, pending_bookings, confirmed_bookings, completed_bookings, cancelled_bookings, total_revenue, unread_messages, total_messages },
    recent_bookings, recent_messages, category_stats
  });
});

// ─── Page Routes ──────────────────────────────────────────────────────────────
const pagesDir = path.join(__dirname, 'public');

app.get('/', (req, res) => res.sendFile(path.join(pagesDir, 'index.html')));
app.get('/cars', (req, res) => res.sendFile(path.join(pagesDir, 'cars.html')));
app.get('/cars/:slug', (req, res) => res.sendFile(path.join(pagesDir, 'car-detail.html')));
app.get('/booking', (req, res) => res.sendFile(path.join(pagesDir, 'booking.html')));
app.get('/booking/confirm', (req, res) => res.sendFile(path.join(pagesDir, 'booking-confirm.html')));
app.get('/about', (req, res) => res.sendFile(path.join(pagesDir, 'about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(pagesDir, 'contact.html')));
app.get('/terms', (req, res) => res.sendFile(path.join(pagesDir, 'terms.html')));

// Admin routes – HTML served freely; auth enforced client-side via JWT
app.get('/admin', (req, res) => res.sendFile(path.join(pagesDir, 'admin', 'dashboard.html')));
app.get('/admin/login', (req, res) => res.sendFile(path.join(pagesDir, 'admin', 'login.html')));
app.get('/admin/dashboard', (req, res) => res.sendFile(path.join(pagesDir, 'admin', 'dashboard.html')));
app.get('/admin/cars', (req, res) => res.sendFile(path.join(pagesDir, 'admin', 'cars.html')));
app.get('/admin/bookings', (req, res) => res.sendFile(path.join(pagesDir, 'admin', 'bookings.html')));
app.get('/admin/messages', (req, res) => res.sendFile(path.join(pagesDir, 'admin', 'messages.html')));

// 404 handler
app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  res.status(404).sendFile(path.join(pagesDir, '404.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚗 DAHBI CAR server running at http://localhost:${PORT}`);
  console.log(`   Admin panel: http://localhost:${PORT}/admin`);
  console.log(`   Admin login: admin / admin123\n`);
});

module.exports = app;
