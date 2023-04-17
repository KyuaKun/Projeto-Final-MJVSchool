import { Request, Response, Router } from "express";
import { idEmptyError } from "../Error/IdEmptyError";
import { dataNotFoundError } from "../Error/dataNotFoundError";
import { fieldsEmptyError } from "../Error/fieldsEmptyError";
import { invalidNameError } from "../Error/invalidNameError";
import { rioterAuthorization } from "../middleware/rioterAuthorization";
import { tokenAuthorization } from "../middleware/tokenAuthorization";
import { InsertUserProps } from "../types/User/InsertUser";
import { UpdateUserProps } from "../types/User/UpdateUser";
import UserService from "../service/UserService";
import { loginRequiredError } from "../Error/loginRequiredError";
import { invalidUserError } from "../Error/invalidUserError";

const userRoute = Router();

userRoute.get(
  "/list_all_user",
  rioterAuthorization,
  async (_req: Request, res: Response) => {
    try {
      const listUsers = await UserService.listUsers();
      return res.status(200).send({ message: listUsers });
    } catch (error) {
      if (error instanceof dataNotFoundError) {
        return res.status(error.statusError).send({ message: error.message });
      }
      if (error instanceof loginRequiredError) {
        return res.status(error.statusError).send({ message: error.message });
      }
      if (error instanceof invalidUserError) {
        return res.status(error.statusError).send({ message: error.message });
      }
      return res.status(500).send({ message: "Erro interno do servidor." });
    }
  }
);

userRoute.get(
  "/read_one_user",
  rioterAuthorization,
  async (req: Request, res: Response) => {
    try {
      const user = await UserService.readUserById(req.userId);
      return res.status(200).send({ message: user });
    } catch (error) {
      if (error instanceof idEmptyError) {
        return res.status(error.statusError).send({ message: error.message });
      }

      if (error instanceof dataNotFoundError) {
        return res.status(error.statusError).send({ message: error.message });
      }
      if (error instanceof loginRequiredError) {
        return res.status(error.statusError).send({ message: error.message });
      }
      if (error instanceof invalidUserError) {
        return res.status(error.statusError).send({ message: error.message });
      }
      return res.status(500).send({ message: "Erro interno do servidor." });
    }
  }
);

userRoute.get(
  "/search-player/:username",
  tokenAuthorization,
  async (req: Request, res: Response) => {
    try {
      const { username } = req.params;
      const player = await UserService.searchPlayer(username);
      return res.status(200).send({ message: player });
    } catch (error) {
      if (error instanceof dataNotFoundError) {
        return res.status(error.statusError).send({ message: error.message });
      }
      if (error instanceof loginRequiredError) {
        return res.status(error.statusError).send({ message: error.message });
      }
      return res.status(500).send({ message: "Erro interno do servidor." });
    }
  }
);

userRoute.post("/create-player", async (req: Request, res: Response) => {
  try {
    const props: InsertUserProps = req.body;
    const _newUser = await UserService.insertUser({
      ...props,
      role: 0,
      ip: 0,
      rp: 0,
    });
    return res.status(201).send({ message: "Usuário criado." });
  } catch (error) {
    if (error instanceof fieldsEmptyError) {
      return res.status(error.statusError).send({ message: error.message });
    }
    if (error instanceof invalidNameError) {
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
    if (error instanceof fieldsEmptyError) {
      return res.status(error.statusError).send({ message: error.message });
    }
    if (error instanceof invalidNameError) {
      return res.status(error.statusError).send({ message: error.message });
    }
    return res.status(500).send({ message: "Erro interno do servidor." });
  }
});

userRoute.put(
  "/player-update",
  tokenAuthorization,
  async (req: Request, res: Response) => {
    try {
      const props: UpdateUserProps = req.body;
      const _updateUser = await UserService.update(req.userId, props);
      return res.status(200).send({ message: "Usuário atualizdo." });
    } catch (error) {
      if (error instanceof idEmptyError) {
        return res.status(error.statusError).send({ message: error.message });
      }
      if (error instanceof dataNotFoundError) {
        return res.status(error.statusError).send({ message: error.message });
      }
      if (error instanceof invalidNameError) {
        return res.status(error.statusError).send({ message: error.message });
      }
      if (error instanceof loginRequiredError) {
        return res.status(error.statusError).send({ message: error.message });
      }

      return res.status(500).send({ message: "Erro interno do servidor." });
    }
  }
);

userRoute.put(
  "/rioter-update-one/:id",
  rioterAuthorization,
  async (req: Request, res: Response) => {
    try {
      const props: UpdateUserProps = req.body;
      const _updateUser = await UserService.update(req.body.id, props);
      return res.status(200).send({ message: "Usuário atualizdo." });
    } catch (error) {
      if (error instanceof idEmptyError) {
        return res.status(error.statusError).send({ message: error.message });
      }
      if (error instanceof dataNotFoundError) {
        return res.status(error.statusError).send({ message: error.message });
      }
      if (error instanceof invalidNameError) {
        return res.status(error.statusError).send({ message: error.message });
      }
      if (error instanceof loginRequiredError) {
        return res.status(error.statusError).send({ message: error.message });
      }
      if (error instanceof invalidUserError) {
        return res.status(error.statusError).send({ message: error.message });
      }

      return res.status(500).send({ message: "Erro interno do servidor." });
    }
  }
);

userRoute.delete(
  "/delete-player/:id",
  rioterAuthorization,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await UserService.destroy(id);
      return res.status(200).send({ message: "Usuário deletado." });
    } catch (error) {
      if (error instanceof idEmptyError) {
        return res.status(error.statusError).send({ message: error.message });
      }
      if (error instanceof dataNotFoundError) {
        return res.status(error.statusError).send({ message: error.message });
      }
      if (error instanceof loginRequiredError) {
        return res.status(error.statusError).send({ message: error.message });
      }
      if (error instanceof invalidUserError) {
        return res.status(error.statusError).send({ message: error.message });
      }
      return res.status(500).send({ message: "Erro interno do servidor." });
    }
  }
);

export default userRoute;
