import { InferSchemaType, Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    fitnessGoal: { type: String, default: 'general fitness' },
    avatarUrl: { type: String, default: null },
  },
  { timestamps: true }
);

type User = InferSchemaType<typeof userSchema>;

const UserModel = model<User>('User', userSchema);

export type { User };
export default UserModel;
