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

## Цели Метрики (prod, счётчик `109383201`)

Тип: **JavaScript-событие**. Идентификатор в коде = поле «Идентификатор цели» в UI.

| Идентификатор | Название в UI | ID цели | Где в коде |
|---------------|---------------|---------|------------|
| `cta_comment_signal` | клик на CommentSignal | 562164726 | CTA и скрин на главной |
| `cta_other_tool` | клик на другой инструмент | 562164759 | secondary / experiments |
| `consent_analytics_accept` | «Принять аналитику» в баннере | 562164763 | `YandexMetrika.tsx` |

Проверка: кликнуть CTA на `https://ingwaz.space` → **Отчёты → Цели** (данные с задержкой до ~20 мин).

---

## Deploy

Счётчик попадает в бандл через `frontend/.env.production` при **локальной** сборке — не коммитить `.env.production`.

См. [DEPLOY-VPS.md](./DEPLOY-VPS.md) §3.
