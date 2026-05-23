# Project bootstrap: Ingwaz (thesis-сайт)

Чеклист появления **кода** после docs-only фазы. Эталон фронта: **SEO Brief Generator** (`frontend/` + SEO-слой); **без** Laravel на v1.

**Решения:** [ROOT-DOMAIN-DECISION.md](./ROOT-DOMAIN-DECISION.md).

---

## 0. Preflight

- [ ] Репозиторий: `git@github.com:dpodbereznyh/Ingwaz.git`, ветка `main`
- [ ] DNS: `ingwaz.space` → VPS (можно параллельно с разработкой)
- [ ] SSH alias **`ingwaz-vps`** — [ssh-config-snippet.conf](./ssh-config-snippet.conf)
- [ ] Каталог на VPS: `/var/www/ingwaz/public` (создать пустым)

---

## 1. Frontend (Vite + React + TypeScript)

### 1.1. Создание или копирование

**Вариант A — скопировать SEO-слой с эталона:**

Из `D:\Works\SEO Brief Generator\frontend\` перенести и упростить:

- `src/seo/metaConfig.ts` — только маршруты Ingwaz
- `src/components/DocumentMeta.tsx`
- `scripts/prerender-seo.mjs`
- `public/robots.txt`, `public/sitemap.xml` (шаблон)
- `index.html`

**Не** переносить: API client, auth, dashboard, billing.

**Вариант B — с нуля:**

```bash
npm create vite@latest frontend -- --template react-ts
cd frontend && npm install react-router-dom
```

Затем добавить SEO-файлы по [SEO.md](./SEO.md) §3.

### 1.2. Конфигурация

- [ ] `frontend/.env.production.example` с `VITE_SITE_URL=https://ingwaz.space`
- [ ] `VITE_YANDEX_METRIKA_ID` — **свой** счётчик (0 = выкл.)
- [ ] `package.json`: `"build": "vite build && node scripts/prerender-seo.mjs"` (когда prerender готов)

### 1.3. Страницы MVP

- [ ] `/` — [NAMING-AND-POSITIONING.md](./NAMING-AND-POSITIONING.md): H1, thesis, CTA CommentSignal, список tools [PORTFOLIO-MAP.md](./PORTFOLIO-MAP.md)
- [ ] `/privacy`, `/cookies` — заглушки или `noindex` до финальных текстов
- [ ] UTM на внешние ссылки: `?utm_source=ingwaz&utm_medium=portal&utm_campaign=root`

### 1.4. INDEXABLE_PATHS

В `metaConfig.ts` зафиксировать массив, совпадающий с `sitemap.xml` (MVP: только `/`).

---

## 2. Корень репозитория

- [ ] `README.md` — актуален
- [ ] `scripts/nginx-host-ingwaz.space.conf`
- [ ] `scripts/deploy-prod.sh` (chmod +x на Unix)
- [ ] `.gitignore`: `node_modules/`, `frontend/dist/`, `.env*`, `.env.production`
- [ ] `.cursor/rules/` — deploy, ssh, cookie (см. эталон seobrief)

**Не добавлять на v1:** `docker-compose.yml`, `composer.json`, Laravel.

---

## 3. Quality gates (MVP)

- [ ] `cd frontend && npm run build` — без ошибок
- [ ] `dist/index.html` содержит ожидаемый `<title>`
- [ ] `dist/robots.txt`, `dist/sitemap.xml` на месте
- [ ] Prerender для indexable paths (если включён)
- [ ] Локальный preview: `npm run preview` — главная открывается

---

## 4. Первый прод

Следовать [DEPLOY-VPS.md](./DEPLOY-VPS.md):

1. Сборка с `frontend/.env.production`
2. Доставка `dist/` → `/var/www/ingwaz/public/`
3. nginx + certbot
4. Smoke + Вебмастер — [YANDEX-SEO-GROWTH-PLAN.md](./YANDEX-SEO-GROWTH-PLAN.md)

---

## 5. Порты (если позже Docker)

Ingwaz v1 **не занимает** `PUBLISH_NGINX_PORT`. При будущем стеке — выбрать свободный порт по таблице на VPS (см. quiz `DEPLOY-NEW-PROJECT-ON-SERVER.md` §2.3).

---

## 6. Связанные документы

| Документ | Когда |
|----------|--------|
| [IMPLEMENTATION-PLAYBOOK.md](./IMPLEMENTATION-PLAYBOOK.md) | Порядок работ агента/разработчика |
| [SEO.md](./SEO.md) | Мета, sitemap, релиз |
| [GIT.md](./GIT.md) | Remote, push |
