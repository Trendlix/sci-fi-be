import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import v1Router from "./routers/v1.router";
import responseFormatter from "./services/format.services";
import { ServerError } from "./services/error.services";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "TypeScript + Express is working 🚀" });
});

app.use("/api/v1", v1Router);

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  const status = err instanceof ServerError ? err.status : 500;
  const message = err instanceof Error ? err.message : "Internal server error";
  res.status(status).json(responseFormatter(status, message));
});

export default app;