"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceDetails = void 0;
const mongoose_1 = require("mongoose");
const deviceData = new mongoose_1.Schema({
    device: { type: String, require: true },
    t: { type: String, require: true },
    w: { type: String, require: true },
    h: { type: String, require: true },
    p1: { type: String, require: true },
    p25: { type: String, require: true },
    p10: { type: String, require: true },
});
exports.deviceDetails = (0, mongoose_1.model)("deviceData", deviceData);
