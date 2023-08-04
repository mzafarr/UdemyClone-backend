"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.createTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { sign, verify } = jsonwebtoken_1.default;
const createTokens = (user) => {
    const accessToken = sign({ id: user }, process.env.JWT_SECRET);
    return accessToken;
};
exports.createTokens = createTokens;
const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];
    if (!accessToken)
        return res.status(400).json({ error: "User not Authenticated!" });
    try {
        const validToken = verify(accessToken, process.env.JWT_SECRET);
        if (validToken) {
            req.authenticated = true;
            return next();
        }
    }
    catch (err) {
        return res.status(400).json({ error: err });
    }
};
exports.validateToken = validateToken;
