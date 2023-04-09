import { Router, Request, Response } from "express";
import UserService from "../service/UserService";
import { InsertUserProps } from "../types/User/InsertUser";
import { MyError } from "../Error/Champion/ChampionError";
import { UpdateUserProps } from "../types/User/UpdateUser";

const userRoute = Router();

userRoute.get("/index", async (_req: Request, res: Response) => {
  try {
    const listUsers = await UserService.listUsers();
    return res.status(200).send({ message: listUsers });
  } catch (error) {
    if (error instanceof MyError) {
      return res.status(error.statusError).send({ message: error.message });
    }
    return res.status(500).send({ message: "Erro interno do servidor." });
  }
});

userRoute.get("/read/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserService.readOneUser(id);
    return res.status(200).send({ message: user });
  } catch (error) {
    if (error instanceof MyError) {
      return res.status(error.statusError).send({ message: error.message });
    }
    return res.status(500).send({ message: "Erro interno do servidor." });
  }
});

userRoute.get(
  "/search-player/:username",
  async (req: Request, res: Response) => {
    try {
      const { username } = req.params;
      const player = await UserService.searchPlayer(username);
      return res.status(200).send({ message: player });
    } catch (error) {
      if (error instanceof MyError) {
        return res.status(error.statusError).send({ message: error.message });
      }
      return res.status(500).send({ message: "Erro interno do servidor." });
    }
  }
);

userRoute.post("/create-player", async (req: Request, res: Response) => {
  try {
    const props: InsertUserProps = req.body;
    const newUser = await UserService.insertUser({
      ...props,
      role: 0,
      ip: 0,
      rp: 0,
    });
    return res.status(201).send({ message: newUser });
  } catch (error) {
    if (error instanceof MyError) {
      return res.status(error.statusError).send({ message: error.message });
    }
    return res.status(500).send({ message: "Erro interno do servidor." });
  }
});

userRoute.post("/create-rioter", async (req: Request, res: Response) => {
  try {
    const props: InsertUserProps = req.body;
    const newUser = await UserService.insertUser({
      ...props,
      role: 1,
      ip: props.ip ?? 0,
      rp: props.rp ?? 0,
    });
    return res.status(201).send({ message: newUser });
  } catch (error) {
    if (error instanceof MyError) {
      return res.status(error.statusError).send({ message: error.message });
    }
    return res.status(500).send({ message: "Erro interno do servidor." });
  }
});

userRoute.put("/player-update/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const props: UpdateUserProps = req.body;
    const updateUser = await UserService.updateYourself(id, props);
    return res.status(200).send({ message: "Usuário atualizdo." });
  } catch (error) {
    if (error instanceof MyError) {
      return res.status(error.statusError).send({ message: error.message });
    }
    return res.status(500).send({ message: "Erro interno do servidor." });
  }
});

userRoute.delete("/delete-player/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await UserService.destroy(id);
    return res.status(200).send({ message: "Usuário deletado." });
  } catch (error) {
    if (error instanceof MyError) {
      return res.status(error.statusError).send({ message: error.message });
    }
    return res.status(500).send({ message: "Erro interno do servidor." });
  }
});

export default userRoute;
