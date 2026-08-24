import { Router } from 'express';
import TeamModel from '../models/Team';
import UserModel from '../models/User';
import { isObjectId } from '../utils/mongoose';

const teamsRouter = Router();

teamsRouter.post('/', async (req, res, next) => {
  try {
    const { name, ownerId, memberIds, description } = req.body as {
      name?: string;
      ownerId?: string;
      memberIds?: string[];
      description?: string;
    };

    if (!name || !ownerId) {
      res.status(400).json({ error: 'name and ownerId are required' });
      return;
    }

    if (!isObjectId(ownerId)) {
      res.status(400).json({ error: 'invalid ownerId' });
      return;
    }

    if (memberIds && !memberIds.every((memberId) => isObjectId(memberId))) {
      res.status(400).json({ error: 'all memberIds must be valid object ids' });
      return;
    }

    const owner = await UserModel.findById(ownerId);
    if (!owner) {
      res.status(404).json({ error: 'owner user not found' });
      return;
    }

    const fullMemberIds = Array.from(new Set([ownerId, ...(memberIds ?? [])]));
    const team = await TeamModel.create({
      name,
      ownerId,
      memberIds: fullMemberIds,
      description,
    });

    res.status(201).json(team);
  } catch (error) {
    next(error);
  }
});

teamsRouter.get('/', async (_req, res, next) => {
  try {
    const teams = await TeamModel.find().populate('ownerId memberIds', 'name email');
    res.json(teams);
  } catch (error) {
    next(error);
  }
});

teamsRouter.post('/:id/members', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { memberId } = req.body as { memberId?: string };

    if (!isObjectId(id) || !isObjectId(memberId)) {
      res.status(400).json({ error: 'invalid team or member id' });
      return;
    }

    const member = await UserModel.findById(memberId);
    if (!member) {
      res.status(404).json({ error: 'member user not found' });
      return;
    }

    const team = await TeamModel.findByIdAndUpdate(
      id,
      { $addToSet: { memberIds: memberId } },
      { new: true, runValidators: true }
    ).populate('ownerId memberIds', 'name email');

    if (!team) {
      res.status(404).json({ error: 'team not found' });
      return;
    }

    res.json(team);
  } catch (error) {
    next(error);
  }
});

export default teamsRouter;
