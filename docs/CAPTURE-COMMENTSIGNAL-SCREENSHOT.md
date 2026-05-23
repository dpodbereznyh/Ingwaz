# Capture CommentSignal screenshot for ingwaz evidence block (v0.3+)

Requires Google Chrome on Windows.

```powershell
$out = "frontend/public/images/commentsignal-screenshot.png"
New-Item -ItemType Directory -Force -Path (Split-Path $out) | Out-Null
& "${env:ProgramFiles}\Google\Chrome\Application\chrome.exe" `
  --headless=new --disable-gpu --window-size=1280,800 `
  --screenshot=$out "https://commentsignal.ingwaz.space"
```

After refresh: `cd frontend && npm run build`, then deploy `dist` per [DEPLOY-VPS.md](./DEPLOY-VPS.md).
