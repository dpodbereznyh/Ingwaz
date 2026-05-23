# Cookie consent и аналитика (Ingwaz)

Корень **`ingwaz.space`** — публичный RU-сайт. Модель как у **Landing Critic AI / Invoice & Proposal Builder**:

- **Яндекс.Метрика** подключается при наличии счётчика **без ожидания** выбора в баннере.
- Баннер фиксирует **ознакомление** и предпочтение пользователя в `localStorage` (версия политики для re-prompt).
- Не вставлять blocking `<script>` в `index.html` — init в одном модуле `YandexMetrika.tsx` + `yandexMetrika.ts`.

**Эталон кода:** `D:\Works\Landing Critic AI\frontend\src\components\YandexMetrika.tsx`.

---

## MVP

1. Баннер с ссылками на `/cookies` и `/privacy`.
2. Кнопки: «Только необходимые» / «Принять аналитику» (или «Понятно», если счётчик выключен) — выбор сохраняется, **не блокирует** загрузку Метрики на prod.
3. `localStorage` + версия политики для re-prompt.
4. Prod: **`VITE_YANDEX_METRIKA_ID=109383201`**; `0` — выкл. на staging.

---

## Цели Метрики (черновик)

| Идентификатор | Смысл |
|---------------|--------|
| `cta_comment_signal` | Клик CTA → CommentSignal |
| `cta_other_tool` | Клик другого tool |
| `consent_analytics_accept` | Явно приняли analytics в баннере |

---

## Deploy

Счётчик попадает в бандл через `frontend/.env.production` при **локальной** сборке — не коммитить `.env.production`.

См. [DEPLOY-VPS.md](./DEPLOY-VPS.md) §3.
