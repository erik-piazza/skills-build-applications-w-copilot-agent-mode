# Octofit Tracker Frontend

## Environment variable configuration

Define `VITE_CODESPACE_NAME` so frontend API calls resolve to the backend Codespace URL:

```bash
# octofit-tracker/frontend/.env.local
VITE_CODESPACE_NAME=your-codespace-name
```

When set, API requests use:

`https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`

If `VITE_CODESPACE_NAME` is not set, the app safely falls back to:

`http://localhost:8000/api/[component]/`
