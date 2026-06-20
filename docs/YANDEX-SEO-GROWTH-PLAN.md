# План роста видимости: ingwaz.space (Яндекс)

Чеклист на **первые 4–8 недель** после вывода thesis-сайта в прод. Техника — **[SEO.md](SEO.md)**.

**Канон:** `https://ingwaz.space` (apex; `www` → 301).

**Цель корня:** не массовый organic, а **ясная витрина + клики на CommentSignal** (UTM). Основной SEO-трафик — на `commentsignal.ingwaz.space`.

---

## URL для переобхода (MVP)

1. https://ingwaz.space  

**Legal (сценарий A, 06.2026):** `/privacy`, `/cookies` — `noindex, follow`, **не** в `sitemap.xml`; prerender для краулеров. Переобход legal не нужен до финализации текстов.

`INDEXABLE_PATHS` = `/` только; `PRERENDER_PATHS` = `/`, `/privacy`, `/cookies`.

Не отправлять варианты **со слэшем** — 301 на канон без `/`.

**Google Search Console:** после релиза — sitemap `https://ingwaz.space/sitemap.xml` (1 URL); URL Inspection для `/` при изменении hero/OG.

---

## Фаза 0 (день 1–2): инфраструктура

| Шаг | Действие | Готово |
|-----|----------|--------|
| 0.1 | Добавить сайт в **Яндекс.Вебмастер** (отдельно от subs) | ☑ (2026-05-23) |
| 0.2 | Главное зеркало: HTTPS apex | ☑ |
| 0.3 | `curl` `/robots.txt`, `/sitemap.xml`, `/favicon.ico` → 200 | ☑ (после v0.3 deploy) |
| 0.4 | **Метрика:** счётчик `109383201`; цели JS-событий в UI | ☑ (2026-05-23) |
| 0.5 | Cookie-баннер + Метрика без блокировки загрузки — [COOKIE-CONSENT-AND-ANALYTICS.md](./COOKIE-CONSENT-AND-ANALYTICS.md) | ☑ |

**Регион:** «Нет региона».

### Яндекс.Вебмастер ✅ (2026-05-23)

1. ~~Добавить сайт~~ → `https://ingwaz.space` ✅
2. ~~Подтверждение DNS TXT~~ ✅
3. ~~Sitemap~~ → `https://ingwaz.space/sitemap.xml` ✅
4. ~~Переобход~~ → `https://ingwaz.space` ✅
5. ~~Счётчик Метрики `109383201` в настройках сайта~~ ✅

Статус «Данные скоро появятся» в списке сайтов — норма первых суток; после переобхода смотреть **Индексирование → Страницы в поиске**.

**Метрика (цели в UI ✅):** `cta_comment_signal`, `cta_other_tool`, `consent_analytics_accept` — идентификаторы совпадают с кодом (`metricaGoals.ts`).

---

## Фаза 1 (неделя 1–2): сниппет главной

| Шаг | Действие | Готово |
|-----|----------|--------|
| 1.1 | Wordstat — [WORDSTAT-KEYWORDS-INGWAZ.md](./WORDSTAT-KEYWORDS-INGWAZ.md) (2026-05-23) | ☑ |
| 1.2 | Title/description по [NAMING-AND-POSITIONING.md](./NAMING-AND-POSITIONING.md) | ☑ |
| 1.3 | Видимый текст на `/`: thesis, для кого, CTA, скрин CommentSignal | ☑ (v0.3) |
| 1.4 | Переобход `/` в Вебмастере | ☑ (2026-05-23) |

---

## Фаза 2 (по решению §6 ROOT-DOMAIN-DECISION)

**Только если** product-SEO на CommentSignal даёт signups:

- 1–3 коротких материала на корне (не рубрики `/seo/`, `/marketing/`).
- Или удвоить effort на `commentsignal.*`, корень оставить минимальным.

---

## Метрики (корень)

| Метрика | Ориентир 30 дней |
|---------|------------------|
| Клики на `commentsignal.*` с UTM | ≥ 20 / мес |
| Время на поддержку корня | < 4 ч / мес |

Подробнее: [ROOT-DOMAIN-DECISION.md](./ROOT-DOMAIN-DECISION.md) §6.

---

## Журнал

| Дата | Действие |
|------|----------|
| **2026-05-30** | sitemap **3** URL; legal `index, follow`; prerender `/privacy`, `/cookies`; деплой `public/`; `tools.ts` — MetadataPack, AEO Audit |
| **2026-06-04** | nginx: убран `$uri/` (301 loop `/privacy`); dist → `public/`; переобход `/`, `/privacy`, `/cookies` **В очереди** 15:07 (ранее privacy/cookies — **Ошибка**) |
| **2026-06-06** | Legal A: `/privacy`, `/cookies` → `noindex`; sitemap **1** URL; utm_content по блокам; hero copy; og-image.svg; gate фазы 2 зафиксирован в журнале |
| **2026-06-06** | Кабинеты: GSC URL Inspection `/` → в индексе, запрос переиндексации отправлен; sitemap apex в GSC; Вебмастер sitemap пересдан 15:23 + повторный переобход sitemap; переобход `/` после Legal A; SSH `ingwaz-vps` в `~/.ssh/config` |
| **2026-06-06** | **Baseline Метрика** (7 мая — 6 июн, счётчик `109383201`): визиты **51**, посетители **50**, просмотры **114**; прямые **46**, поиск **5**; цели `cta_comment_signal` / `cta_other_tool` / `consent_analytics_accept` в UI ✅, срабатываний **0** → CTR витрины **0%**; повторный срез ~**2026-06-20** |
| **2026-06-20** | **Parity wave 2:** H2 «Витрина инструментов для YouTube-автора» + FAQ портфеля на `/`; keywords `инструменты для youtube`; dist → `public/`; **переобход** `https://ingwaz.space` «In queue» 22:39 |
| **2026-06-18** | — | Wordstat refresh apex (vitrona): [WORDSTAT-KEYWORDS-INGWAZ.md](WORDSTAT-KEYWORDS-INGWAZ.md) **18.05–16.06**; meta без изменений; «исследование аудитории» 5368, «сигнал аудитории» 654 |

## Бэклог (не MVP)

- OG-image 1200×630
- `/about` одной страницей
