"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deviceController_1 = require("../Controllers/deviceController");
const multer_1 = __importDefault(require("multer"));
const validateUser_1 = require("../Middleware/validateUser");
const router = (0, express_1.Router)();
var upload = (0, multer_1.default)({ dest: 'uploads/' });
router.get("/device-details", validateUser_1.authMiddleware, deviceController_1.getDeviceDetails);
router.post("/upload-data", validateUser_1.authMiddleware, upload.single("file"), deviceController_1.uploadCSVData);
exports.default = router;
