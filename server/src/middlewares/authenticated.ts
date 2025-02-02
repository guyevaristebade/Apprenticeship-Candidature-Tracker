import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";

export const authenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  let token = (req as any).cookies["act-token"];

  if (!token) {
    return res
      .status(401)
      .send({ success: false, msg: "Access denied", status: 401 });
  }

  try {
    (req as any).user = jwt.verify(token, process.env.JWT_SECRET || "");
    next();
  } catch (err) {
    return res
      .status(400)
      .send({ success: false, msg: "Invalid token", status: 400 });
  }
};
