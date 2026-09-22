# Site Muriel Calas — préparatrice mentale

Site statique : `index.html` à la racine, une page `.html` par rubrique, `assets/`, `images/`.
Ouvrable en double-clic, hébergeable sur n'importe quel serveur (le `.htaccess` gère les URL propres sur Apache).

- `_source-nextjs/` : projet source (Next.js). `npm install` puis `npm run export:html` régénère le site à la racine.
- Aperçu client : branche `gh-pages` (même site, avec `noindex` pour ne pas concurrencer muriel-calas.fr sur Google).

Réalisé par [Noctalis](https://noctalis.digital).
