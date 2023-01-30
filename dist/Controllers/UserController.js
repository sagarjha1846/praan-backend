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
exports.register = exports.login = void 0;
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Fields missing! Invalid Input!" });
            return;
        }
        const userFound = yield User_1.userData.findOne({ email: email });
        if (!userFound) {
            res.status(400).json({ message: "User Not Found" });
            return;
        }
        else {
            let isPasswordValid = yield bcrypt_1.default.compare(password, userFound.password);
            if (!isPasswordValid) {
                res.status(400).json({ message: "Invalid credentails!" });
                return;
            }
            const token = jsonwebtoken_1.default.sign({
                userId: userFound._id,
                userEmail: userFound.email,
            }, "RANDOM-TOKEN", { expiresIn: "24h" });
            res.status(200).json({
                message: "Login Successful", user: {
                    email: userFound.email,
                    name: userFound.name,
                    token,
                }
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        return;
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            res.status(400).json({ message: "Fields missing! Invalid Input!" });
            return;
        }
        const userFound = yield User_1.userData.findOne({ email: email });
        if (userFound) {
            res.status(400).json({ message: "User already exists!" });
            return;
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield User_1.userData.create({
            name, email, password: hashPassword
        });
        if (!user) {
            res.status(500).json({ message: "User not created!" });
            return;
        }
        res.status(200).json({ message: "User Created!", user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        return;
    }
});
exports.register = register;
