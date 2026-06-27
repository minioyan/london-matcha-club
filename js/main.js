// ── Language ─────────────────────────────────────────────────────────────
// The site is Japanese-first; English appears only as small inline annotations
// baked directly into the HTML (see .t-sub-en), so there's no language switch.
const currentLang = 'ja';

window._t = (key) => (i18n.ja && i18n.ja[key]) || (i18n.en[key] || key);

function bg(el, gradientOrUrl) {
  if (!gradientOrUrl) return;
  const isGradient = gradientOrUrl.startsWith('linear-gradient(') || gradientOrUrl.startsWith('url(');
  el.style.background = isGradient
    ? gradientOrUrl
    : `url('${gradientOrUrl}') center/cover no-repeat`;
}

// Returns a ready-to-use CSS `background` value — a gradient string as-is,
// or a photo path wrapped in url(...) with cover/center sizing.
function articleImage(article) {
  if (article.image) return `url('${article.image}') center/cover no-repeat`;
  return article.gradient;
}

// ── Journal rendering (data-driven from ARTICLES) ──────────────────────────
function renderHomeJournal() {
  const mount = document.getElementById('home-journal-grid');
  if (!mount) return;
  const latest = ARTICLES.slice(0, 3);
  mount.innerHTML = latest.map(a => `
    <div class="journal-card" onclick="navigate('article/${a.slug}')">
      <div class="journal-card-img"><div role="img" aria-label="${a.title[currentLang] || a.title.en}" style="background:${articleImage(a)}"></div></div>
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
          <div role="img" aria-label="${featured.title[currentLang] || featured.title.en}" style="background:${articleImage(featured)};height:380px"></div>
        </div>
        <div class="journal-featured-text">
          <div class="t-label">${window._t('journal.feat.label')} — ${featured.date[currentLang] || featured.date.en}</div>
          <h2 class="t-h2" style="margin:20px 0 4px">${featured.title[currentLang] || featured.title.en}</h2>
          <span class="t-sub-en" style="margin-bottom:20px">${featured.title.en}</span>
          <p class="t-body">${featured.excerpt[currentLang] || featured.excerpt.en}</p>
          <div style="margin-top:28px"><span class="arrow-link">${window._t('journal.feat.link')}</span></div>
        </div>
      </div>`;
  }

  gridMount.innerHTML = rest.map(a => `
    <div class="journal-card" onclick="navigate('article/${a.slug}')">
      <div class="journal-card-img"><div role="img" aria-label="${a.title[currentLang] || a.title.en}" style="height:220px;background:${articleImage(a)}"></div></div>
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
  document.getElementById('article-title-en').textContent = article.title.en;
  const content = document.getElementById('article-content');
  content.innerHTML = article.body[currentLang] || article.body.en;
  const coverEl = document.getElementById('article-cover-img');
  bg(coverEl, articleImage(article));
  coverEl.setAttribute('role', 'img');
  coverEl.setAttribute('aria-label', article.title[currentLang] || article.title.en);
  insertInlineImage(content, article);
}

// Drops one inline image roughly midway through the body so long articles
// get a visual break — reuses the article's own gradient/photo.
function insertInlineImage(content, article) {
  const paragraphs = content.querySelectorAll('p');
  if (paragraphs.length < 2) return;
  const target = paragraphs[Math.floor(paragraphs.length / 2) - 1];
  const wrapper = document.createElement('div');
  wrapper.className = 'article-inline-img';
  const inner = document.createElement('div');
  inner.setAttribute('aria-hidden', 'true'); // repeats the cover image; no new information
  wrapper.appendChild(inner);
  bg(inner, articleImage(article));
  target.after(wrapper);
}

function renderStaticText() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = window._t(el.dataset.i18n);
    if (val !== undefined) el.innerHTML = val;
  });
  document.documentElement.lang = 'ja';
  document.body.classList.add('lang-ja');

  const copyEl = document.getElementById('footer-copy');
  if (copyEl) copyEl.textContent = `© ${new Date().getFullYear()} London Matcha Club`;
}

// ── Router ───────────────────────────────────────────────────────────────
const pages = ['home', 'about', 'menu', 'journal', 'article', 'shop', 'visit'];

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

window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 40);
});

window.addEventListener('popstate', e => {
  if (e.state && e.state.route) navigate(e.state.route);
});

// Init
(function() {
  renderStaticText();
  renderHomeJournal();
  renderJournalList();

  const route = window.location.hash.replace('#', '');
  const { page } = parseRoute(route);
  const startRoute = pages.includes(page) ? route : 'home';
  navigate(startRoute);
  history.replaceState({ route: startRoute }, '', '#' + startRoute);
})();
