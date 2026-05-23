# Cookie consent и аналитика (Ingwaz)

Корень **`ingwaz.space`** — публичный RU-сайт. Модель как у **Quiz / SEO Brief / CommentSignal**: **не грузить** Яндекс.Метрику до согласия на analytics.

**Эталон реализации:** `D:\Works\SEO Brief Generator\docs\COOKIE-CONSENT-AND-ANALYTICS.md`, код `frontend/src/analytics/` и `ConsentContext` в seobrief.

---

## MVP

1. Баннер с ссылкой на `/cookies` и `/privacy`.
2. Кнопки: отклонить non-essential / принять analytics (или единая «Понятно» — по юридической модели; для портфеля предпочтительно **явное** accept analytics).
3. `localStorage` + версия политики для re-prompt.
4. Prod: **`VITE_YANDEX_METRIKA_ID=109383201`** (счётчик `ingwaz.space`); `0` — выкл. на staging. Не использовать ID subs.

---

## Цели Метрики (черновик)

| Идентификатор | Смысл |
|---------------|--------|
| `igw_click_commentsignal` | Клик CTA → CommentSignal |
| `igw_click_tool` | Клик другого tool |
| `igw_consent_analytics_accept` | Приняли analytics |

---

## Deploy

Счётчик попадает в бандл только через `frontend/.env.production` при **локальной** сборке — не копировать `.env.production` с других проектов на том же VPS.

См. [DEPLOY-VPS.md](./DEPLOY-VPS.md) §3.
