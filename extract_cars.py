import re, json, shutil, os, urllib.parse

# Re-extract car data
with open(r'C:\Users\Administrator\Desktop\cars\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

car_re = re.compile(
    r'\\\"id\\\":\\\"(car-[^\\]+)\\\"[^{]*?'
    r'\\\"slug\\\":\\\"([^\\]+)\\\"[^{]*?'
    r'\\\"name\\\":\\\"([^\\]+)\\\"[^{]*?'
    r'\\\"brand\\\":\\\"([^\\]+)\\\"[^{]*?'
    r'\\\"model\\\":\\\"([^\\]+)\\\"[^{]*?'
    r'\\\"year\\\":(\d+)[^{]*?'
    r'\\\"category\\\":\\\"([^\\]+)\\\"[^{]*?'
    r'\\\"pricePerDay\\\":(\d+)[^{]*?'
    r'\\\"images\\\":\[\\\"([^\\]+)\\\"[^\]]*?\][^{]*?'
    r'\\\"seats\\\":(\d+)[^{]*?'
    r'\\\"fuel\\\":\\\"([^\\]+)\\\"[^{]*?'
    r'\\\"transmission\\\":\\\"([^\\]+)\\\"',
    re.DOTALL
)

cars = []
seen = set()
for m in car_re.finditer(content):
    slug = m.group(2)
    if slug in seen: continue
    seen.add(slug)
    cars.append({
        'slug': slug,
        'name': m.group(3),
        'brand': m.group(4),
        'year': int(m.group(6)),
        'category': m.group(7),
        'price': int(m.group(8)),
        'image': m.group(9).replace('/storage/cars/', ''),
        'seats': int(m.group(10)),
        'fuel': m.group(11),
        'transmission': m.group(12),
    })

print(f"Cars loaded: {len(cars)}")

# SVG icons (same as index.html)
ICON_USERS = '''<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spec-icon" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg>'''

ICON_FUEL = '''<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spec-icon" aria-hidden="true"><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5"/><path d="M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16"/><path d="M2 21h13"/><path d="M3 9h11"/></svg>'''

ICON_TRANS = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="spec-icon" aria-hidden="true"><circle cx="4" cy="4" r="2"/><circle cx="12" cy="4" r="2"/><circle cx="20" cy="4" r="2"/><circle cx="7" cy="20" r="2"/><circle cx="17" cy="20" r="2"/><line x1="4" y1="6" x2="4" y2="13"/><line x1="12" y1="6" x2="12" y2="13"/><line x1="20" y1="6" x2="20" y2="13"/><line x1="4" y1="13" x2="20" y2="13"/><line x1="7" y1="13" x2="7" y2="18"/><line x1="17" y1="13" x2="17" y2="18"/></svg>'''

WA_ICON = '''<svg class="wa-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>'''

def category_color(cat):
    return {'Berline':'#1a56db','SUV':'#0e9f6e','Familiale':'#7e3af2','Luxe':'#e3a008','Utilitaire':'#6b7280'}.get(cat,'#1a56db')

def trans_short(t):
    return 'Auto.' if t == 'Automatique' else 'Manu.'

def whatsapp_url(car):
    msg = f"Bonjour, je souhaite réserver le {car['name']} à {car['price']} MAD/jour. Pouvez-vous me confirmer la disponibilité ?"
    return f"https://wa.me/212669423763?text={urllib.parse.quote(msg)}"

categories = sorted(set(c['category'] for c in cars))

cards_html = ""
for car in cars:
    img = f"images/{car['image']}"
    wa = whatsapp_url(car)
    col = category_color(car['category'])
    trans = trans_short(car['transmission'])

    cards_html += f"""
          <div class="car-card" data-category="{car['category']}" data-price="{car['price']}">
            <div class="car-img-wrap">
              <img src="{img}" alt="Location {car['name']} à Casablanca — Dahbi Cars" loading="lazy" />
              <span class="badge-pop"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline;margin-right:3px;vertical-align:middle"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>Populaire</span>
              <span class="badge-cat" style="background:{col}">{car['category']}</span>
              <span class="badge-year">Modèle {car['year']} et +</span>
            </div>
            <div class="car-body">
              <div class="car-title-row">
                <h3>{car['name']}</h3>
                <p class="car-subtitle">{car['brand']} {car['name'].replace(car['brand']+' ','',1)}</p>
              </div>
              <div class="car-specs">
                <span class="spec-item">{ICON_USERS}{car['seats']} places</span>
                <span class="spec-item">{ICON_FUEL}{car['fuel']}</span>
                <span class="spec-item">{ICON_TRANS}{trans}</span>
              </div>
              <div class="car-footer">
                <div class="car-price">
                  <span class="from">À partir de</span>
                  <span class="amount">{car['price']:,}&nbsp;MAD</span>
                  <span class="per">/jour</span>
                </div>
                <div class="car-actions">
                  <a href="{wa}" target="_blank" rel="noopener noreferrer" class="btn-wa">{WA_ICON}WhatsApp</a>
                  <a href="cars.html" class="btn-details">Détails</a>
                </div>
              </div>
            </div>
          </div>"""

filter_btns = f'<button class="filter-btn active" data-filter="all">Tous ({len(cars)})</button>'
for cat in categories:
    count = sum(1 for c in cars if c['category'] == cat)
    filter_btns += f'\n          <button class="filter-btn" data-filter="{cat}">{cat} ({count})</button>'

html = f"""<!doctype html>
<html lang="fr" class="scroll-smooth">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Notre Flotte — Dahbi Cars | Location de Voiture à Casablanca</title>
  <meta name="description" content="Découvrez toute la flotte Dahbi Cars : {len(cars)} véhicules disponibles à Casablanca. Berlines, SUV, véhicules de luxe, familiaux. Réservez via WhatsApp." />
  <link rel="icon" href="images/logo.png" type="image/png" />
  <link rel="stylesheet" href="css/a1b7cf3a80a5e3fa.css" />
  <link rel="stylesheet" href="css/dd5ca925b533bfc2.css" />
  <style>
    *, *::before, *::after {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{ font-family: var(--font-geist-sans, system-ui, sans-serif); background: #f8f9fb; color: #1a1a2e; }}

    /* Header */
    .site-header {{
      position: fixed; top: 0; left: 0; right: 0; z-index: 50;
      background: rgba(10,10,20,0.95); backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255,255,255,0.08); height: 72px;
      display: flex; align-items: center;
    }}
    .header-inner {{
      max-width: 1280px; margin: 0 auto; padding: 0 24px; width: 100%;
      display: flex; align-items: center; justify-content: space-between;
    }}
    .logo-link img {{ height: 52px; width: auto; }}
    .back-link {{
      display: inline-flex; align-items: center; gap: 8px;
      color: rgba(255,255,255,0.75); font-size: 0.875rem; font-weight: 500;
      text-decoration: none; transition: color 0.2s;
    }}
    .back-link:hover {{ color: #f97316; }}
    .back-link svg {{ width: 16px; height: 16px; }}

    /* Hero */
    .page-hero {{
      margin-top: 72px;
      background: linear-gradient(135deg, #0f0c29 0%, #1a1a2e 50%, #16213e 100%);
      padding: 56px 24px 48px; text-align: center; position: relative; overflow: hidden;
    }}
    .page-hero::before {{
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.18) 0%, transparent 70%);
    }}
    .page-hero h1 {{
      font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; color: #fff;
      line-height: 1.15; margin-bottom: 14px; position: relative;
    }}
    .page-hero h1 span {{ color: #f97316; }}
    .page-hero p {{
      color: rgba(255,255,255,0.65); font-size: 1.05rem;
      max-width: 560px; margin: 0 auto; position: relative;
    }}
    .hero-stats {{
      display: flex; justify-content: center; gap: 36px; flex-wrap: wrap;
      margin-top: 32px; position: relative;
    }}
    .hero-stat .num {{ display: block; font-size: 1.75rem; font-weight: 800; color: #f97316; line-height: 1; }}
    .hero-stat .lbl {{ font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.5); margin-top: 4px; }}

    /* Controls */
    .controls {{ max-width: 1280px; margin: 0 auto; padding: 28px 24px 0; }}
    .filter-row {{ display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }}
    .filter-row > label {{ font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; }}
    .filter-btn {{
      border: 1.5px solid #e5e7eb; background: #fff; color: #374151;
      border-radius: 50px; padding: 5px 14px; font-size: 0.78rem; font-weight: 600;
      cursor: pointer; transition: all 0.18s; white-space: nowrap;
    }}
    .filter-btn:hover {{ border-color: #f97316; color: #f97316; }}
    .filter-btn.active {{ background: #f97316; border-color: #f97316; color: #fff; }}
    .sort-row {{ display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 4px; }}
    .sort-row label {{ font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; }}
    .sort-select {{
      border: 1.5px solid #e5e7eb; background: #fff; color: #374151;
      border-radius: 8px; padding: 5px 28px 5px 10px; font-size: 0.82rem; font-weight: 500;
      cursor: pointer; appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
      background-repeat: no-repeat; background-position: right 8px center;
    }}
    .sort-select:focus {{ outline: none; border-color: #f97316; }}
    .results-count {{ font-size: 0.82rem; color: #9ca3af; font-weight: 500; margin-left: auto; }}

    /* Grid */
    .cars-grid {{
      max-width: 1280px; margin: 0 auto; padding: 20px 24px 80px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 22px;
    }}

    /* Card */
    .car-card {{
      background: #fff; border-radius: 16px; overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.05);
      transition: transform 0.2s, box-shadow 0.2s; display: flex; flex-direction: column;
    }}
    .car-card:hover {{ transform: translateY(-4px); box-shadow: 0 8px 32px rgba(0,0,0,0.13); }}
    .car-card.hidden {{ display: none !important; }}

    /* Card image */
    .car-img-wrap {{
      position: relative; height: 190px; background: #f3f4f6; overflow: hidden;
    }}
    .car-img-wrap img {{
      width: 100%; height: 100%; object-fit: contain; padding: 10%;
      transition: transform 0.4s;
    }}
    .car-card:hover .car-img-wrap img {{ transform: scale(1.05); }}

    /* Badges */
    .badge-pop {{
      position: absolute; top: 10px; left: 10px;
      background: #c2410c; color: #fff;
      font-size: 0.68rem; font-weight: 700; padding: 3px 9px 3px 7px;
      border-radius: 50px; display: inline-flex; align-items: center; gap: 2px;
    }}
    .badge-cat {{
      position: absolute; top: 10px; right: 10px;
      color: #fff; font-size: 0.68rem; font-weight: 700;
      padding: 3px 10px; border-radius: 50px;
    }}
    .badge-year {{
      position: absolute; bottom: 10px; left: 10px;
      background: #d97706; color: #fff;
      font-size: 0.66rem; font-weight: 700; padding: 3px 9px; border-radius: 50px;
    }}

    /* Card body */
    .car-body {{ padding: 16px 16px 14px; display: flex; flex-direction: column; flex: 1; }}
    .car-title-row {{ margin-bottom: 10px; }}
    .car-title-row h3 {{ font-size: 1rem; font-weight: 800; color: #111827; line-height: 1.2; margin-bottom: 2px; }}
    .car-subtitle {{ font-size: 0.75rem; color: #9ca3af; font-weight: 500; }}

    /* Specs */
    .car-specs {{
      display: flex; gap: 14px; flex-wrap: wrap;
      font-size: 0.78rem; color: #6b7280; font-weight: 500; margin-bottom: 14px;
    }}
    .spec-item {{ display: flex; align-items: center; gap: 5px; }}
    .spec-icon {{
      width: 16px; height: 16px; flex-shrink: 0;
      stroke: #1a56db;
    }}

    /* Footer */
    .car-footer {{
      border-top: 1px solid #f3f4f6; padding-top: 12px; margin-top: auto;
      display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;
    }}
    .car-price {{ display: flex; align-items: baseline; gap: 2px; flex-wrap: wrap; }}
    .from {{ font-size: 0.68rem; color: #9ca3af; font-weight: 600; margin-right: 2px; }}
    .amount {{ font-size: 1.25rem; font-weight: 900; color: #f97316; }}
    .per {{ font-size: 0.72rem; color: #9ca3af; }}

    .car-actions {{ display: flex; gap: 6px; }}
    .btn-wa {{
      display: inline-flex; align-items: center; gap: 5px;
      background: #15803d; color: #fff; border-radius: 10px;
      padding: 7px 12px; font-size: 0.77rem; font-weight: 700;
      text-decoration: none; transition: all 0.18s; white-space: nowrap;
    }}
    .btn-wa:hover {{ background: #166534; transform: translateY(-1px); }}
    .wa-icon {{ width: 14px; height: 14px; flex-shrink: 0; }}
    .btn-details {{
      display: inline-flex; align-items: center; justify-content: center;
      background: #1a56db; color: #fff; border-radius: 10px;
      padding: 7px 14px; font-size: 0.77rem; font-weight: 700;
      text-decoration: none; transition: all 0.18s; white-space: nowrap;
    }}
    .btn-details:hover {{ background: #1e429f; transform: translateY(-1px); }}

    /* No results */
    .no-results {{ display: none; grid-column: 1/-1; text-align: center; padding: 80px 20px; color: #9ca3af; }}
    .no-results.visible {{ display: block; }}
    .no-results .icon {{ font-size: 3rem; margin-bottom: 12px; }}
  </style>
</head>
<body>

  <header class="site-header">
    <div class="header-inner">
      <a class="logo-link" href="index.html">
        <img src="images/logo.png" alt="Dahbi Cars" />
      </a>
      <a class="back-link" href="index.html">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        Retour à l'accueil
      </a>
    </div>
  </header>

  <section class="page-hero">
    <h1>Notre <span>Flotte Complète</span></h1>
    <p>{len(cars)} véhicules disponibles à Casablanca — Berlines, SUV, Familiaux &amp; Luxe. Livraison gratuite incluse.</p>
    <div class="hero-stats">
      <div class="hero-stat"><span class="num">{len(cars)}</span><span class="lbl">Véhicules</span></div>
      <div class="hero-stat"><span class="num">190 MAD</span><span class="lbl">Dès</span></div>
      <div class="hero-stat"><span class="num">7j/7</span><span class="lbl">Disponible</span></div>
      <div class="hero-stat"><span class="num">4.9★</span><span class="lbl">Google</span></div>
    </div>
  </section>

  <div class="controls">
    <div class="filter-row">
      <label>Catégorie :</label>
      {filter_btns}
      <span class="results-count" id="results-count">{len(cars)} véhicules</span>
    </div>
    <div class="sort-row">
      <label>Trier par :</label>
      <select class="sort-select" id="sort-select">
        <option value="price-asc">Prix croissant</option>
        <option value="price-desc">Prix décroissant</option>
        <option value="name-asc">Nom (A→Z)</option>
      </select>
    </div>
  </div>

  <div class="cars-grid" id="cars-grid">
{cards_html}
    <div class="no-results" id="no-results">
      <div class="icon">🚗</div>
      <p>Aucun véhicule ne correspond à votre sélection.</p>
    </div>
  </div>

  <script>
    const grid = document.getElementById('cars-grid');
    const cards = Array.from(document.querySelectorAll('.car-card'));
    const countEl = document.getElementById('results-count');
    const noResults = document.getElementById('no-results');
    let activeFilter = 'all';

    function updateGrid() {{
      const sort = document.getElementById('sort-select').value;
      const sorted = [...cards].sort((a, b) => {{
        if (sort === 'price-asc') return +a.dataset.price - +b.dataset.price;
        if (sort === 'price-desc') return +b.dataset.price - +a.dataset.price;
        return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
      }});
      sorted.forEach(c => grid.insertBefore(c, noResults));
      let visible = 0;
      sorted.forEach(c => {{
        const match = activeFilter === 'all' || c.dataset.category === activeFilter;
        c.classList.toggle('hidden', !match);
        if (match) visible++;
      }});
      countEl.textContent = visible + ' véhicule' + (visible !== 1 ? 's' : '');
      noResults.classList.toggle('visible', visible === 0);
    }}

    document.querySelectorAll('.filter-btn').forEach(btn => {{
      btn.addEventListener('click', () => {{
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.filter;
        updateGrid();
      }});
    }});
    document.getElementById('sort-select').addEventListener('change', updateGrid);
    updateGrid();
  </script>
</body>
</html>"""

with open(r'C:\Users\Administrator\Desktop\dahbi\cars.html', 'w', encoding='utf-8') as f:
    f.write(html)
print(f"Done. Generated cars.html with {len(cars)} cars and SVG icons.")
