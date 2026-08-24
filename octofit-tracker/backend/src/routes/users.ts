import { Router } from 'express';
import UserModel from '../models/User';
import { createAuthToken } from '../utils/authToken';
import { isObjectId } from '../utils/mongoose';
import { hashPassword, verifyPassword } from '../utils/password';

const usersRouter = Router();

usersRouter.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, fitnessGoal, avatarUrl } = req.body as {
      name?: string;
      email?: string;
      password?: string;
      fitnessGoal?: string;
      avatarUrl?: string | null;
    };

    if (!name || !email || !password) {
      res.status(400).json({ error: 'name, email, and password are required' });
      return;
    }

    const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(409).json({ error: 'email is already registered' });
      return;
    }

    const user = await UserModel.create({
      name,
      email,
      passwordHash: hashPassword(password),
      fitnessGoal,
      avatarUrl,
    });

    res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        fitnessGoal: user.fitnessGoal,
        avatarUrl: user.avatarUrl,
      },
      token: createAuthToken(user.id),
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };
    if (!email || !password) {
      res.status(400).json({ error: 'email and password are required' });
      return;
    }

    const user = await UserModel.findOne({ email: email.toLowerCase() }).select('+passwordHash');
    if (!user || !verifyPassword(password, user.passwordHash)) {
      res.status(401).json({ error: 'invalid credentials' });
      return;
    }

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        fitnessGoal: user.fitnessGoal,
        avatarUrl: user.avatarUrl,
      },
      token: createAuthToken(user.id),
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.get('/', async (_req, res, next) => {
  try {
    const users = await UserModel.find({}, '-passwordHash').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.get('/:id', async (req, res, next) => {
  try {
    if (!isObjectId(req.params.id)) {
      res.status(400).json({ error: 'invalid user id' });
      return;
    }

    const user = await UserModel.findById(req.params.id, '-passwordHash');
    if (!user) {
      res.status(404).json({ error: 'user not found' });
      return;
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.patch('/:id', async (req, res, next) => {
  try {
    if (!isObjectId(req.params.id)) {
      res.status(400).json({ error: 'invalid user id' });
      return;
    }

    const { name, fitnessGoal, avatarUrl } = req.body as {
      name?: string;
      fitnessGoal?: string;
      avatarUrl?: string | null;
    };

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { name, fitnessGoal, avatarUrl },
      { new: true, runValidators: true, projection: '-passwordHash' }
    );

    if (!updatedUser) {
      res.status(404).json({ error: 'user not found' });
      return;
    }

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
