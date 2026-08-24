import { Router } from 'express';
import ActivityModel from '../models/Activity';
import LeaderboardEntryModel from '../models/LeaderboardEntry';

const leaderboardRouter = Router();

leaderboardRouter.post('/recalculate', async (_req, res, next) => {
  try {
    const topUsers = await ActivityModel.aggregate<{ _id: string; points: number }>([
      {
        $group: {
          _id: '$userId',
          points: { $sum: { $add: ['$durationMinutes', '$caloriesBurned'] } },
        },
      },
      { $sort: { points: -1 } },
    ]);

    await Promise.all(
      topUsers.map((entry) =>
        LeaderboardEntryModel.findOneAndUpdate(
          { userId: entry._id, period: 'weekly' },
          { $set: { points: entry.points } },
          { upsert: true, new: true, runValidators: true }
        )
      )
    );

    res.json({ updated: topUsers.length });
  } catch (error) {
    next(error);
  }
});

leaderboardRouter.get('/', async (_req, res, next) => {
  try {
    const leaderboard = await LeaderboardEntryModel.find({ period: 'weekly' })
      .sort({ points: -1 })
      .populate('userId', 'name email fitnessGoal')
      .limit(50);

    res.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

export default leaderboardRouter;
