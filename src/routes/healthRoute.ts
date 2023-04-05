import { Router, Request, Response } from "express";

const route = Router();

route.get("/", (_req: Request, res: Response) => {
  const healthMessenger = { msg: "App running!" };
  res.send(healthMessenger);
});

export default route;
