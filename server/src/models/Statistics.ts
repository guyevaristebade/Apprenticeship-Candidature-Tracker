import { Schema, model } from "mongoose";

import { IStatistics } from "../types";

const StatisticsSchema: Schema<IStatistics> = new Schema({
  user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  total_applications: { type: Number, default: 0 },
  total_companies: { type: Number, default: 0 },
  total_rejected: { type: Number, default: 0 },
  total_interviews: { type: Number, default: 0 },
  total_accepted: { type: Number, default: 0 },
});

StatisticsSchema.set("timestamps", true);

export const Statistics = model("Statistics", StatisticsSchema);
