import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
};

export const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("Tên phải là một chuỗi"),
    body("addressLine1").isString().notEmpty().withMessage("Địa chỉ phải là một chuỗi"),
    body("city").isString().notEmpty().withMessage("Tên thành phố phải là một chuỗi"),
    body("district").isString().notEmpty().withMessage("Tên quận/huyện phải là một chuỗi"),
    handleValidationErrors,
];

export const validateMyRestaurantRequest = [
    body("restaurantName").notEmpty().withMessage("Tên không được để trống"),
    body("city").notEmpty().withMessage("Tên thành phố không được để trống"),
    body("district").notEmpty().withMessage("Tên quận/huyện không được để trống"),
    body("deliveryPrice").isFloat({min: 0}).withMessage("Giá giao hàng phải là số dương"),
    body("estimatedDeliveryTime").isInt({min: 0}).withMessage("Thời gian giao hàng ước tính phải là số nguyên dương"),
    body("cuisines").isArray().withMessage("Món ăn phải là mảng").not().isEmpty().withMessage("Mảng món ăn không được để trống"),
    body("menuItems").isArray().withMessage("Các mục menu phải là một mảng"),
    body("menuItems.*.name").notEmpty().withMessage("Tên mục menu là bắt buộc"), 
    body("menuItems.*.price").isFloat({min: 0}).withMessage("Giá món ăn trong thực đơn là bắt buộc và phải là số dương"), 
    handleValidationErrors,
];