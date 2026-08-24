import 'dotenv/config';
import app from './app';
import baseUrl from './config/baseUrl';
import './config/database';

const PORT = Number(process.env.PORT) || 8000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`OctoFit Tracker API listening on ${baseUrl} (port ${PORT})`);
});
