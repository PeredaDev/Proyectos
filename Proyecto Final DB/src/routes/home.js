import { Router } from "express";
import { HomeManager } from "../controllers/home.js";

const homeRouter = Router();
const homeManager = new HomeManager();

homeRouter.get("/", homeManager.getProducts);

export default homeRouter;
