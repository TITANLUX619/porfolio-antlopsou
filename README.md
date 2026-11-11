# Portfolio de Antonio López Soult

Portfolio bilingüe de ingeniería de software construido con Next.js, React y TypeScript. Las rutas `/es` y `/en` contienen la presentación, los proyectos y las vías de contacto. La raíz recupera el idioma seleccionado en el sitio. En la primera visita usa el idioma del navegador y ofrece español como alternativa.

## Desarrollo

Con Node.js 22.13 o posterior y npm:

```sh
npm ci
npm run dev
```

Abre [localhost:3000](http://localhost:3000). La rama de desarrollo es `dev` y la rama principal es `master`.

## Verificación

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

La configuración del dominio y de los idiomas se encuentra en `i18n/routing.ts`. Los PDF que se ofrecen para descarga están en `public/CV_ALS_ES.pdf` y `public/CV_ALS_EN.pdf`.
