import bcrypt from "bcryptjs";
import { IUserLogin, IUserRegister, IUserUpdate, ResponseType } from "../types";
import { User } from "../models";
import { sanitizeFilter } from "mongoose";
import { passwordValidators } from "../services";

export const CreateUser = async (
  userData: IUserRegister
): Promise<ResponseType> => {
  let response: ResponseType = {
    success: true,
  };

  const { username, email, password } = userData;

  if (!username || !email || !password) {
    response.status = 400;
    response.success = false;
    response.msg = "Please fill all fields";
    return response;
  }

  try {
    let user = await User.findOne(sanitizeFilter({ email }));
    if (user) {
      response.status = 400;
      response.success = false;
      response.msg = "An user already exist with this email";
      return response;
    }

    let validation = passwordValidators(password);
    for (const el of validation) {
      if (!el.validator) {
        response.status = 400;
        response.success = false;
        response.msg = el.message;
        return response;
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAgent = new User(
      sanitizeFilter({
        username,
        email,
        password: hashedPassword,
      })
    );

    await newAgent.save();

    const { password: _, ...rest } = newAgent.toObject();

    response.msg = "Registration successffully";
    response.data = rest;
  } catch (e: any) {
    response.status = 500;
    response.success = false;
    response.msg =
      "Internal server error, contact the administrator or developpers";
  }
  return response;
};

export const LoginUser = async (
  userData: IUserLogin
): Promise<ResponseType> => {
  let response: ResponseType = {
    success: true,
    status: 200,
  };

  const { email, password } = userData;

  if (!email || !password) {
    response.status = 400;
    response.success = false;
    response.msg = "please fill all fields";
    return response;
  }

  try {
    let user = await User.findOne(sanitizeFilter({ email }));

    if (!user) {
      response.status = 400;
      response.success = false;
      response.msg = "User with this email does not exist";
      return response;
    }

    const isMatch = await bcrypt.compare(password, user?.password as string);
    if (!isMatch) {
      response.status = 400;
      response.success = false;
      response.msg = "invalid password";
      return response;
    }

    const { password: _, ...rest } = user.toObject();

    response.msg = "Connection successfully";
    response.data = rest;
  } catch (e: any) {
    response.status = 500;
    response.success = false;
    response.msg =
      "Internal server error, contact the administrator or developpers";
  }
  return response;
};

export const UpdateUser = async (
  UpdateUserData: IUserUpdate
): Promise<ResponseType> => {
  let response: ResponseType = {
    success: true,
    status: 200,
  };

  const { username, email, password } = UpdateUserData;

  if (!username || !email || !password) {
    response.status = 400;
    response.success = false;
    response.msg = "please fill at least one field";
    return response;
  }

  try {
    let user = await User.findOne(sanitizeFilter({ email }));

    if (!user) {
      response.status = 400;
      response.success = false;
      response.msg = "User with this email does not exist";
      return response;
    }

    if (username) user.username = username;

    if (email) user.email = email;

    if (password) {
      let validation = passwordValidators(password);
      for (const el of validation) {
        if (!el.validator) {
          response.status = 400;
          response.success = false;
          response.msg = el.message;
          return response;
        }
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    const { password: _, ...rest } = user.toObject();

    response.msg = "User updated successfully";
    response.data = rest;
  } catch (e: any) {
    response.status = 500;
    response.success = false;
    response.msg =
      "Internal server error, contact the administrator or developpers";
  }
  return response;
};
