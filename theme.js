(() => {
  const STORAGE_KEY = 'samuel-portfolio-theme';
  const root = document.documentElement;

  const getPreferredTheme = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  };

  const applyTheme = (theme) => {
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
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
    });

    if (cta) {
      cta.replaceWith(actions);
      actions.append(button, cta);
    } else {
      header.append(button);
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

  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (event) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(event.matches ? 'light' : 'dark');
    }
  });
})();
