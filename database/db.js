'use strict';

const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

// On Vercel (serverless), use /tmp which is the only writable directory.
// The DB is re-seeded on each cold start from the built-in seed data.
const isVercel = !!process.env.VERCEL;
const dbPath = isVercel
  ? '/tmp/dahbicar.db'
  : path.join(__dirname, 'dahbicar.db');

const db = new Database(dbPath);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ─── Create Tables ────────────────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS cars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    brand TEXT NOT NULL DEFAULT '',
    model TEXT NOT NULL DEFAULT '',
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL DEFAULT 'Berline',
    price_per_day REAL NOT NULL,
    seats INTEGER DEFAULT 5,
    fuel_type TEXT DEFAULT 'Diesel',
    transmission TEXT DEFAULT 'Manuelle',
    year INTEGER DEFAULT 2024,
    description TEXT DEFAULT '',
    features TEXT DEFAULT '',
    image_url TEXT DEFAULT '/images/car-placeholder.jpg',
    is_available INTEGER DEFAULT 1,
    is_featured INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    booking_ref TEXT UNIQUE NOT NULL,
    car_id INTEGER NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    pickup_location TEXT DEFAULT 'Casablanca',
    dropoff_location TEXT DEFAULT 'Casablanca',
    pickup_date TEXT NOT NULL,
    return_date TEXT NOT NULL,
    days INTEGER NOT NULL,
    total_price REAL NOT NULL,
    notes TEXT DEFAULT '',
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT DEFAULT '',
    subject TEXT DEFAULT 'General Inquiry',
    message TEXT NOT NULL,
    is_read INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// ─── Seed Default Admin ───────────────────────────────────────────────────────
const adminExists = db.prepare('SELECT id FROM admins WHERE username = ?').get('admin');
if (!adminExists) {
  const hash = bcrypt.hashSync('admin123', 10);
  db.prepare("INSERT INTO admins (username, email, password_hash, role) VALUES ('admin', 'admin@luxtimecars.com', ?, 'superadmin')").run(hash);
  console.log('Default admin created: admin / admin123');
}

// ─── Seed Sample Cars ─────────────────────────────────────────────────────────
const carCount = db.prepare('SELECT COUNT(*) as count FROM cars').get().count;
if (carCount === 0) {
  const cars = [
    {
      name: 'Dacia Logan', brand: 'Dacia', model: 'Logan', slug: 'dacia-logan',
      category: 'Berline', price_per_day: 190, seats: 5,
      fuel_type: 'Diesel', transmission: 'Manuelle', year: 2025,
      description: 'La Dacia Logan est la berline idéale pour vos déplacements à Casablanca. Fiable, économique et confortable, elle est notre véhicule le plus réservé.',
      features: 'Climatisation,Bluetooth,GPS,Régulateur de vitesse,5 places',
      image_url: '/images/upload-1784051597581-oiq7ohqv41r.jpg',
      is_available: 1, is_featured: 1
    },
    {
      name: 'Dacia Logan BVA', brand: 'Dacia', model: 'Logan BVA', slug: 'dacia-logan-bva',
      category: 'Berline', price_per_day: 250, seats: 5,
      fuel_type: 'Diesel', transmission: 'Automatique', year: 2025,
      description: 'La Dacia Logan en boîte automatique pour un confort de conduite optimal. Idéale pour ceux qui préfèrent une conduite sans effort.',
      features: 'Climatisation,Bluetooth,GPS,Boîte automatique,5 places',
      image_url: '/images/upload-1784051614306-ty4igf4ri7b.jpg',
      is_available: 1, is_featured: 1
    },
    {
      name: 'Dacia Jogger 7 Places', brand: 'Dacia', model: 'Jogger', slug: 'dacia-jogger-7places',
      category: 'Familiale', price_per_day: 300, seats: 7,
      fuel_type: 'Diesel', transmission: 'Manuelle', year: 2025,
      description: 'Le Dacia Jogger est le choix parfait pour les familles et groupes. Avec 7 places et un grand coffre, il offre espace et polyvalence.',
      features: 'Climatisation,7 places,Grand coffre,Bluetooth,GPS,Aide au stationnement',
      image_url: '/images/upload-1784051549117-venfjock7q.jpg',
      is_available: 1, is_featured: 1
    },
    {
      name: 'Hyundai Tucson', brand: 'Hyundai', model: 'Tucson', slug: 'hyundai-tucson',
      category: 'SUV', price_per_day: 490, seats: 5,
      fuel_type: 'Diesel', transmission: 'Automatique', year: 2025,
      description: 'Le Hyundai Tucson est un SUV moderne et élégant, parfait pour tous les terrains marocains. Confort premium et technologie avancée.',
      features: 'Climatisation,GPS,Bluetooth,Caméra de recul,Toit panoramique,Apple CarPlay',
      image_url: '/images/upload-1784202538698-s33kmh3f63a.jpg',
      is_available: 1, is_featured: 1
    },
    {
      name: 'Kia Sportage', brand: 'Kia', model: 'Sportage', slug: 'kia-sportage',
      category: 'SUV', price_per_day: 400, seats: 5,
      fuel_type: 'Diesel', transmission: 'Automatique', year: 2025,
      description: 'Le Kia Sportage offre un équilibre parfait entre style, performance et économie. Un SUV premium à prix accessible.',
      features: 'Climatisation,GPS,Bluetooth,Caméra 360°,Apple CarPlay,Android Auto',
      image_url: '/images/upload-1784051474912-90cy4zjfydr.jpg',
      is_available: 1, is_featured: 1
    },
    {
      name: 'Mercedes-Benz Vito', brand: 'Mercedes-Benz', model: 'Vito', slug: 'mercedes-vito',
      category: 'Utilitaire', price_per_day: 700, seats: 8,
      fuel_type: 'Diesel', transmission: 'Automatique', year: 2024,
      description: 'Le Mercedes-Benz Vito est le véhicule de transport premium par excellence. Idéal pour les transferts aéroport, groupes et voyages d\'affaires.',
      features: 'Climatisation,8 places,Bluetooth,GPS,Cuir,Vitres teintées',
      image_url: '/images/transport-vito-front.webp',
      is_available: 1, is_featured: 1
    },
    {
      name: 'Dacia Duster', brand: 'Dacia', model: 'Duster', slug: 'dacia-duster',
      category: 'SUV', price_per_day: 350, seats: 5,
      fuel_type: 'Diesel', transmission: 'Manuelle', year: 2025,
      description: 'Le Dacia Duster est le SUV aventurier idéal pour explorer le Maroc. Robuste, économique et polyvalent.',
      features: 'Climatisation,4x4,GPS,Bluetooth,Galerie de toit',
      image_url: '/images/car-027-0.webp',
      is_available: 1, is_featured: 0
    },
    {
      name: 'Renault Clio', brand: 'Renault', model: 'Clio', slug: 'renault-clio',
      category: 'Berline', price_per_day: 220, seats: 5,
      fuel_type: 'Essence', transmission: 'Manuelle', year: 2025,
      description: 'La Renault Clio est la citadine parfaite pour naviguer facilement dans Casablanca. Économique et agréable à conduire.',
      features: 'Climatisation,Bluetooth,GPS,USB,5 places',
      image_url: '/images/car-022-0.webp',
      is_available: 1, is_featured: 0
    },
    {
      name: 'Volkswagen Golf', brand: 'Volkswagen', model: 'Golf', slug: 'volkswagen-golf',
      category: 'Berline', price_per_day: 320, seats: 5,
      fuel_type: 'Diesel', transmission: 'Automatique', year: 2025,
      description: 'La Volkswagen Golf est le choix du conducteur exigeant. Technologie allemande, confort supérieur et consommation optimisée.',
      features: 'Climatisation,GPS,Bluetooth,Apple CarPlay,Android Auto,Régulateur adaptatif',
      image_url: '/images/car-002-0.webp',
      is_available: 1, is_featured: 0
    },
    {
      name: 'Ford Ranger', brand: 'Ford', model: 'Ranger', slug: 'ford-ranger',
      category: 'SUV', price_per_day: 550, seats: 5,
      fuel_type: 'Diesel', transmission: 'Automatique', year: 2024,
      description: 'Le Ford Ranger est le pick-up idéal pour les aventures hors-piste au Maroc. Puissance et robustesse à toute épreuve.',
      features: 'Climatisation,4x4,GPS,Bluetooth,Benne,Treuil',
      image_url: '/images/car-009-0.png',
      is_available: 1, is_featured: 0
    },
    {
      name: 'BMW Série 3', brand: 'BMW', model: 'Série 3', slug: 'bmw-serie-3',
      category: 'Luxe', price_per_day: 850, seats: 5,
      fuel_type: 'Diesel', transmission: 'Automatique', year: 2025,
      description: 'La BMW Série 3 représente le summum du luxe et de la performance. Une expérience de conduite exceptionnelle pour vos déplacements VIP.',
      features: 'Cuir,GPS,Bluetooth,Toit ouvrant,Sièges chauffants,Apple CarPlay,Harman Kardon',
      image_url: '/images/car-029-0.png',
      is_available: 1, is_featured: 0
    }
  ];

  const insertCar = db.prepare(`
    INSERT INTO cars (name, brand, model, slug, category, price_per_day, seats, fuel_type, transmission, year, description, features, image_url, is_available, is_featured)
    VALUES (@name, @brand, @model, @slug, @category, @price_per_day, @seats, @fuel_type, @transmission, @year, @description, @features, @image_url, @is_available, @is_featured)
  `);

  const insertMany = db.transaction((cars) => {
    for (const car of cars) insertCar.run(car);
  });

  insertMany(cars);
  console.log(`Seeded ${cars.length} sample cars`);
}

module.exports = db;
