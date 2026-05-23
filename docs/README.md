# Документация проекта Ingwaz

Индекс материалов по **корневому домену** `ingwaz.space` и thesis-витрине «Сигнал аудитории».

## Продукт и стратегия

| Файл | Назначение |
|------|------------|
| [ROOT-DOMAIN-DECISION.md](./ROOT-DOMAIN-DECISION.md) | **Главный документ:** решение, anti-goals, план 90 дней, метрики 30/90 |
| [NAMING-AND-POSITIONING.md](./NAMING-AND-POSITIONING.md) | Публичное имя, thesis, title/H1 для главной |
| [BLOGGER-SEGMENTS.md](./BLOGGER-SEGMENTS.md) | 9 типов блогеров и приоритет для корня / creator-линии |
| [ANALYSIS-CREATOR-DIRECTIONS.md](./ANALYSIS-CREATOR-DIRECTIONS.md) | Разбор creator-направлений и shortlist (2026-05-07) |
| [STRATEGY-ALTERNATIVE-VIEW.md](./STRATEGY-ALTERNATIVE-VIEW.md) | Сжатый разбор альтернативной позиции (ChatGPT) |
| [PORTFOLIO-MAP.md](./PORTFOLIO-MAP.md) | Поддомены, роли (primary / maintenance), ссылки на репо |

## Инженерия, SEO, деплой

| Файл | Назначение |
|------|------------|
| [PROJECT-BOOTSTRAP.md](./PROJECT-BOOTSTRAP.md) | Чеклист: Vite static site, без Laravel v1 |
| [IMPLEMENTATION-PLAYBOOK.md](./IMPLEMENTATION-PLAYBOOK.md) | Порядок работ: docs → frontend → prod |
| [SEO.md](./SEO.md) | Мета, indexable URL, robots, sitemap, prerender |
| [DEPLOY-VPS.md](./DEPLOY-VPS.md) | Статика на `/var/www/ingwaz/public`, nginx, TLS |
| [YANDEX-SEO-GROWTH-PLAN.md](./YANDEX-SEO-GROWTH-PLAN.md) | Вебмастер, Метрика, фазы 0–1 |
| [COOKIE-CONSENT-AND-ANALYTICS.md](./COOKIE-CONSENT-AND-ANALYTICS.md) | Баннер, Метрика после consent |
| [GIT.md](./GIT.md) | `git@github.com:dpodbereznyh/Ingwaz.git` |
| [ssh-config-snippet.conf](./ssh-config-snippet.conf) | SSH alias `ingwaz-vps` |

## Скрипты (репозиторий)

| Файл | Назначение |
|------|------------|
| [../scripts/deploy-prod.sh](../scripts/deploy-prod.sh) | rsync `frontend/dist` → VPS |
| [../scripts/nginx-host-ingwaz.space.conf](../scripts/nginx-host-ingwaz.space.conf) | Хостовый nginx (static SPA) |

## Вне этого репозитория

| Материал | Где |
|----------|-----|
| Обзор всех продуктов в проде | [startups/RELEASED-PROJECTS-OVERVIEW.md](../../startups/RELEASED-PROJECTS-OVERVIEW.md) |
| CommentSignal (primary tool) | [CommentSignal/docs/](../../CommentSignal/docs/) |
| SEO эталон (полный SaaS) | [SEO Brief Generator/docs/SEO.md](../../SEO Brief Generator/docs/SEO.md) |

## История

| Дата | Изменение |
|------|-----------|
| 2026-05-23 | Перенос стратегии из startups; git rules |
| 2026-05-23 | Инженерные docs: SEO, DEPLOY, BOOTSTRAP, PLAYBOOK, Yandex, scripts |
