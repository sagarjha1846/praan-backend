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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadCSVData = exports.getDeviceDetails = void 0;
const Device_1 = require("../models/Device");
const csvtojson_1 = __importDefault(require("csvtojson"));
const getDeviceDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
        const page = req.query.page ? parseInt(req.query.page) : 0;
        const particle = req.query.particle ? req.query.particle : "p1";
        const toDate = req.query.toDate ? req.query.toDate : "";
        const fromDate = req.query.fromDate ? req.query.fromDate : "";
        const query = (fromDate && toDate) ? {
            t: {
                $gte: fromDate,
                $lt: toDate
            }
        } : {};
        const count = yield Device_1.deviceDetails.count();
        const deviceData = yield Device_1.deviceDetails.find(query, Object.assign({ _id: 1, device: 1, t: 1, w: 1, h: 1 }, particle == "p1" ? { p1: 1 } : particle == "p10" ? { p10: 1 } : { p25: 1 })).limit(pageSize).skip(pageSize * page);
        if (!deviceData) {
            res.status(400).json({ message: "Data not found" });
        }
        res.status(200).send({ data: deviceData, count });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
});
exports.getDeviceDetails = getDeviceDetails;
const uploadCSVData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = [];
        (0, csvtojson_1.default)().fromFile(req.file.path).then(result => {
            data.push(...result);
            Device_1.deviceDetails.insertMany(result).then(function () {
                res.status(200).send({
                    message: "Successfully Uploaded!"
                });
            }).catch(function (error) {
                res.status(500).send({
                    message: "failure",
                    error
                });
            });
        });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
});
exports.uploadCSVData = uploadCSVData;
