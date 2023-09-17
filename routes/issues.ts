import { Router } from "express";
import { postNewIssue } from "../controllers/issues";
import { validateJWT } from "../middlewares/validarJWT";
import { isAdmin } from "../middlewares/validarRol";
import { check } from "express-validator";
import { recolectErrors } from "../middlewares/recolectarErrores";

const router = Router();

router.post(
  "/",
  [
    validateJWT,
    isAdmin,
    check("title", "El título es obligatorio").not().isEmpty(),
    check("description", "La descripción es requerida").not().isEmpty(),
    check("priority", "El número de prioridad es requerido").not().isEmpty(),
    recolectErrors,
  ],
  postNewIssue
);

export default router;
