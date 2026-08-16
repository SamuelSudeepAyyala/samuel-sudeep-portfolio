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

  if (!mountToggle()) {
    const observer = new MutationObserver(() => {
      if (mountToggle()) observer.disconnect();
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
