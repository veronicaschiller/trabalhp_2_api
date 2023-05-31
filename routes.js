import { Router } from "express";
import { proprietarioIndex } from "./controllers/proprietarioController.js";
import { imovelIndex, imovelCreate } from "./controllers/imovelController.js";
import { aluguelIndex, aluguelCreate, aluguelUpdateFinaliza } from "./controllers/aluguelController.js";
import { inquilinoIndex } from "./controllers/inquilinoController.js"

const router = Router();

//propretario
router.get("/proprietario", proprietarioIndex);

//imovel
router.get("/imovel", imovelIndex)
      .post("/imovel", imovelCreate);

//aluguel
router.get("/aluguel", aluguelIndex)
      .post("/aluguel", aluguelCreate)
      .put("/aluguel/:id", aluguelUpdateFinaliza);

//inquilino
router.get("/inquilino", inquilinoIndex)
export default router;
