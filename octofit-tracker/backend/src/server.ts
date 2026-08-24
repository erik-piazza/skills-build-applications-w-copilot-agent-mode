import 'dotenv/config';
import app from './app';
import './config/database';

const PORT = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.listen(PORT, '0.0.0.0', () => {
  console.log(`OctoFit Tracker API listening on ${baseUrl} (port ${PORT})`);
});
