"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../Controllers/UserController");
const router = (0, express_1.Router)();
router.post("/register", UserController_1.register);
router.post("/login", UserController_1.login);
exports.default = router;
