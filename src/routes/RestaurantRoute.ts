import express from "express";
import { param } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";

const router = express.Router();

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
