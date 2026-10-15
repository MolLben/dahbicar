/**
 * DAHBI CAR – Shared Utilities & Components
 */
'use strict';


// ─── API Helper ─────────────────────────────────────────────────────────────

const api = {
  async get(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error((await res.json()).error || 'Request failed');
    return res.json();
  },
  async post(url, data) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Request failed');
    return json;
  },
  async put(url, data) {
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Request failed');
    return json;
  },
  async delete(url) {
    const res = await fetch(url, { method: 'DELETE' });
    if (!res.ok) throw new Error((await res.json()).error || 'Request failed');
    return res.json();
  }
};

// ─── Toast Notifications ──────────────────────────────────────────────────────
function showToast(message, type = 'success', duration = 4000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`,
    error: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    info: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `${icons[type] || ''}${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(40px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ─── Navbar Component ─────────────────────────────────────────────────────────
function initNavbar(isLight = false) {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  if (isLight) navbar.classList.add('light');

  // Scroll behavior
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Set active link
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || (linkPath !== '/' && currentPath.startsWith(linkPath))) {
      link.classList.add('active');
    }
  });
}

// ─── Format Currency ──────────────────────────────────────────────────────────
function formatMAD(amount) {
  return new Intl.NumberFormat('fr-MA').format(amount) + ' MAD';
}

// ─── Car Card HTML ────────────────────────────────────────────────────────────
function renderCarCard(car) {
  const whatsappMsg = encodeURIComponent(`Bonjour, je souhaite réserver le ${car.name} à ${car.price_per_day} MAD/jour. Pouvez-vous me confirmer la disponibilité ?`);
  const whatsappUrl = `https://wa.me/212660707200?text=${whatsappMsg}`;

  const features = car.features ? car.features.split(',').slice(0, 3) : [];
  const featuresHtml = features.map(f => `<span class="car-spec"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>${f.trim()}</span>`).join('');

  return `
    <div class="card car-card animate-fade-up" data-category="${car.category}" data-price="${car.price_per_day}" data-car-id="${car.id}">
      <div class="car-card-image">
        <img src="${car.image_url}" alt="${car.name}" loading="lazy" onerror="this.src='/images/car-002-0.webp'">
        <div class="car-card-image-overlay"></div>
        ${car.is_featured ? `<span class="badge badge-orange badge-top-left"><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> Populaire</span>` : ''}
        <span class="badge badge-blue badge-top-right">${car.category}</span>
        <span class="badge badge-yellow badge-bottom-left">Modèle ${car.year}+</span>
      </div>
      <div class="car-card-body">
        <h3 class="car-name">${car.name}</h3>
        <p class="car-brand">${car.brand} ${car.model}</p>
        <div class="car-specs">
          <span class="car-spec">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" color="var(--blue)"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            ${car.seats} places
          </span>
          <span class="car-spec">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" color="var(--blue)"><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0V8.6a2 2 0 0 0-.59-1.42L18 4"/><path d="M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16"/><path d="M2 21h13"/><path d="M3 9h11"/></svg>
            ${car.fuel_type}
          </span>
          <span class="car-spec">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" color="var(--blue)"><circle cx="4" cy="4" r="2"/><circle cx="12" cy="4" r="2"/><circle cx="20" cy="4" r="2"/><circle cx="7" cy="20" r="2"/><circle cx="17" cy="20" r="2"/><line x1="4" y1="6" x2="4" y2="13"/><line x1="12" y1="6" x2="12" y2="13"/><line x1="20" y1="6" x2="20" y2="13"/><line x1="4" y1="13" x2="20" y2="13"/><line x1="7" y1="13" x2="7" y2="18"/><line x1="17" y1="13" x2="17" y2="18"/></svg>
            ${car.transmission === 'Automatique' ? 'Auto.' : 'Manu.'}
          </span>
        </div>
        <div class="car-price-row">
          <div>
            <span class="price-label">À partir de</span>
            <span class="price-amount">${car.price_per_day.toLocaleString('fr-MA')}&nbsp;MAD</span>
            <span class="price-unit">/jour</span>
          </div>
          <div class="car-actions mt-2">
            <a href="${whatsappUrl}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            <a href="/cars/${car.slug}" class="btn btn-blue btn-sm">Détails</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ─── Navbar HTML ──────────────────────────────────────────────────────────────
function getNavbarHTML(activePage = '') {
  const links = [
    { href: '/', label: 'Accueil' },
    { href: '/cars', label: 'Nos Voitures' },
    { href: '/about', label: 'À Propos' },
    { href: '/contact', label: 'Contact' },
  ];

  const navLinks = links.map(l =>
    `<li><a href="${l.href}"${activePage === l.href ? ' class="active"' : ''}>${l.label}</a></li>`
  ).join('');

  return `
    <nav class="navbar" id="navbar">
      <div class="nav-container">
        <a href="/" class="nav-logo" aria-label="DAHBI CAR">
          <img src="/images/dahbi-car-logo.png" alt="DAHBI CAR" width="150" height="60"
               style="height:52px;width:auto;object-fit:contain">
        </a>
        <ul class="nav-links">${navLinks}</ul>
        <div class="nav-actions">
          <a href="tel:+212660707200" class="nav-phone">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6.24 6.24l1.15-.77a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            +212 660 707 200
          </a>
          <a href="/cars" class="btn btn-primary btn-sm">Réserver</a>
        </div>
      </div>
    </nav>
  `;
}

// ─── Footer HTML ──────────────────────────────────────────────────────────────
function getFooterHTML() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="footer-logo">
              <img src="/images/dahbi-car-logo.png" alt="DAHBI CAR" style="height:56px;width:auto">
            </div>
            <p class="footer-desc">Votre agence de location de voitures premium à Casablanca. Livraison gratuite, assurance incluse, flotte 2025+.</p>
            <div class="footer-social">
              <a href="https://www.facebook.com/DahbiCarcars" target="_blank" rel="noopener" class="social-btn" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.instagram.com/DahbiCarcars" target="_blank" rel="noopener" class="social-btn" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://wa.me/212660707200" target="_blank" rel="noopener" class="social-btn" aria-label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h4 class="footer-col-title">Navigation</h4>
            <ul class="footer-links">
              <li><a href="/">Accueil</a></li>
              <li><a href="/cars">Nos Voitures</a></li>
              <li><a href="/about">À Propos</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/terms">Conditions</a></li>
            </ul>
          </div>
          <div>
            <h4 class="footer-col-title">Catégories</h4>
            <ul class="footer-links">
              <li><a href="/cars?category=Berline">Berlines</a></li>
              <li><a href="/cars?category=SUV">SUV</a></li>
              <li><a href="/cars?category=Familiale">Familiales</a></li>
              <li><a href="/cars?category=Luxe">Luxe</a></li>
              <li><a href="/cars?category=Utilitaire">Utilitaires</a></li>
            </ul>
          </div>
          <div>
            <h4 class="footer-col-title">Contact</h4>
            <div class="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6.24 6.24l1.15-.77a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <a href="tel:+212660707200" style="color:inherit">+212 660 707 200</a>
            </div>
            <div class="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              dahbicar@gmail.com
            </div>
            <div class="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Inara 02, 44 Rue 01, Casablanca
            </div>
            <div class="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Lun–Sam: 8h–20h | Dim: 9h–18h
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} DAHBI CAR. Tous droits réservés.</span>
          <span>Casablanca, Maroc</span>
        </div>
      </div>
    </footer>
  `;
}

// ─── Intersection Observer for Animations ────────────────────────────────────
function initAnimations() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.style.opacity = '1';
        el.target.style.transform = 'translateY(0)';
        observer.unobserve(el.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.animate-fade-up').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ─── FAQ Accordions ───────────────────────────────────────────────────────────
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-question.open').forEach(q => {
        q.classList.remove('open');
        q.nextElementSibling.classList.remove('open');
      });

      // Open clicked if was closed
      if (!isOpen) {
        btn.classList.add('open');
        answer.classList.add('open');
      }
    });
  });
}

// ─── Date Helpers ─────────────────────────────────────────────────────────────
function getTodayString() {
  return new Date().toISOString().split('T')[0];
}

function getTomorrowString() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// ─── Export ───────────────────────────────────────────────────────────────────
window.LTC = { api, showToast, initNavbar, initAnimations, initFAQ, renderCarCard, getNavbarHTML, getFooterHTML, formatMAD, getTodayString, getTomorrowString, formatDate };
