"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
const findUserByEmail = (email) => {
    return user_model_1.default.findOne({ email: email });
};
exports.findUserByEmail = findUserByEmail;
