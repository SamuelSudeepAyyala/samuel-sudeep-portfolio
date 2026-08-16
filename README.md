# Samuel Sudeep Ayyala — Portfolio

Modern Angular portfolio focused on software engineering, platform/DevOps work, observability, and practical AI-assisted engineering.

## Public-content rule

Employer work must stay generalized. Do not publish internal repository names, private URLs, credentials, customer information, architecture diagrams copied from an employer, ticket identifiers, private dashboards, exact internal topology, or screenshots containing proprietary systems.

Public employer content should be limited to role, dates, broad technical themes, generalized responsibilities, and conservative outcomes that can be explained without exposing internal context.

## Local development

```bash
npm ci
npm start
```

Production build:

```bash
npm run build -- --configuration production --base-href=/samuel-sudeep-portfolio/
```

Unit tests:

```bash
npm test -- --watch=false --browsers=ChromeHeadless
```

## Asset slots

The UI is already prepared for these additions:

- `src/assets/Samuel_Sudeep_Ayyala_Resume.pdf` — final public-safe resume. After adding it, replace the disabled Resume spans in `src/app/home/home.component.html` with download links to `./assets/Samuel_Sudeep_Ayyala_Resume.pdf`.
- Approved project screenshots — place under `src/assets/projects/` and replace the matching `.project-media-slot` block with an `<img>` element.
- Social preview image — recommended future path: `public/social-preview.jpg`. Then add `og:image` and `twitter:image` metadata in `src/index.html`.
- LinkedIn — add only the verified public profile URL to the existing disabled LinkedIn controls and to the JSON-LD `sameAs` array in `src/index.html`.
- Analytics — add only after choosing a provider and obtaining the real project/site identifier. No placeholder tracking ID is committed.
- Custom domain — configure later after a domain is purchased. Keep the current GitHub Pages canonical URL until then.

## Deployment

Pull requests run tests and a production build. Pushes to `master` deploy the validated artifact to `gh-pages`.

Expected Pages URL:

`https://samuelsudeepayyala.github.io/samuel-sudeep-portfolio/`

## Current public links

- GitHub: `https://github.com/SamuelSudeepAyyala`
- Contact email: `ayyalasamuelsudeep@gmail.com`
- WhatsApp: existing portfolio link retained in the site

## Content maintenance

The portfolio intentionally favors a small number of stronger projects over a long list of older coursework. Expand case studies only with material that is safe to make public and can be defended in an interview.
