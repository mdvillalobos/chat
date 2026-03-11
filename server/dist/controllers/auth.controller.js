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
exports.registerPersonalInfo = exports.register = exports.login = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user_model_1 = __importDefault(require("../model/user.model"));
const auth_helpers_1 = require("../helpers/auth.helpers");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }
    try {
        const userData = yield user_model_1.default.findOne({ email: email });
        if (!userData || !(yield (0, auth_helpers_1.comparePassword)(password, userData.password))) {
            res.status(400).json({
                error: 'Incorrect email or password',
            });
            return;
        }
        return res.status(200).json({
            message: 'Login Successfully',
            token: (0, auth_helpers_1.generateAuthToken)(email),
            data: userData
        });
    }
    catch (error) {
        console.error(`Login error: ${error}`);
        res.status(500).json({
            error: 'Internal server error. Please try again later'
        });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, confirmPassword } = req.body;
    if (!email || !password || !confirmPassword) {
        return res.status(400).json({
            error: 'All fields are required!'
        });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({
            error: "Passwords don't  match",
        });
    }
    try {
        const hashedPassword = yield (0, auth_helpers_1.hashPassword)(password);
        const newUser = yield user_model_1.default.create({
            email,
            password: hashedPassword,
        });
        return res.status(201).json({
            message: "Registered successfully",
            token: (0, auth_helpers_1.generateAuthToken)(newUser.email),
        });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                error: "Email already exists",
            });
        }
        console.error(`Register error: ${error}`);
        res.status(500).json({
            error: 'Internal server error. Please try again later',
        });
    }
});
exports.register = register;
const registerPersonalInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, contactNumber } = req.body;
    const userEmail = req.user.email;
    if (!firstName || !lastName || !contactNumber) {
        return res.status(400).json({
            error: 'All fields are required!'
        });
    }
    try {
        const updatedUser = yield user_model_1.default.findOneAndUpdate({ email: userEmail }, {
            $set: {
                "accountInfo.firstName": firstName,
                "accountInfo.lastName": lastName,
                "accountInfo.contactNumber": contactNumber,
            }
        }, {
            new: true,
            fields: { password: 0, }
        });
        if (!updatedUser) {
            return res.status(404).json({
                error: 'User not found',
            });
        }
        return res.status(200).json({
            message: 'Account information registered successfully',
            data: updatedUser
        });
    }
    catch (error) {
        console.error(`Profile registration error: ${error}`);
        res.status(500).json({
            error: 'Internal server error. Please try again later'
        });
    }
});
exports.registerPersonalInfo = registerPersonalInfo;
