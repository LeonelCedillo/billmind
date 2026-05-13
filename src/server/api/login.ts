import type { Request, Response } from "express";
import { getUserByEmail } from "../../db/queries/users.js";
import { UserNotAuthenticatedError, BadRequestError } from "./errors.js";
import { checkPasswordHash } from "./auth.js";


export async function handlerLogin(req: Request, res: Response) {
  type parameters = {
    email: string;
    password: string;
  }

  const params: parameters = req.body;
  if (!params.email || !params.password) {
    throw new BadRequestError("Missing required fields");
  }

  const user = await getUserByEmail(params.email);
  if (!user) {
    throw new UserNotAuthenticatedError("Invalid username or password");
  }

  const matching = await checkPasswordHash(params.password, user.passwordHash);
  if (!matching) {
    throw new UserNotAuthenticatedError("Invalid username or password");
  }
  
  // auth later with access token and refresh token here

  res.status(200).json({
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt
  });
}

