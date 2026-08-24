import mongoose from 'mongoose';
import ActivityModel from '../models/Activity';
import LeaderboardEntryModel from '../models/LeaderboardEntry';
import TeamModel from '../models/Team';
import UserModel from '../models/User';
import WorkoutSuggestionModel from '../models/WorkoutSuggestion';
import { hashPassword } from '../utils/password';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      LeaderboardEntryModel.deleteMany({}),
      WorkoutSuggestionModel.deleteMany({}),
    ]);

    const [alex, sam] = await UserModel.create([
      {
        name: 'Alex Carter',
        email: 'alex@octofit.dev',
        passwordHash: hashPassword('Password123!'),
        fitnessGoal: 'endurance',
      },
      {
        name: 'Sam Lee',
        email: 'sam@octofit.dev',
        passwordHash: hashPassword('Password123!'),
        fitnessGoal: 'strength',
      },
    ]);

    await TeamModel.create({
      name: 'Octo Athletes',
      ownerId: alex._id,
      memberIds: [alex._id, sam._id],
      description: 'Friendly weekly challenge team.',
    });

    await ActivityModel.create([
      {
        userId: alex._id,
        type: 'Run',
        durationMinutes: 45,
        intensity: 'moderate',
        caloriesBurned: 420,
      },
      {
        userId: sam._id,
        type: 'Strength Training',
        durationMinutes: 35,
        intensity: 'high',
        caloriesBurned: 360,
      },
    ]);

    await LeaderboardEntryModel.create([
      {
        userId: alex._id,
        points: 465,
        period: 'weekly',
      },
      {
        userId: sam._id,
        points: 395,
        period: 'weekly',
      },
    ]);

    await WorkoutSuggestionModel.create([
      {
        userId: alex._id,
        title: '5K prep intervals',
        description: 'Alternating sprint and jog intervals to build endurance.',
        targetGoal: 'endurance',
        estimatedDurationMinutes: 40,
      },
      {
        userId: sam._id,
        title: 'Upper body progressive overload',
        description: 'Compound and accessory lifts with increasing resistance.',
        targetGoal: 'strength',
        estimatedDurationMinutes: 45,
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
