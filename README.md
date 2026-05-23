# Ingwaz — thesis-сайт на `ingwaz.space`

Публичное имя витрины: **«Сигнал аудитории»** (рабочее).  
Домен: **https://ingwaz.space** — минимальный thesis-сайт и ссылки на инструменты портфеля; **не** отдельный SaaS и **не** медиа-портал с рубриками на старте.

## Роль в портфеле

| Слой | Что |
|------|-----|
| **Этот репозиторий** | Контент и код **корневого** сайта (статика или лёгкий фронт), SEO-мета, деплой vhost |
| **CommentSignal** (primary) | Product-led SEO и продукт: `commentsignal.ingwaz.space` |
| **Другие subs** | Собственные репозитории; на корне — карта ссылок, без дубля лендингов |

Источник правды по решениям: [docs/ROOT-DOMAIN-DECISION.md](docs/ROOT-DOMAIN-DECISION.md).

## Документация

См. [docs/README.md](docs/README.md).

**Старт кода:** [docs/PROJECT-BOOTSTRAP.md](docs/PROJECT-BOOTSTRAP.md) → [docs/IMPLEMENTATION-PLAYBOOK.md](docs/IMPLEMENTATION-PLAYBOOK.md).

| Этап | Документ |
|------|----------|
| Решения и scope | [docs/ROOT-DOMAIN-DECISION.md](docs/ROOT-DOMAIN-DECISION.md) |
| SEO | [docs/SEO.md](docs/SEO.md) |
| Деплой (static) | [docs/DEPLOY-VPS.md](docs/DEPLOY-VPS.md) |

## Git

- **Remote:** `git@github.com:dpodbereznyh/Ingwaz.git`
- Подробнее: [docs/GIT.md](docs/GIT.md)

## SSH (prod)

- Алиас: **`ingwaz-vps`** — [docs/ssh-config-snippet.conf](docs/ssh-config-snippet.conf)
- Каталог на VPS: `/var/www/ingwaz/public`

## Связанные репозитории

- `D:\Works\CommentSignal` — якорный продукт (audience comment mining)
- `D:\Works\startups` — обзор портфеля, идеи, ТЗ других направлений
