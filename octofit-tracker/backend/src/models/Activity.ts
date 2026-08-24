import { InferSchemaType, Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    intensity: {
      type: String,
      required: true,
      enum: ['low', 'moderate', 'high'],
    },
    caloriesBurned: { type: Number, required: true, min: 0 },
    performedAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

type Activity = InferSchemaType<typeof activitySchema>;

const ActivityModel = model<Activity>('Activity', activitySchema);

export type { Activity };
export default ActivityModel;
