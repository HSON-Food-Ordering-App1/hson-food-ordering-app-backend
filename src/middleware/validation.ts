import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
}

export const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("Tên phải là một chuỗi"),
    body("addressLine1").isString().notEmpty().withMessage("Địa chỉ phải là một chuỗi"),
    body("city").isString().notEmpty().withMessage("Tên thành phố phải là một chuỗi"),
    body("country").isString().notEmpty().withMessage("Tên quốc gia phải là một chuỗi"),
    handleValidationErrors,
];

export const validateMyRestaurantRequest = [
    body("restaurantName").isString().notEmpty().withMessage("Tên phải là một chuỗi"),
    body("city").isString().notEmpty().withMessage("Tên thành phố phải là một chuỗi"),
    body("country").isString().notEmpty().withMessage("Tên quốc gia phải là một chuỗi"),
    body("delivetyPrice").isFloat({min: 0}).withMessage("Phai nhap gia"),
    body("estimatedDeliveryTime").isInt({min: 0}).withMessage("Phai nhap so nguyen"),
    body("cuisines").isArray().withMessage("Phai la mot mang").not().isEmpty().withMessage("Khong duoc de trong"),
    body("menuItems").isArray().withMessage("khong duoc de trong"),
    body("menuItems.*.name").notEmpty().withMessage("Khong duoc de trong"), 
    body("menuItems.*.price").isFloat({min: 0}).withMessage("Phai nhap so"), 
    handleValidationErrors,
];