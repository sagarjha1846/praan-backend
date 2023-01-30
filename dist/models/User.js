"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userData = void 0;
const mongoose_1 = require("mongoose");
var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};
const userDetails = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Please provide an Name!"],
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
    },
});
exports.userData = (0, mongoose_1.model)("userData", userDetails);
