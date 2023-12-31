import { Router } from "express";
import { validateJWT } from "../middlewares/validarJWT";
import { recolectErrors } from "../middlewares/recolectarErrores";
import { createOrders, getOrders } from "../controllers/order";
import { isVerified } from "../middlewares/validarVerificado";
import { check } from "express-validator";

const router = Router();

router.get("/", [validateJWT, recolectErrors], getOrders);

router.post(
  "/",
  [
    validateJWT,
    isVerified,
    check("price", "El precio es obligatorio").not().isEmpty(),
    check("shippingCost", "El costo de envío es obligatorio").not().isEmpty(),
    check("shippingDetails", "Los detalles de envío son obligatorio")
      .not()
      .isEmpty(),
    check("total", "El costo total es obligatorio").not().isEmpty(),
    check("cartItems", "El array de items es obligatorio").not().isEmpty(),
    recolectErrors,
  ],
  createOrders
);

export default router;
