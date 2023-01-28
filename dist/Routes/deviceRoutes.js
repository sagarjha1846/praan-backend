"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deviceController_1 = require("../Controllers/deviceController");
const router = (0, express_1.Router)();
router.get("/device-details", deviceController_1.getDeviceDetails);
router.post("/upload-data", deviceController_1.uploadCSVData);
exports.default = router;
