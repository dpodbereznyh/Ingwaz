# Деплой Ingwaz на VPS (apex `ingwaz.space`)

**Тип проекта:** статический сайт (Vite → `frontend/dist`), **без** Laravel/Docker на первом релизе.

**Общий VPS** с Quiz, CommentSignal, SEO Brief и др. (`45.11.92.65`). Эталоны: [Competitor Snapshot DEPLOY-VPS](D:\Works\Competitor Snapshot\docs\DEPLOY-VPS.md) (TLS/nginx), [quiz DEPLOY-NEW-PROJECT](D:\Works\quiz\docs\DEPLOY-NEW-PROJECT-ON-SERVER.md) (DNS, каталог).

**Git:** `git@github.com:dpodbereznyh/Ingwaz.git` — [GIT.md](./GIT.md).

---

## 1. Каталог и DNS

| Параметр | Значение |
|----------|----------|
| **Канонический URL** | `https://ingwaz.space` |
| **Каталог на VPS** | `/var/www/ingwaz` |
| **Document root nginx** | `/var/www/ingwaz/public` (содержимое = `frontend/dist` после sync) |
| **DNS** | A: `ingwaz.space`, `www.ingwaz.space` → IP VPS |

Проверка DNS: `dig +short ingwaz.space`.

---

## 2. Изоляция от других проектов

| Риск | Решение |
|------|---------|
| Конфликт vhost | Отдельный файл **`/etc/nginx/sites-available/ingwaz.space.conf`** |
| Порты Docker | **Не нужны** для v1 (статика отдаётся хостовым nginx напрямую) |
| Секреты | На корне нет `.env` Laravel; только статика и опционально `.env.production` **на машине сборки** |

---

## 3. Локальная сборка и доставка (основной поток)

Политика: **сборка локально**, не на VPS — см. `.cursor/rules/deploy-local-build.mdc`.

### 3.1. На машине разработчика

```powershell
cd D:\Works\Ingwaz\frontend
copy .env.production.example .env.production
# VITE_SITE_URL=https://ingwaz.space
npm ci
npm run build
```

Проверка: в `dist/` есть `index.html`, `robots.txt`, `sitemap.xml`, prerender-каталоги при наличии маршрутов.

### 3.2. Доставка на VPS

**Windows (scp):**

```powershell
scp -r -o BatchMode=yes D:\Works\Ingwaz\frontend\dist\. ingwaz-vps:/var/www/ingwaz/public/
```

**Git Bash / WSL (rsync):**

```bash
rsync -avz --delete \
  --exclude '.env*' \
  ./frontend/dist/ \
  ingwaz-vps:/var/www/ingwaz/public/
```

На сервере один раз:

```bash
mkdir -p /var/www/ingwaz/public
chown -R www-data:www-data /var/www/ingwaz/public   # или nginx:nginx — по политике хоста
```

### 3.3. Скрипт в репозитории

После появления `frontend/`:

```bash
./scripts/deploy-prod.sh
```

Локально собирает (если нужно) и rsync/scp `dist/` → `/var/www/ingwaz/public/` (см. комментарии в скрипте).

---

## 4. HTTPS и хостовый nginx

Шаблон в репозитории: **`scripts/nginx-host-ingwaz.space.conf`**.

### 4.1. Phase 1 — только HTTP (до сертификата)

Скопировать **`scripts/nginx-host-ingwaz.space.phase1-http.conf`** (если есть) или временный `listen 80` с `root /var/www/ingwaz/public` и ACME webroot.

### 4.2. Сертификат

```bash
sudo certbot certonly --webroot -w /var/www/certbot \
  -d ingwaz.space -d www.ingwaz.space \
  --non-interactive --agree-tos
```

### 4.3. Phase 2 — HTTPS + www → apex

```bash
sudo cp /var/www/ingwaz/scripts/nginx-host-ingwaz.space.conf \
  /etc/nginx/sites-available/ingwaz.space.conf
sudo ln -sf /etc/nginx/sites-available/ingwaz.space.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

**Проверки:**

```bash
curl -sI "http://ingwaz.space/"
curl -sI "https://www.ingwaz.space/"
curl -sS -o /dev/null -w '%{http_code}\n' "https://ingwaz.space/"
curl -sS "https://ingwaz.space/robots.txt"
```

Ожидание: HTTP → 301 на HTTPS apex; `www` → 301 на apex; главная **200**.

---

## 5. SPA / prerender на статике

В `location /` для apex:

```nginx
root /var/www/ingwaz/public;
index index.html;
try_files $uri $uri/ $uri/index.html /index.html;
```

Канон **без** завершающего слэша — `rewrite` для `/path/` → `/path` (как в compsnap `docker/nginx/default.prod.conf`).

---

## 6. Обновление с GitHub (опционально)

На VPS можно держать **только** `public/` без полного git, либо клон репозитория для скриптов nginx:

```bash
cd /var/www/ingwaz
git clone git@github.com:dpodbereznyh/Ingwaz.git .
# dist доставляется с dev-машины, не git
```

Источник правды для **статики** — артефакт `frontend/dist` с локальной сборки.

---

## 7. Post-deploy smoke

| Проверка | Ожидание |
|----------|----------|
| `GET https://ingwaz.space/` | 200, title «Сигнал аудитории» |
| `/robots.txt`, `/sitemap.xml` | 200 |
| Ссылка на CommentSignal | ведёт на `https://commentsignal.ingwaz.space` (+ UTM) |
| Метрика | грузится при старте SPA (если `VITE_YANDEX_METRIKA_ID` задан); баннер — учёт выбора |

SEO-чеклист: [SEO.md](./SEO.md) §7.

---

## 8. Что не делать на v1

- Не поднимать Docker Compose / Postgres для корня.
- Не `npm run build` на VPS по умолчанию.
- Не проксировать корень на порт другого продукта.

---

## 9. Эволюция (если появится backend)

При необходимости форм / API — отдельное решение: Laravel на поддомене или минимальный API; тогда смотреть `DEPLOY-VPS.md` в SEO Brief Generator. **Не смешивать** без явной задачи.
