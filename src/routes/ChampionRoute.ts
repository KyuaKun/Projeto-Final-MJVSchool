import { Request, Response, Router } from "express";
import { idEmptyError } from "../Error/IdEmptyError";
import { dataNotFoundError } from "../Error/dataNotFoundError";
import { fieldsEmptyError } from "../Error/fieldsEmptyError";
import { invalidNameError } from "../Error/invalidNameError";
import { rioterAuthorization } from "../middleware/rioterAuthorization";
import { tokenAuthorization } from "../middleware/tokenAuthorization";
import ChampionService from "../service/ChampionService";
import { ChampionProps } from "../types/Champion/Champion";
import { UpdateChampionProps } from "../types/Champion/UpdateChampion";
const championRoute = Router();

championRoute.get(
  "/index",
  tokenAuthorization,
  async (_req: Request, res: Response) => {
    try {
      const listOfChampions = await ChampionService.listChampions();
      return res.status(200).send({ message: listOfChampions });
    } catch (error) {
      if (error instanceof dataNotFoundError) {
        return res.status(error.statusError).send({ message: error.message });
      }
      return res.status(500).send({ message: "Erro interno do servidor." });
    }
  }
);

championRoute.get(
  "/show/:name",
  tokenAuthorization,
  async (req: Request, res: Response) => {
    try {
      const { name } = req.params;
      const champion = await ChampionService.showOneChampionByName(name);
      return res.status(200).send({ message: champion });
    } catch (error) {
      if (error instanceof fieldsEmptyError) {
        return res.status(error.statusError).send({ message: error.message });
      }
      if (error instanceof dataNotFoundError) {
        return res.status(error.statusError).send({ message: error.message });
      }
      return res.status(500).send({ message: "Erro interno do servidor." });
    }
  }
);

championRoute.get(
  "/read/:id",
  rioterAuthorization,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const champion = await ChampionService.showOneChampionById(id);

      return res.status(200).send({ message: champion });
    } catch (error) {
      if (error instanceof idEmptyError) {
        return res.status(error.statusError).send({ message: error.message });
      }
      if (error instanceof dataNotFoundError) {
        return res.status(error.statusError).send({ message: error.message });
      }
      return res.status(500).send({ message: "Erro interno do servidor." });
    }
  }
);

championRoute.post(
  "/create",
  rioterAuthorization,
  async (req: Request, res: Response) => {
    try {
      const props: ChampionProps = req.body;
      const newChampion = await ChampionService.insertChampion(props);
      return res.status(201).send({ message: newChampion });
    } catch (error) {
      if (error instanceof fieldsEmptyError) {
        return res.status(error.statusError).send({ message: error.message });
      }
      if (error instanceof invalidNameError) {
        return res.status(error.statusError).send({ message: error.message });
      }
      return res.status(500).send({ message: "Erro interno do servidor." });
    }
  }
);

championRoute.put(
  "/update/:id",
  rioterAuthorization,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const props: UpdateChampionProps = req.body;

      const updatedChampion = await ChampionService.updateChampion(id, props);

      return res.status(200).send({ message: updatedChampion });
    } catch (error) {
      if (error instanceof invalidNameError) {
        return res.status(error.statusError).send({ message: error.message });
      }
      if (error instanceof idEmptyError) {
        return res.status(error.statusError).send({ message: error.message });
      }
      return res.status(500).send({ message: "Erro interno do servidor." });
    }
  }
);

championRoute.delete(
  "/remove/:id",
  rioterAuthorization,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await ChampionService.destroyOneChampionById(id);
      return res.status(200).send({ message: "Campeão deletado." });
    } catch (error) {
      if (error instanceof idEmptyError) {
        return res.status(error.statusError).send({ message: error.message });
      }
      if (error instanceof dataNotFoundError) {
        return res.status(error.statusError).send({ message: error.message });
      }
      return res.status(500).send({ message: "Erro interno do servidor." });
    }
  }
);

export default championRoute;
