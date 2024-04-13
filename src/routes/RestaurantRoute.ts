import express from "express";
import { param } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";

const router = express.Router();

// /api/restaurant/ search/london
router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Tham số thành phố phải là một chuỗi hợp lệ"),
  RestaurantController.searchRestaurant
);

export default router;
