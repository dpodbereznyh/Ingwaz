# Cursor Agent — Ingwaz apex (тонкая оболочка)

| Что | Где |
|-----|-----|
| **Правила агента** | `D:\Works\seo\docs\PORTFOLIO-SEO-AGENT-RULES.md` |
| **Параметры** | `D:\Works\seo\docs\PROJECT-REGISTRY.md` → `ingwaz` |
| **Шаблоны задач** | `D:\Works\seo\docs\prompts\TASK-*.md` |
| **Срез** | `D:\Works\seo\docs\PORTFOLIO-SEO-STATUS.md` |

**В Agent:** hub rules + TASK + этот файл.

Локально: `.cursor/rules/ssh-vps-access.mdc` (если есть), deploy по [DEPLOY-VPS.md](DEPLOY-VPS.md).

---

## Контекст проекта

- Прод: **https://ingwaz.space** (apex, не поддомен)
- VPS: **/var/www/ingwaz** · SSH: **ingwaz-vps**
- **Роль:** thesis-витрина «Сигнал аудитории»; organic на **subs**, не каннибализация micro-SaaS
- **PROJECT_ID:** `ingwaz` · **MARKET:** `ru`
- Indexable в sitemap: **1** (`/`); `/privacy`, `/cookies` — **noindex**, prerender, не в sitemap (legal A)
- Метрика: **109383201**; UTM на subs в `tools.ts` / [PORTFOLIO-MAP.md](PORTFOLIO-MAP.md)
- Перелинковка: CommentSignal (primary) и другие продукты портфеля
- Деплой: по `DEPLOY-VPS.md` (SPA, как соседние)

### Антипаттерны

- SEO-агрессия под ключи micro-SaaS на apex
- Расширять sitemap без обновления PORTFOLIO-MAP и growth-plan
- Игнорировать узкую цель: 1 главная + legal по плану

---

## Текущая задача

**TASK:** `________` (например `TASK-MONITOR-14D`, `TASK-RECRAWL-INDEXABLE`)

### Handoff (срез 2026-05)

**Закрыто:** фаза **0** (23.05): Вебмастер, Метрика, переобход главной; legal A (06.06): noindex legal, sitemap 1 URL; utm_content; hero/OG.  
**Открыто:** финальные legal-тексты; gate фазы 2 (CS signups); CTR apex→CS в Метрике.

**Доки:** [SEO.md](SEO.md), [YANDEX-SEO-GROWTH-PLAN.md](YANDEX-SEO-GROWTH-PLAN.md), [PORTFOLIO-MAP.md](PORTFOLIO-MAP.md).

### Сообщение для Agent

«PROJECT_ID=ingwaz. PORTFOLIO-SEO-AGENT-RULES + TASK + @docs/CURSOR-AGENT-PROMPT.md. Узкая цель apex. До конца.»

---

## Как сменить задачу

TASK из hub; обновить handoff.
