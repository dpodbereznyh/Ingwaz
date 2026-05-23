# Git: репозиторий и рабочий процесс

## Удалённый репозиторий

| Параметр | Значение |
|----------|----------|
| **Origin** | `git@github.com:dpodbereznyh/Ingwaz.git` |
| **GitHub (HTTPS)** | https://github.com/dpodbereznyh/Ingwaz |
| **Ветка по умолчанию** | `main` |

Первичная настройка клона:

```bash
git clone git@github.com:dpodbereznyh/Ingwaz.git
cd Ingwaz
```

Если репозиторий уже есть локально без remote:

```bash
git init
git remote add origin git@github.com:dpodbereznyh/Ingwaz.git
git branch -M main
```

## Что версионировать

- `README.md`, `docs/**` — да
- `.cursor/rules/**` — да (правила агента)
- `.env`, ключи, `node_modules/`, будущий `dist/` — **нет** (добавить в `.gitignore` при появлении кода)

## Workflow

1. Коммиты с понятным сообщением (RU или EN, единообразно в репо).
2. Перед push: `git status` — нет секретов.
3. Основной поток: `main` (feature-ветки — по желанию для PR).

## Связь с портфелем

Этот репозиторий — **только** корневой домен `ingwaz.space`. Продукты на поддоменах — отдельные GitHub-репозитории; карта: [PORTFOLIO-MAP.md](./PORTFOLIO-MAP.md).
