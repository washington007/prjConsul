"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    console.log('headerToken');
    if (headerToken != undefined && headerToken.startsWith('Bearer')) {
        //Tiene Token
        try {
            const bearerToken = headerToken.slice(7);
            jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_KEY || 'cisco123');
            next();
        }
        catch (eror) {
            res.status(401).json({
                msg: 'token no valido'
            });
        }
    }
    else {
        res.status(401).json({
            msg: 'Acceso Denegado ->ValidateToken'
        });
    }
};
exports.default = validateToken;