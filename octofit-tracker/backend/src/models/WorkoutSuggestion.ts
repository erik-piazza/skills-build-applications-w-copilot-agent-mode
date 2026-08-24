import { InferSchemaType, Schema, model } from 'mongoose';

const workoutSuggestionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    targetGoal: { type: String, required: true, trim: true },
    estimatedDurationMinutes: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

type WorkoutSuggestion = InferSchemaType<typeof workoutSuggestionSchema>;

const WorkoutSuggestionModel = model<WorkoutSuggestion>('WorkoutSuggestion', workoutSuggestionSchema);

export type { WorkoutSuggestion };
export default WorkoutSuggestionModel;
