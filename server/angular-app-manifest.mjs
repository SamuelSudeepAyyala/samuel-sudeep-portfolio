
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/samuel-sudeep-portfolio/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/samuel-sudeep-portfolio"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 529, hash: 'e781f4886282ebaccb1df344f02d8ca27dfc393770300d24996f6f2649a4ac97', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1042, hash: '4468d730e7a6c1facc5d59cf394f53bf1f48af1e879d53ffd030facdce60deb5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 3068, hash: 'c863510f2bc5d583d084784477fc280fd314d89c1d00b1ae22f7935705974e2c', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
