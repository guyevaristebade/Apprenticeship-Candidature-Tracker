import { match } from "assert";
import { Schema, model, Document } from "mongoose";

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    match: [
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      "E-mail invalide",
    ],
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

UserSchema.set("timestamps", true);

export const User = model("User", UserSchema);
