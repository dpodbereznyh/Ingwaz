# SEO: Ingwaz (`ingwaz.space`)

Технический SEO для **статической thesis-витрины** «Сигнал аудитории» на **apex** зоны `ingwaz.space`.

**Эталоны при адаптации:** `D:\Works\SEO Brief Generator\docs\SEO.md`, `D:\Works\Competitor Snapshot\docs\SEO.md`.

**Продуктовые решения:** [ROOT-DOMAIN-DECISION.md](./ROOT-DOMAIN-DECISION.md), [NAMING-AND-POSITIONING.md](./NAMING-AND-POSITIONING.md).

---

## 1. Цели

- Индексация **минимального** набора публичных URL (не медиа-портал).
- Единый канон **`https://ingwaz.space`** (apex, без `www`).
- Исходящие ссылки на subs с **UTM** `?from=root` (или `utm_source=ingwaz&utm_medium=portal`) для Метрики.
- **Не** каннибализировать product-SEO на `commentsignal.*`, `seobrief.*` и т.д.

### 1.1. Сквозной чеклист (новый домен / релиз)

| Слой | Что проверить |
|------|----------------|
| **DNS** | A/AAAA для `ingwaz.space` и при необходимости `www.ingwaz.space` → IP VPS (`45.11.92.65`, актуализировать в панели). |
| **TLS и редиректы** (хостовый nginx) | Канон: **`https://ingwaz.space`**. `http` и `https://www` → **301** на apex. См. [DEPLOY-VPS.md](./DEPLOY-VPS.md) §4. |
| **Фронт `frontend/.env.production`** | **`VITE_SITE_URL=https://ingwaz.space`** без завершающего `/`. |
| **Мета SPA** | `metaConfig.ts` + `DocumentMeta.tsx` + fallback `index.html`; prerender — `frontend/scripts/prerender-seo.mjs`. |
| **`robots.txt`** | `Sitemap: https://ingwaz.space/sitemap.xml`; нет лишнего `Disallow` на indexable URL. |
| **`sitemap.xml`** | Только indexable URL; хост `ingwaz.space`; стиль URL = canonical (без лишнего `/`). |
| **Favicon** | `GET /favicon.ico`, `/favicon.svg` → **200**. |
| **JSON-LD** | На главной: **`Organization`** (+ опционально **`WebSite`**); без product-schema subs. |
| **Аналитика** | [COOKIE-CONSENT-AND-ANALYTICS.md](./COOKIE-CONSENT-AND-ANALYTICS.md) — Метрика при старте SPA; баннер — учёт выбора. |

**Быстрая сверка после выката:**

```bash
curl -sI "http://ingwaz.space/"
curl -sI "https://www.ingwaz.space/"
curl -sS "https://ingwaz.space/robots.txt"
curl -sS "https://ingwaz.space/sitemap.xml"
curl -sI "https://ingwaz.space/privacy/"
# ожидается 301 → /privacy без слэша (если включён rewrite)
```

---

## 2. Политика индексации

### Index, follow (MVP)

Согласовано с **`INDEXABLE_PATHS`** в `frontend/src/seo/metaConfig.ts` и `<loc>` в `sitemap.xml`:

| URL | Назначение |
|-----|------------|
| `/` | Thesis, главный CTA → CommentSignal, список tools |
| `/privacy` | Политика ПДн (когда текст готов; до финала — `noindex`) |
| `/cookies` | Cookie / localStorage (когда готов; до финала — `noindex`) |

**Опционально (после MVP, не рубрики):**

- `/about` — коротко о thesis (1 страница, не журнал).
- 1–2 материала под audience intelligence (отдельные URL только при уникальном контенте).

### Noindex

- Любые черновики legal без финального текста.
- Служебные маршруты, если появятся (`/admin`, preview).

**Не индексировать на корне:** дубли лендингов subs, `/pricing`-клоны продуктов.

---

## 3. Структура SEO во фронте (целевая)

| Назначение | Путь |
|------------|------|
| SEO по маршрутам | `frontend/src/seo/metaConfig.ts` |
| Мета при навигации | `frontend/src/components/DocumentMeta.tsx` |
| Fallback до гидрации | `frontend/index.html` |
| Prerender после build | `frontend/scripts/prerender-seo.mjs` |
| Статика | `frontend/public/robots.txt`, `frontend/public/sitemap.xml` |

До появления `frontend/` — править `public/` или статический `dist/` вручную; после bootstrap — синхронизировать все слои.

---

## 4. Мета-теги (главная)

Черновик — [NAMING-AND-POSITIONING.md](./NAMING-AND-POSITIONING.md):

- **title:** «Сигнал аудитории — инструменты для экспертных авторов | ingwaz.space»
- **description:** про audience intelligence, CommentSignal как якорь, expert creators.
- **canonical:** `https://ingwaz.space`
- **og:** title, description, url, type `website`; `og:image` — favicon или отдельный OG (опц.).

Twitter Card **не** используем (как в соседних проектах).

---

## 5. JSON-LD

- **`Organization`:** name «Сигнал аудитории» (или `SITE_NAME` в коде), url `https://ingwaz.space`.
- **Не** дублировать `SoftwareApplication` продуктов subs на главной — только ссылки в HTML.

---

## 6. robots.txt и sitemap

**robots.txt (MVP):**

```text
User-agent: *
Allow: /

Sitemap: https://ingwaz.space/sitemap.xml
```

Без `Disallow: /api/` (API на корне нет).

**sitemap.xml (MVP):** 1–3 URL (`/`, позже `/privacy`, `/cookies`).

---

## 7. Чеклист перед релизом

- [ ] `VITE_SITE_URL` в `frontend/.env.production` = `https://ingwaz.space`
- [ ] `metaConfig.ts` ↔ `prerender-seo.mjs` ↔ `index.html` (главная)
- [ ] `sitemap.xml` и `robots.txt` в `dist/` после build
- [ ] 301: `www` → apex, trailing slash → без слэша (nginx)
- [ ] CTA на CommentSignal с UTM
- [ ] Отдельный счётчик Метрики (не копировать ID с `seobrief.*` / `compsnap.*`)
- [ ] Переобход indexable URL в Яндекс.Вебмастере

Операционный план: [YANDEX-SEO-GROWTH-PLAN.md](./YANDEX-SEO-GROWTH-PLAN.md).

---

## 8. Смена домена

Если apex сменится (маловероятно): обновить `VITE_SITE_URL`, все `<loc>`, `Sitemap:` в robots, nginx `server_name`, сертификат, Вебмастер.

---

## 9. Чего не делать (anti-goals SEO)

См. [ROOT-DOMAIN-DECISION.md](./ROOT-DOMAIN-DECISION.md) §4: мультирубрика, thin pages, дубли intent subs, programmatic без артефактов.
