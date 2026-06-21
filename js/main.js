// ── Language system ────────────────────────────────────────────────────────
let currentLang = localStorage.getItem('lmc-lang') || 'en';

window._t = (key) => (i18n[currentLang] && i18n[currentLang][key]) || (i18n.en[key] || key);

function bg(el, gradientOrUrl) {
  if (!gradientOrUrl) return;
  const isUrl = /^https?:\/\//.test(gradientOrUrl) || gradientOrUrl.startsWith('url(');
  el.style.background = isUrl
    ? `url('${gradientOrUrl}') center/cover no-repeat`
    : gradientOrUrl;
}

function articleImage(article) {
  return article.image || article.gradient;
}

// ── Journal rendering (data-driven from ARTICLES) ──────────────────────────
function renderHomeJournal() {
  const mount = document.getElementById('home-journal-grid');
  if (!mount) return;
  const latest = ARTICLES.slice(0, 3);
  mount.innerHTML = latest.map(a => `
    <div class="journal-card" onclick="navigate('article/${a.slug}')">
      <div class="journal-card-img"><div style="background:${articleImage(a)}"></div></div>
      <div class="journal-card-date">${a.date[currentLang] || a.date.en}</div>
      <div class="journal-card-title">${a.title[currentLang] || a.title.en}</div>
      <p class="journal-card-excerpt">${a.excerpt[currentLang] || a.excerpt.en}</p>
    </div>
  `).join('');
}

function renderJournalList() {
  const featuredMount = document.getElementById('journal-featured');
  const gridMount = document.getElementById('journal-grid');
  if (!featuredMount || !gridMount) return;

  const [featured, ...rest] = ARTICLES;
  if (featured) {
    featuredMount.innerHTML = `
      <div class="journal-featured" onclick="navigate('article/${featured.slug}')">
        <div class="journal-featured-img">
          <div style="background:${articleImage(featured)};height:380px"></div>
        </div>
        <div class="journal-featured-text">
          <div class="t-label">${window._t('journal.feat.label')} — ${featured.date[currentLang] || featured.date.en}</div>
          <h2 class="t-h2" style="margin:20px 0">${featured.title[currentLang] || featured.title.en}</h2>
          <p class="t-body">${featured.excerpt[currentLang] || featured.excerpt.en}</p>
          <div style="margin-top:28px"><span class="arrow-link">${window._t('journal.feat.link')}</span></div>
        </div>
      </div>`;
  }

  gridMount.innerHTML = rest.map(a => `
    <div class="journal-card" onclick="navigate('article/${a.slug}')">
      <div class="journal-card-img"><div style="height:220px;background:${articleImage(a)}"></div></div>
      <div class="journal-card-date">${a.date[currentLang] || a.date.en}</div>
      <div class="journal-card-title">${a.title[currentLang] || a.title.en}</div>
      <p class="journal-card-excerpt">${a.excerpt[currentLang] || a.excerpt.en}</p>
    </div>
  `).join('');
}

let currentArticleSlug = null;

function renderArticle(slug) {
  const article = ARTICLES.find(a => a.slug === slug);
  if (!article) {
    navigate('journal');
    return;
  }
  currentArticleSlug = slug;
  document.getElementById('article-date').textContent = article.date[currentLang] || article.date.en;
  document.getElementById('article-title').innerHTML = article.title[currentLang] || article.title.en;
  document.getElementById('article-content').innerHTML = article.body[currentLang] || article.body.en;
  bg(document.getElementById('article-cover-img'), articleImage(article));
}

function setLanguage(lang) {
  if (!i18n[lang]) return;
  currentLang = lang;
  localStorage.setItem('lmc-lang', lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = window._t(key);
    if (val !== undefined) el.innerHTML = val;
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  document.documentElement.lang = lang === 'ja' ? 'ja' : 'en';
  document.body.classList.toggle('lang-ja', lang === 'ja');

  renderHomeJournal();
  renderJournalList();
  if (currentArticleSlug) renderArticle(currentArticleSlug);
}

// ── Router ───────────────────────────────────────────────────────────────
const pages = ['home', 'about', 'journal', 'article', 'shop', 'visit'];

function parseRoute(route) {
  const [page, ...rest] = route.split('/');
  return { page, param: rest.join('/') };
}

function navigate(route) {
  const { page, param } = parseRoute(route);
  if (!pages.includes(page)) return;

  if (page === 'article') {
    if (!param) { navigate('journal'); return; }
    renderArticle(param);
  } else {
    currentArticleSlug = null;
  }

  pages.forEach(p => {
    const el = document.getElementById('page-' + p);
    if (el) el.style.display = 'none';
  });
  const target = document.getElementById('page-' + page);
  if (target) {
    target.style.display = 'block';
    target.classList.remove('page');
    void target.offsetWidth;
    target.classList.add('page');
  }
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });
  const nav = document.getElementById('nav');
  nav.classList.toggle('dark', page === 'home');
  history.pushState({ route }, '', '#' + route);
  window.scrollTo({ top: 0, behavior: 'instant' });
}
window.navigate = navigate;
window.setLanguage = setLanguage;

window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 40);
});

window.addEventListener('popstate', e => {
  if (e.state && e.state.route) navigate(e.state.route);
});

// Shop filter tabs
document.querySelectorAll('.shop-filter span').forEach(span => {
  span.addEventListener('click', function() {
    document.querySelectorAll('.shop-filter span').forEach(s => s.classList.remove('active'));
    this.classList.add('active');
  });
});

// Init
(function() {
  renderHomeJournal();
  renderJournalList();

  const route = window.location.hash.replace('#', '');
  const { page } = parseRoute(route);
  const startRoute = pages.includes(page) ? route : 'home';
  navigate(startRoute);
  history.replaceState({ route: startRoute }, '', '#' + startRoute);
  setLanguage(currentLang);
})();
