/**
 * Admin Shared Utilities – DAHBI CAR
 */
'use strict';

// ─── Auth Guard ───────────────────────────────────────────────────────────────
function getToken() {
  return localStorage.getItem('ltc_admin_token');
}

function getAdminUser() {
  try { return JSON.parse(localStorage.getItem('ltc_admin_user')) || {}; } catch { return {}; }
}

function requireAuth() {
  const token = getToken();
  if (!token) {
    window.location.href = '/admin/login';
    return false;
  }
  return true;
}

function logout() {
  localStorage.removeItem('ltc_admin_token');
  localStorage.removeItem('ltc_admin_user');
  window.location.href = '/admin/login';
}

// ─── Authenticated API ────────────────────────────────────────────────────────
const adminApi = {
  headers() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    };
  },
  async get(url) {
    const res = await fetch(url, { headers: this.headers() });
    if (res.status === 401) { logout(); return; }
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Erreur serveur');
    return data;
  },
  async post(url, body) {
    const res = await fetch(url, { method: 'POST', headers: this.headers(), body: JSON.stringify(body) });
    if (res.status === 401) { logout(); return; }
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Erreur serveur');
    return data;
  },
  async put(url, body) {
    const res = await fetch(url, { method: 'PUT', headers: this.headers(), body: JSON.stringify(body) });
    if (res.status === 401) { logout(); return; }
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Erreur serveur');
    return data;
  },
  async delete(url) {
    const res = await fetch(url, { method: 'DELETE', headers: this.headers() });
    if (res.status === 401) { logout(); return; }
    if (!res.ok) throw new Error((await res.json()).error || 'Erreur');
    return res.json();
  },
  async uploadForm(url, formData) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${getToken()}` },
      body: formData
    });
    if (res.status === 401) { logout(); return; }
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Upload échoué');
    return data;
  }
};

// ─── Toast ────────────────────────────────────────────────────────────────────
function toast(msg, type = 'success') {
  let tc = document.getElementById('admin-toast-c');
  if (!tc) {
    tc = document.createElement('div');
    tc.id = 'admin-toast-c';
    tc.style.cssText = 'position:fixed;top:1.25rem;right:1.25rem;z-index:9999;display:flex;flex-direction:column;gap:.5rem';
    document.body.appendChild(tc);
  }
  const colors = { success: '#15803d', error: '#dc2626', info: '#1d4ed8' };
  const el = document.createElement('div');
  el.style.cssText = `background:#fff;border-left:4px solid ${colors[type]||colors.success};padding:.875rem 1.1rem;border-radius:8px;box-shadow:0 10px 25px rgba(0,0,0,.15);font-size:.875rem;max-width:340px;animation:slideIn .25s ease`;
  el.textContent = msg;
  tc.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateX(40px)'; el.style.transition = 'all .3s'; setTimeout(() => el.remove(), 300); }, 3500);
}

// ─── Sidebar HTML ─────────────────────────────────────────────────────────────
function getSidebarHTML(active, pendingBookings = 0, unreadMessages = 0) {
  const navItems = [
    { href: '/admin/dashboard', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`, label: 'Tableau de bord' },
    { href: '/admin/cars', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 17H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2z"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>`, label: 'Voitures' },
    { href: '/admin/bookings', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`, label: 'Réservations', badge: pendingBookings },
    { href: '/admin/messages', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`, label: 'Messages', badge: unreadMessages },
  ];

  const user = getAdminUser();

  return `
    <div class="admin-sidebar" id="admin-sidebar">
      <div class="sidebar-header">
        <a href="/" target="_blank" class="sidebar-logo" style="display:block">
          <img src="/images/logo.png" alt="DAHBI CAR">
          <span>Panneau d'administration</span>
        </a>
      </div>
      <nav class="sidebar-nav">
        <div class="nav-section-title">Navigation</div>
        ${navItems.map(item => `
          <a href="${item.href}" class="sidebar-link${active === item.href ? ' active' : ''}">
            ${item.icon}
            ${item.label}
            ${item.badge ? `<span class="badge-count">${item.badge}</span>` : ''}
          </a>
        `).join('')}
        <div class="nav-section-title" style="margin-top:1rem">Paramètres</div>
        <a href="/" target="_blank" class="sidebar-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Voir le site
        </a>
      </nav>
      <div class="sidebar-footer">
        <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.75rem">
          <div style="width:36px;height:36px;background:var(--admin-accent);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:.875rem">${(user.username || 'A').charAt(0).toUpperCase()}</div>
          <div>
            <div style="font-size:.875rem;font-weight:600;color:#fff">${user.username || 'Admin'}</div>
            <div style="font-size:.75rem;color:rgba(255,255,255,.4)">Administrateur</div>
          </div>
        </div>
        <button onclick="adminLogout()" class="sidebar-link" style="width:100%;background:rgba(220,38,38,0.15);color:#fca5a5;border:none;text-align:left">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Déconnexion
        </button>
      </div>
    </div>
    <div style="position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:99;display:none" id="sidebar-overlay" onclick="closeSidebar()"></div>
  `;
}

function getTopbarHTML(title = '') {
  return `
    <div class="admin-topbar">
      <div style="display:flex;align-items:center;gap:1rem">
        <button onclick="toggleSidebar()" style="display:none;background:none;border:none;cursor:pointer;padding:.25rem" id="mobile-menu-btn">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <span style="font-size:.875rem;color:#94a3b8">${title}</span>
      </div>
      <div style="display:flex;align-items:center;gap:.75rem">
        <a href="/cars" target="_blank" class="btn btn-outline btn-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Site public
        </a>
      </div>
    </div>
  `;
}

function toggleSidebar() {
  const s = document.getElementById('admin-sidebar');
  const o = document.getElementById('sidebar-overlay');
  s.classList.toggle('open');
  o.style.display = s.classList.contains('open') ? 'block' : 'none';
}
function closeSidebar() {
  document.getElementById('admin-sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').style.display = 'none';
}

function adminLogout() {
  if (confirm('Voulez-vous vraiment vous déconnecter ?')) logout();
}

// ─── Format helpers ───────────────────────────────────────────────────────────
function formatDate(str) {
  if (!str) return '—';
  return new Date(str).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
function formatMAD(n) {
  return Number(n).toLocaleString('fr-MA') + ' MAD';
}

// ─── Mobile menu btn visibility ───────────────────────────────────────────────
function initAdminResponsive() {
  const btn = document.getElementById('mobile-menu-btn');
  if (!btn) return;
  const check = () => { btn.style.display = window.innerWidth <= 1024 ? 'block' : 'none'; };
  check();
  window.addEventListener('resize', check, { passive: true });
}

window.AdminUtils = { getToken, getAdminUser, requireAuth, logout: adminLogout, adminApi, toast, getSidebarHTML, getTopbarHTML, formatDate, formatMAD, initAdminResponsive };
