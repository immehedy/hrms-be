import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secret";
import { BadRequestsExceptions } from "../exceptions/bad-requests";
import { ErrorCode } from "../exceptions/root";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req?.body;
  let user = await prismaClient.user.findFirst({ where: { email } });

  if (user) {
    // throw Error("User already exists !");
    next(
      new BadRequestsExceptions(
        "User already exists !",
        ErrorCode.USER_ALREADY_EXISTS
      )
    );
  }
  user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
    },
  });
  res.json(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req?.body;

  let user = await prismaClient?.user?.findFirst({ where: { email } });

  if (!user) {
    throw Error("No user found !");
  }
  if (!compareSync(password, user?.password)) {
    throw Error("Psssword is incorrect !");
  }
  let token = jwt.sign(
    {
      userId: user?.id,
    },
    JWT_SECRET
  );

  res.json({
    user,
    token,
  });
};
