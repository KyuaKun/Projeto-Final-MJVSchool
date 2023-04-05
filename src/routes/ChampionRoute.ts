import { Router } from "express";
import ChampionService from "../service/ChampionService";

const route = Router();

route.post("/create", ChampionService.insertChampion);
