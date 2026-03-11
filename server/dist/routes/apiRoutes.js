"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.post('/auth/login', auth_controller_1.login);
router.post('/auth/register', auth_controller_1.register);
router.post('/auth/register-personal-info', auth_controller_1.registerPersonalInfo);
exports.default = router;
