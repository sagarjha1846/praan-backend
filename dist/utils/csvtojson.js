"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const csvtojson_1 = __importDefault(require("csvtojson"));
const csvConvertor = (csvFilePath) => {
    (0, csvtojson_1.default)()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
        return jsonObj;
    });
};
exports.default = csvConvertor;
