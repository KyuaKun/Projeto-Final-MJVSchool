import ChampionService from "../service/ChampionService";
import { Request, Response, Router } from "express";
import { ChampionProps } from "../types/Champion/Champion";
import { ChampionInputError } from "../Error/Champion/ChampionError";
import { UpdateChampionProps } from "../types/Champion/UpdateChampion";

const championRoute = Router();

championRoute.get("/index", async (_req: Request, res: Response) => {
  try {
    const listOfChampions = await ChampionService.listChampions();
    return res.status(200).send({ message: listOfChampions });
  } catch (error) {
    if (error instanceof ChampionInputError) {
      return res.status(error.statusError).send({ message: error.message });
    }
    return res.status(500).send({ message: "Erro interno do servidor." });
  }
});

championRoute.get("/show/:name", async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const champion = await ChampionService.showOneChampionByName(name);
    return res.status(200).send({ message: champion });
  } catch (error) {
    if (error instanceof ChampionInputError) {
      return res.status(error.statusError).send({ message: error.message });
    }
    return res.status(500).send({ message: "Erro interno do servidor." });
  }
});

championRoute.post("/create", async (req: Request, res: Response) => {
  try {
    const props: ChampionProps = req.body;
    const newChampion = await ChampionService.insertChampion(props);
    return res.status(201).send({ message: newChampion });
  } catch (error) {
    if (error instanceof ChampionInputError) {
      return res.status(error.statusError).send({ message: error.message });
    }
    return res.status(500).send({ message: "Erro interno do servidor." });
  }
}); // DEV

championRoute.get("/document", async (_req: Request, res: Response) => {
  try {
    const listOfChampions = await ChampionService.listChampionsDoc();
    return res.status(200).send({ message: listOfChampions });
  } catch (error) {
    if (error instanceof ChampionInputError) {
      return res.status(error.statusError).send({ message: error.message });
    }
    return res.status(500).send({ message: "Erro interno do servidor." });
  }
}); //DEV

championRoute.get("/read/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const champion = await ChampionService.showOneChampionById(id);

    return res.status(200).send({ message: champion });
  } catch (error) {
    if (error instanceof ChampionInputError) {
      return res.status(error.statusError).send({ message: error.message });
    }
    return res.status(500).send({ message: "Erro interno do servidor." });
  }
}); //DEV

championRoute.put("/update/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const props: UpdateChampionProps = req.body;

    const updatedChampion = await ChampionService.updateChampion(id, props);

    return res.status(200).send({ message: updatedChampion });
  } catch (error) {
    if (error instanceof ChampionInputError) {
      return res.status(error.statusError).send({ message: error.message });
    }
    return res.status(500).send({ message: "Erro interno do servidor." });
  }
}); //DEV

championRoute.delete("/remove/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await ChampionService.destroyOneChampionById(id);
    return res.status(200).send({ message: "Campeão deletado." });
  } catch (error) {}
}); //DEV

export default championRoute;
