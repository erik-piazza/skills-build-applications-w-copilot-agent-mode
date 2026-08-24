import cors from 'cors';
import express from 'express';
import apiRouter from './routes';
import baseUrl from './config/baseUrl';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err instanceof Error) {
    res.status(500).json({ error: err.message });
    return;
  }

  res.status(500).json({ error: 'Unknown server error' });
});

export { app, baseUrl };
export default app;
