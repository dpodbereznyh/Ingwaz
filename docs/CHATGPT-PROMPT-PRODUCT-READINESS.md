# Промт для ChatGPT: готовность к разработке витрины Ingwaz

Скопируйте блок **«Промт»** целиком в ChatGPT. Стратегия корня vs subs **уже решена** — не просим переоткрыть этот спор (см. `STRATEGY-ALTERNATIVE-VIEW.md`).

---

## Промт

```
Ты — продуктовый стратег и UX-редактор с опытом solo-founder SaaS, product-led SEO и creator tools (RU-рынок). Работай критически: ищи слепые зоны, не соглашайся ради вежливости.

## Контекст (уже решено, не оспаривай без новых аргументов)

Мы — solo-founder. Зона ingwaz.space: продукты на поддоменах (CommentSignal, SEO Brief, Competitor Snapshot и др.). Корень — **минимальная thesis-витрина**, не медиа-портал и не мультирубрика.

**Зафиксированное решение:**
- Публичное имя витрины: **«Сигнал аудитории»**
- Thesis: audience intelligence для авторов экспертного контента (YouTube long-form, экспертиза/B2B-education)
- Primary CTA и основной SEO: **CommentSignal** (commentsignal.ingwaz.space)
- Secondary (опционально): seobrief / compsnap — компактный список на корне
- Anti-goals: пустые рубрики, 6 равных hero-CTA, дубли intent subs, programmatic thin pages
- v1 корня: **статический Vite-сайт**, без Laravel
- Альтернативная позиция (корень vs subs) уже разбиралась — приняли минимальный thesis-hub + product-led SEO на subs

## Что уже есть в документации

- ROOT-DOMAIN-DECISION: решение, anti-goals, план 90 дней (на весь портфель), метрики 30/90
- NAMING-AND-POSITIONING: черновик title/H1/thesis
- BLOGGER-SEGMENTS, ANALYSIS-CREATOR-DIRECTIONS: ICP и сегменты
- PORTFOLIO-MAP: поддомены и роли
- Инженерия: SEO.md, DEPLOY, bootstrap, cookie consent, Yandex plan

## Что уже сделано в коде (MVP, возможно преждевременно)

Собран frontend (Vite + React): главная с H1 «Сигнал аудитории», thesis-текст, primary card CommentSignal с UTM, secondary tools (SEO Brief, CompSnap), блок maintenance (Landing Critic, Invoice, Quiz), заглушки /privacy и /cookies (noindex), SEO prerender, robots/sitemap только на `/`. UI — тёмная system-ui тема без отдельного design doc. Деплой на VPS (HTTP) начат; HTTPS ждёт DNS.

## Чего явно НЕТ

- ROADMAP-INGWAZ (отдельная дорожная карта витрины по релизам)
- UI guidelines / wireframe / визуальные референсы / tone of voice для бренда
- CONTENT-COPY: финальные тексты всех блоков главной, microcopy CTA, FAQ
- Контент-план 0–3 thesis-страниц на корне (темы, outline, intent — не расписаны)
- Юридические финальные тексты
- Product acceptance criteria витрины (когда «готово к публичному запуску»)

## Твоя задача

**Не** пересматривай стратегию «корень vs subs» с нуля.

**Да:** оцени, **достаточно ли продуктовой документации**, чтобы продолжать разработку UI/контента осознанно (а не «как получится»).

### 1. Executive verdict (5–8 предложений)

Было ли преждевременно писать код? Что критично доделать в docs **до** следующей итерации фронта?

### 2. Gap analysis (таблица)

Колонки: **Область** | **Есть** | **Не хватает** | **Приоритет (P0/P1/P2)** | **Effort (часы solo)**

Области минимум: roadmap витрины, copy deck, UI/brand, контент 0–3 страниц, legal, метрики/аналитика, связка с CommentSignal narrative.

### 3. Roadmap v0.1 → v0.3 (только витрина ingwaz.space)

3 фазы с конкретными deliverables, сроками в неделях для solo-founder (реалистично: 4–8 ч/нед на витрину), **без** распыления на subs.

### 4. Copy deck для главной (черновик RU)

Предложи **готовые тексты** (можно править):
- eyebrow, H1, подзаголовок, thesis (2–3 предложения)
- primary CTA (кнопка + подпись под CTA)
- 2 secondary tool cards (1–2 предложения каждая)
- блок maintenance (как не перегрузить)
- короткий SEO-блок «для кого» (3–4 предложения)
- 3–5 FAQ (вопрос + ответ) — только если оправданы для v1; если нет — аргументируй отказ

Соблюдай anti-goals из решения.

### 5. UI recommendations (без Figma, текстом)

- Иерархия блоков на главной (что выше/ниже и почему)
- 2–3 визуальных референса (тип сайта, не конкретные бренды-клоны)
- Палитра/типографика на уровне принципов (светлая vs тёмная, плотность, «tool portfolio» vs «media»)
- Ошибки текущего MVP UI, если видишь

### 6. Контент на корне: 0, 1 или 3 страницы?

Рекомендуй число indexable URL на v1 (кроме `/`). Если >1 — дай таблицу: URL slug | intent | H1 | зачем на корне, а не на commentsignal.*

### 7. Definition of Done — docs-complete

Чеклист из 10–15 пунктов: «можно снова открыть IDE и не жалеть».

### 8. Риски и жёсткие «нет»

3–5 рисков productive procrastination именно на витрине + что **не** делать в ближайшие 30 дней.

### 9. Вопросы founder'у

5–7 уточняющих вопросов, без которых copy/UI будут generic.

## Формат ответа

- Язык: **русский**
- Структурированно, с таблицами где уместно
- Без воды и без «зависит от контекста» без конкретики
- Если рекомендуешь откатить/заморозить код — объясни trade-off
- Якорь метрик: клики с корня на CommentSignal, не vanity impressions на корне

## Ограничения

- Solo-founder, ~2–4 качественных SEO-материала в месяц **на весь портфель**, не только корень
- Рынок: Россия, язык продукта RU
- Не предлагай Laravel, CMS, мультирубрику, 10+ страниц на корне в v1
```

---

## После ответа ChatGPT

1. Сохранить вывод в `docs/CHATGPT-PRODUCT-READINESS-RESPONSE.md` (или вставить сюда § «Ответ»).
2. Из §4–§7 собрать черновики: `ROADMAP-INGWAZ.md`, `CONTENT-COPY.md`, `UI-GUIDELINES.md`.
3. Сверить с [ROOT-DOMAIN-DECISION.md](./ROOT-DOMAIN-DECISION.md) — не нарушать anti-goals.
4. Только после docs-complete — вторая итерация `frontend/`.
