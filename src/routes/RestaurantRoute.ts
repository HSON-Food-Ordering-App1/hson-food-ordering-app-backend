import express from "express";
import { param } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";

const router = express.Router();

router.get(
  "/:restaurantId",
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Tham số mã nhà hàng phải là một chuỗi hợp lệ"),
  RestaurantController.getRestaurant
);
// /api/restaurant/ search/london
router.get(
  "/search/:district",
  param("district")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Tham số quận/huyện phải là một chuỗi hợp lệ"),
  RestaurantController.searchRestaurant
);

export default router;
