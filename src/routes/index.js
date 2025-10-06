import { Router } from "express";
import { upload } from "../configs/multer.config.js";
import {
  evaluator,
  progresChecker,
} from "../controllers/evaluator.controller.js";
import { postDocumentController } from "../controllers/upload.contoller.js";

const routes = Router();

routes.get("/", async (req, res) => {
  return res.json({
    message: "ok",
  });
});

routes.post(
  "/upload",
  upload.fields([
    { name: "cv", maxCount: 1 },
    { name: "projectReport", maxCount: 1 },
  ]),
  postDocumentController
);
routes.post("/evaluate", evaluator);
routes.get("/result/:id", progresChecker);

export default routes;
