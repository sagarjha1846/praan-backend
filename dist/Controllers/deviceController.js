"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadCSVData = exports.getDeviceDetails = void 0;
const Device_1 = require("../models/Device");
const getDeviceDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { particle } = req.params;
    const { toDate, fromDate } = req.body;
    console.log(particle, toDate, fromDate);
    const query = (fromDate && toDate) ? {
        t: {
            $gte: fromDate,
            $lt: toDate
        }
    } : {};
    const deviceData = yield Device_1.deviceDetails.find(query, Object.assign({ _id: 1, device: 1, t: 1, w: 1, h: 1 }, particle === "p1" ? { p1: 1 } : particle === "p10" ? { p10: 1 } : { p25: 1 }));
    if (!deviceData) {
        res.status(400).json({ message: "Data not found" });
    }
    res.status(200).send({ data: deviceData });
});
exports.getDeviceDetails = getDeviceDetails;
const uploadCSVData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const dataInserted = yield Device_1.deviceDetails.insertMany(req.body);
    if (dataInserted) {
        res.status(200).json({
            message: "Data Inserted"
        });
    }
    res.status(400).json({ message: "Data not found" });
});
exports.uploadCSVData = uploadCSVData;
