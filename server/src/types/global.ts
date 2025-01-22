import mongoose, { Document } from "mongoose";

export interface ResponseType<Type = any> {
  success: boolean;
  status?: number;
  msg?: string;
  data?: Type;
}

export const ObjectId = mongoose.Types.ObjectId;

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICandidacy extends Document {
  applicationDate: Date;
  company: string;
  jobTitle: string;
  platform: string;
  followUp1?: Date;
  followUp2?: Date;
  status: "in progress" | "accepted" | "rejected" | "interview";
  resume?: string;
  coverLetter?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CandidacyType {
  applicationDate: Date;
  company: string;
  jobTitle: string;
  platform: string;
}

export interface CandidacyUpdateType {
  applicationDate?: Date;
  company?: string;
  jobTitle?: string;
  platform?: string;
  followUp1?: Date;
  followUp2?: Date;
  status?: "in progress" | "accepted" | "rejected" | "interview";
  resume?: string;
  coverLetter?: string;
}

export interface IStatistics extends Document {
  user_id: mongoose.Types.ObjectId;
  total_applications: number;
  total_companies: number;
  total_rejected: number;
  total_interviews: number;
  total_accepted: number;
  createdAt: Date;
  updatedAt: Date;
}
