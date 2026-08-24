import { InferSchemaType, Schema, model } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    points: { type: Number, required: true, min: 0, default: 0 },
    period: { type: String, required: true, enum: ['weekly', 'monthly', 'all-time'], default: 'weekly' },
  },
  { timestamps: true }
);

leaderboardEntrySchema.index({ userId: 1, period: 1 }, { unique: true });

type LeaderboardEntry = InferSchemaType<typeof leaderboardEntrySchema>;

const LeaderboardEntryModel = model<LeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);

export type { LeaderboardEntry };
export default LeaderboardEntryModel;
