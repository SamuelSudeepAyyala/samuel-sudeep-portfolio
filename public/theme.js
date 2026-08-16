(() => {
  const STORAGE_KEY = 'samuel-portfolio-theme';
  const root = document.documentElement;
  const media = window.matchMedia('(prefers-color-scheme: light)');

  const safeStorage = {
    get() {
      try {
        return localStorage.getItem(STORAGE_KEY);
      } catch {
        return null;
      }
    },
    set(value) {
      try {
        localStorage.setItem(STORAGE_KEY, value);
      } catch {
        // Theme switching should still work for this session when storage is blocked.
      }
    }
  };

  const getPreferredTheme = () => {
    const saved = safeStorage.get();
    if (saved === 'light' || saved === 'dark') return saved;
    return media.matches ? 'light' : 'dark';
  };

  let transitionTimer = 0;

  const applyTheme = (theme, animate = false) => {
    if (animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('theme-transition');
      window.clearTimeout(transitionTimer);
      transitionTimer = window.setTimeout(() => root.classList.remove('theme-transition'), 320);
    }

    root.dataset.theme = theme;
    root.style.colorScheme = theme;

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#f4f7fb' : '#07090d');

    const button = document.querySelector('.theme-toggle');
    if (button) {
      const nextTheme = theme === 'dark' ? 'light' : 'dark';
      button.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
      button.setAttribute('title', `Switch to ${nextTheme} theme`);
      button.setAttribute('aria-pressed', String(theme === 'light'));
      button.dataset.theme = theme;
    }
  };

  applyTheme(getPreferredTheme());

  const mountToggle = () => {
    const header = document.querySelector('.site-header');
    if (!header || header.querySelector('.theme-toggle')) return Boolean(header);

    const cta = header.querySelector('.header-cta');
    const actions = document.createElement('div');
    actions.className = 'header-actions';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'theme-toggle';
    button.innerHTML = `
      <span class="theme-toggle-track" aria-hidden="true">
        <span class="theme-icon theme-icon-sun">☀</span>
        <span class="theme-icon theme-icon-moon">☾</span>
        <span class="theme-toggle-thumb"></span>
      </span>
      <span class="sr-only theme-toggle-label">Toggle color theme</span>
    `;

    button.addEventListener('click', () => {
      const next = root.dataset.theme === 'light' ? 'dark' : 'light';
      safeStorage.set(next);
      applyTheme(next, true);
    });

    if (cta) {
      cta.replaceWith(actions);
      actions.append(button, cta);
    } else {
      header.append(actions);
      actions.append(button);
    }

    applyTheme(root.dataset.theme || getPreferredTheme());
    return true;
  };

  const mountEducationHistory = () => {
    const education = document.querySelector('.education');
    if (!education) return false;
    if (education.querySelector('.education-list')) return true;

    education.innerHTML = `
      <div class="education-main">
        <p class="eyebrow">Education</p>
        <div class="education-list">
          <article class="education-entry">
            <div>
              <span class="mono">Graduate study</span>
              <h2>New Jersey Institute of Technology</h2>
              <p class="degree-meta">Master of Science in Computer Science · 2025</p>
            </div>
            <p class="education-detail">Computer science fundamentals, software systems and applied engineering work supporting software and platform-focused engineering.</p>
          </article>
          <article class="education-entry">
            <div>
              <span class="mono">Undergraduate study</span>
              <h3>Karunya Institute of Technology and Sciences</h3>
              <p class="degree-meta">Bachelor of Technology in Computer Science &amp; Engineering · 2020</p>
            </div>
            <p class="education-detail">Coimbatore, India · Foundation in computer science, software development, data structures, systems and engineering fundamentals.</p>
          </article>
        </div>
      </div>
    `;

    return true;
  };

  const syncCurrentExperience = () => {
    const titles = document.querySelectorAll('.timeline-title-row h3');
    for (const title of titles) {
      if (title.textContent?.trim() !== 'Incident IQ') continue;
      const row = title.closest('.timeline-title-row');
      const date = row?.querySelector(':scope > span:last-child');
      if (date) date.textContent = 'Jun 2026 — Present';
      return true;
    }
    return false;
  };

  const mountEnhancements = () => {
    const toggleReady = mountToggle();
    const educationReady = mountEducationHistory();
    const experienceReady = syncCurrentExperience();
    return toggleReady && educationReady && experienceReady;
  };

  if (!mountEnhancements()) {
    const observer = new MutationObserver(() => {
      if (mountEnhancements()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  const onSystemThemeChange = (event) => {
    if (!safeStorage.get()) {
      applyTheme(event.matches ? 'light' : 'dark', true);
    }
  };

  if (typeof media.addEventListener === 'function') {
    media.addEventListener('change', onSystemThemeChange);
  } else if (typeof media.addListener === 'function') {
    media.addListener(onSystemThemeChange);
  }
})();
