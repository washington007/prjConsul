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
exports.loginUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login_1 = require("../services/login");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, clave } = req.body;
    const login = yield (0, login_1.getLoginByCorreo)(correo, res);
    if (login) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre ${correo}`
        });
    }
    const hashedPassword = yield bcrypt_1.default.hash(clave, 10);
    console.log(hashedPassword);
    try {
        yield (0, login_1.createLogin)(correo, hashedPassword);
        res.json({
            msg: 'Nuevo Usuario'
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Ocurrio un error',
            error
        });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, clave } = req.body;
    //NO BORRAR
    //Validamos si el ususario existe en la base de datos 
    const login = yield (0, login_1.getLoginByCorreo)(correo, res);
    if (!login) {
        return res.status(400).json({
            msg: `No existe un usuario con el nombre ${correo}, vuelve a intentar`
        });
    }
    //NO BORRAR
    //Validamos password
    const passwordValid = yield bcrypt_1.default.compare(clave, login.getDataValue('clave'));
    if (!passwordValid) {
        return res.status(400).json({
            msg: `Contraseña Incorrecta`
        });
    }
    //Generamos token
    const token = jsonwebtoken_1.default.sign({
        correo: correo
    }, process.env.SECRET_KEY || 'cisco');
    res.json(token);
});
exports.loginUser = loginUser;
