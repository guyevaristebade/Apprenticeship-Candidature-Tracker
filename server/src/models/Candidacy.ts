import { Schema, model } from "mongoose";
import { ICandidacy } from "../types";

const CandidacySchema: Schema<ICandidacy> = new Schema({
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  applicationDate: { type: Date, required: true, default: Date.now },
  platform: { type: String, required: true },
  status: {
    type: String,
    default: "in progress",
    enum: ["in progress", "interview", "accepted", "rejected"],
  },
  followUp1: { type: Date },
  followUp2: { type: Date },
  resume: { type: String },
  coverLetter: { type: String },
});

CandidacySchema.set("timestamps", true);

export const Candidacy = model("Candidature", CandidacySchema);
