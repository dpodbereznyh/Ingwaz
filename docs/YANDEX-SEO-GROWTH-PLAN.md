# План роста видимости: ingwaz.space (Яндекс)

Чеклист на **первые 4–8 недель** после вывода thesis-сайта в прод. Техника — **[SEO.md](SEO.md)**.

**Канон:** `https://ingwaz.space` (apex; `www` → 301).

**Цель корня:** не массовый organic, а **ясная витрина + клики на CommentSignal** (UTM). Основной SEO-трафик — на `commentsignal.ingwaz.space`.

---

## URL для переобхода (MVP)

1. https://ingwaz.space  

После публикации legal:

2. https://ingwaz.space/privacy  
3. https://ingwaz.space/cookies  

Не отправлять варианты **со слэшем** — 301 на канон без `/`.

---

## Фаза 0 (день 1–2): инфраструктура

| Шаг | Действие | Готово |
|-----|----------|--------|
| 0.1 | Добавить сайт в **Яндекс.Вебмастер** (отдельно от subs) | ☐ |
| 0.2 | Главное зеркало: HTTPS apex | ☑ |
| 0.3 | `curl` `/robots.txt`, `/sitemap.xml`, `/favicon.ico` → 200 | ☑ (после v0.3 deploy) |
| 0.4 | **Метрика:** счётчик `109383201`; цели: `click_commentsignal`, `click_other_tool` | ☑ |
| 0.5 | Cookie-баннер + Метрика без блокировки загрузки — [COOKIE-CONSENT-AND-ANALYTICS.md](./COOKIE-CONSENT-AND-ANALYTICS.md) | ☑ |

**Регион:** «Нет региона».

### Яндекс.Вебмастер (ручной шаг)

1. [webmaster.yandex.ru](https://webmaster.yandex.ru/) → **Добавить сайт** → `https://ingwaz.space`
2. **Подтверждение:** DNS TXT `yandex-verification:a060ab26aa8d9dcf` (запись уже в зоне `ingwaz.space`)
3. **Индексирование → Файлы Sitemap** → `https://ingwaz.space/sitemap.xml`
4. **Переобход страниц** → `https://ingwaz.space` (без trailing `/`)
5. Опционально: связать счётчик Метрики `109383201` в настройках сайта

---

## Фаза 1 (неделя 1–2): сниппет главной

| Шаг | Действие | Готово |
|-----|----------|--------|
| 1.1 | Wordstat (ориентир): «инсайты из комментариев youtube», «идеи для контента канал», «обратная связь аудитории» | ☐ |
| 1.2 | Title/description по [NAMING-AND-POSITIONING.md](./NAMING-AND-POSITIONING.md) | ☑ |
| 1.3 | Видимый текст на `/`: thesis, для кого, CTA, скрин CommentSignal | ☑ (v0.3) |
| 1.4 | Переобход `/` в Вебмастере | ☐ (после 0.1) |

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

## Бэклог (не MVP)

- OG-image 1200×630
- `/about` одной страницей
- Обход по счётчикам Метрики в Вебмастере
