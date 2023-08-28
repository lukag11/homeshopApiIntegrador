import { Router } from "express";
import { check } from "express-validator";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import { login, register, verifyUser } from "../controllers/auth";
import { existeEmail } from "../helpers/validacionesDB";

const router = Router();

router.post(
  "/register",
  [
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check(
      "email",
      "el email es obligatorio, o no se recibio un email valido"
    ).isEmail(),
    check(
      "password",
      "la contraseña debe ser de 6 caracteres minimo "
    ).isLength({ min: 6 }),
    // validacion personalizada
    check("email").custom(existeEmail),
    // middlewares perzonailzado
    recolectarErrores,
  ],
  register
);

router.patch(
  "/verify",
  [
    check("email", "el email es requerido").isEmail(),
    check("code", "el codigo de verificacion es requerido").not().isEmpty(),
    recolectarErrores,
  ],

  verifyUser
);

router.post(
  "/login",
  [
    check("email", "el email es requerido").isEmail(),
    check(
      "password",
      "la contraseña debe ser de 6 caracteres minimo "
    ).isLength({ min: 6 }),
    recolectarErrores,
  ],
  login
);

export default router;
