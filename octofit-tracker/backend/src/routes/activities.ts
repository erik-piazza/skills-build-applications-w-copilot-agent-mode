import { Router } from 'express';
import ActivityModel from '../models/Activity';
import UserModel from '../models/User';
import { isObjectId } from '../utils/mongoose';

const activitiesRouter = Router();

activitiesRouter.post('/', async (req, res, next) => {
  try {
    const { userId, type, durationMinutes, intensity, caloriesBurned, performedAt } = req.body as {
      userId?: string;
      type?: string;
      durationMinutes?: number;
      intensity?: 'low' | 'moderate' | 'high';
      caloriesBurned?: number;
      performedAt?: string;
    };

    if (!userId || !type || !durationMinutes || !intensity || caloriesBurned === undefined) {
      res.status(400).json({ error: 'userId, type, durationMinutes, intensity, and caloriesBurned are required' });
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

    const activity = await ActivityModel.create({
      userId,
      type,
      durationMinutes,
      intensity,
      caloriesBurned,
      performedAt,
    });

    res.status(201).json(activity);
  } catch (error) {
    next(error);
  }
});

activitiesRouter.get('/', async (req, res, next) => {
  try {
    const userId = req.query.userId as string | undefined;

    const query: { userId?: string } = {};
    if (userId) {
      if (!isObjectId(userId)) {
        res.status(400).json({ error: 'invalid userId' });
        return;
      }
      query.userId = userId;
    }

    const activities = await ActivityModel.find(query).sort({ performedAt: -1 }).populate('userId', 'name email');
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

export default activitiesRouter;
