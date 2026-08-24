import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());
app.use(express.json());

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.get('/api/', (_req, res) => {
  res.json({
    users: `${baseUrl}/api/users/`,
    teams: `${baseUrl}/api/teams/`,
    activities: `${baseUrl}/api/activities/`,
    leaderboard: `${baseUrl}/api/leaderboard/`,
    workouts: `${baseUrl}/api/workouts/`,
  });
});

export { app, baseUrl };
export default app;
