import { Router } from 'express';
import ActivityModel from '../models/Activity';
import UserModel from '../models/User';
import WorkoutSuggestionModel from '../models/WorkoutSuggestion';
import { isObjectId } from '../utils/mongoose';

const workoutsRouter = Router();

workoutsRouter.post('/', async (req, res, next) => {
  try {
    const { userId, title, description, targetGoal, estimatedDurationMinutes } = req.body as {
      userId?: string;
      title?: string;
      description?: string;
      targetGoal?: string;
      estimatedDurationMinutes?: number;
    };

    if (!userId || !title || !description || !targetGoal || !estimatedDurationMinutes) {
      res.status(400).json({
        error: 'userId, title, description, targetGoal, and estimatedDurationMinutes are required',
      });
      return;
    }

    if (!isObjectId(userId)) {
      res.status(400).json({ error: 'invalid userId' });
      return;
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'user not found' });
      return;
    }

    const suggestion = await WorkoutSuggestionModel.create({
      userId,
      title,
      description,
      targetGoal,
      estimatedDurationMinutes,
    });

    res.status(201).json(suggestion);
  } catch (error) {
    next(error);
  }
});

workoutsRouter.get('/suggestions/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!isObjectId(userId)) {
      res.status(400).json({ error: 'invalid userId' });
      return;
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'user not found' });
      return;
    }

    const latestActivities = await ActivityModel.find({ userId }).sort({ performedAt: -1 }).limit(5);
    const averageDuration =
      latestActivities.length > 0
        ? Math.round(latestActivities.reduce((sum, activity) => sum + activity.durationMinutes, 0) / latestActivities.length)
        : 30;

    const persistedSuggestions = await WorkoutSuggestionModel.find({
      userId,
      targetGoal: user.fitnessGoal,
    }).sort({ createdAt: -1 });

    if (persistedSuggestions.length > 0) {
      res.json(persistedSuggestions);
      return;
    }

    res.json([
      {
        title: `${user.fitnessGoal} circuit`,
        description: `Personalized routine based on your recent ${averageDuration} minute average sessions.`,
        targetGoal: user.fitnessGoal,
        estimatedDurationMinutes: averageDuration,
      },
      {
        title: 'Recovery and mobility',
        description: 'Low-impact routine to improve consistency while reducing injury risk.',
        targetGoal: user.fitnessGoal,
        estimatedDurationMinutes: Math.max(20, Math.round(averageDuration * 0.7)),
      },
    ]);
  } catch (error) {
    next(error);
  }
});

workoutsRouter.get('/', async (_req, res, next) => {
  try {
    const workouts = await WorkoutSuggestionModel.find().sort({ createdAt: -1 }).populate('userId', 'name email fitnessGoal');
    res.json(workouts);
  } catch (error) {
    next(error);
  }
});

export default workoutsRouter;
