# Implementation Playbook: Ingwaz (docs → static site → prod)

Укороченный плейбук для **thesis-сайта** без Laravel. Полный аналог для SaaS: `D:\Works\SEO Brief Generator\docs\IMPLEMENTATION-PLAYBOOK.md`.

---

## 1) Preflight

1. `git status -sb` в `D:\Works\Ingwaz`.
2. Сверка задачи с [ROOT-DOMAIN-DECISION.md](./ROOT-DOMAIN-DECISION.md) — **не** расширять scope (рубрики, API).
3. SSH: `ssh -o BatchMode=yes -o ConnectTimeout=15 ingwaz-vps "echo ok"`.
4. GitHub: `ssh -T git@github.com`.

---

## 2) Source of truth

| Документ | Для чего |
|----------|----------|
| [ROOT-DOMAIN-DECISION.md](./ROOT-DOMAIN-DECISION.md) | Scope, anti-goals, метрики |
| [NAMING-AND-POSITIONING.md](./NAMING-AND-POSITIONING.md) | Copy, title, H1 |
| [SEO.md](./SEO.md) | Indexable, meta, чеклист релиза |
| [PORTFOLIO-MAP.md](./PORTFOLIO-MAP.md) | Ссылки на subs |
| [DEPLOY-VPS.md](./DEPLOY-VPS.md) | Prod |

---

## 3) Порядок реализации (MVP)

1. **Bootstrap frontend** — [PROJECT-BOOTSTRAP.md](./PROJECT-BOOTSTRAP.md) §1.
2. **Главная** — thesis + 1 primary CTA (CommentSignal) + список tools.
3. **SEO-слой** — `metaConfig`, `DocumentMeta`, robots, sitemap, prerender.
4. **Cookie banner + Метрика** (если включена) — [COOKIE-CONSENT-AND-ANALYTICS.md](./COOKIE-CONSENT-AND-ANALYTICS.md).
5. **nginx** — `scripts/nginx-host-ingwaz.space.conf`.
6. **Deploy** — local build → scp/rsync → smoke.

---

## 4) Quality gates

| Gate | Команда / проверка |
|------|---------------------|
| G1 | `cd frontend && npm run build` |
| G2 | Title/description главной в `dist/index.html` |
| G3 | `curl` robots, sitemap на prod |
| G4 | Docs-sync: README, SEO, DEPLOY актуальны |
| G5 | Нет секретов в git |

---

## 5) Docs-sync

После изменения маршрутов или домена обновить **все**:

- `metaConfig.ts`
- `prerender-seo.mjs`
- `frontend/public/sitemap.xml`
- `SEO.md` / `YANDEX-SEO-GROWTH-PLAN.md` (списки URL)

---

## 6) Что не делать в этом репозитории

- CRUD, Sanctum, OpenRouter, PostgreSQL.
- Копировать `deploy-prod.sh` с Laravel migrate/composer без адаптации.
- Product-led SEO **subs** — это репозитории CommentSignal и др., не Ingwaz.
