import { Router } from 'express';
import baseUrl from '../config/baseUrl';
import activitiesRouter from './activities';
import leaderboardRouter from './leaderboard';
import teamsRouter from './teams';
import usersRouter from './users';
import workoutsRouter from './workouts';

const apiRouter = Router();

apiRouter.get('/', (_req, res) => {
  res.json({
    users: `${baseUrl}/api/users`,
    teams: `${baseUrl}/api/teams`,
    activities: `${baseUrl}/api/activities`,
    leaderboard: `${baseUrl}/api/leaderboard`,
    workouts: `${baseUrl}/api/workouts`,
  });
});

apiRouter.use('/users', usersRouter);
apiRouter.use('/teams', teamsRouter);
apiRouter.use('/activities', activitiesRouter);
apiRouter.use('/leaderboard', leaderboardRouter);
apiRouter.use('/workouts', workoutsRouter);

export default apiRouter;
