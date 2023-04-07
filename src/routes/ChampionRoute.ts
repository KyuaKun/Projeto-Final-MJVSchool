import { Router } from "express";
import ChampionService from "../service/ChampionService";
import { Request, Response } from "express";
import { ChampionProps } from "../types/Champion/Champion";
import { ChampionInputError } from "../Error/Champion/ChampionError";
import { UpdateChampionProps } from "../types/Champion/UpdateChampion";

const route = Router();

route.post("/create", async (req: Request, res: Response) => {
  try {
    const props: ChampionProps = req.body;
    const newChampion = await ChampionService.insertChampion(props);
    return res.status(201).send({ message: newChampion });
  } catch (error) {
    if (error instanceof ChampionInputError) {
      return res.status(400).send({ message: error.message });
    }
    return res.status(500).send({ message: "Erro interno do servidor." });
  }
});

route.get("/index", async (_req: Request, res: Response) => {
  try {
    const listOfChampions = await ChampionService.indexChampions();
    return res.status(200).send({ message: listOfChampions });
  } catch (error) {
    if (error instanceof ChampionInputError) {
      return res.status(400).send({ message: error.message });
    }
    return res.status(500).send({ message: "Erro interno do servidor." });
  }
});

route.put("/update/:id", async (req: Request, res: Response) => {
  try {
    const props: UpdateChampionProps = req.body;

    const updatedChampion = await ChampionService.updateChampion(
      req.params.id,
      props
    );

    return res.status(200).send({ message: updatedChampion });
  } catch (error) {
    if (error instanceof ChampionInputError) {
      return res.status(400).send({ message: error.message });
    }
    return res.status(500).send({ message: "Erro interno do servidor." });
  }
});

export default route;
