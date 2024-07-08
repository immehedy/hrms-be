import { errorMiddleware } from "./middlewares/errors";
import { PrismaClient } from "@prisma/client";
import express, { Express, query, Request, Response } from "express";
import rootRouter from "./routes";
import { PORT } from "./secret";

const app: Express = express();

app.use(express.json());

app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({
  log: ["query"],
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("working server");
});
