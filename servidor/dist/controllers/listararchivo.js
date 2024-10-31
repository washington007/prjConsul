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
exports.listararchivoUpdate = exports.getListararchivo = void 0;
const multer_1 = __importDefault(require("multer"));
const crypto_1 = __importDefault(require("crypto"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const listararchivo_1 = require("../services/listararchivo");
//OJO SI NO SALE BORRAR ESTO
const listararchivo_2 = require("../services/listararchivo");
const nodeMailer = require('nodemailer');
const getListararchivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { busqueda, nombres, fecha, opcion, file, correo } = req.body;
    if (!file) {
        return res.status(400).json({ msg: 'No se a proporcionado un archivo de Excell' });
    }
    // Verificar que el archivo en base64 esté presente
    if (!file || !file.recursoArchivo) {
        return res.status(400).json({ msg: 'No se ha proporcionado un archivo en formato base64.' });
    }
    // Decodificar el archivo base64
    const base64Data = file.recursoArchivo.replace(/^data:application\/octet-stream;base64,/, ""); // Asegúrate de usar el tipo MIME correcto
    const fileName = `${busqueda}_${nombres}_${fecha}_${opcion}_${file.nombre}`; // Genera un nombre único
    const filePath = path_1.default.join(__dirname, "../../public/uploads", fileName);
    // Guardar el archivo en el sistema de archivos
    fs_1.default.writeFile(filePath, base64Data, 'base64', (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(500).json({ msg: 'Error al guardar el archivo.' });
        }
        const transporter = nodeMailer.createTransport({
            host: 'mail.defensoria.gob.ec',
            port: 25,
            secure: false,
            auth: {
                user: 'wpilco@defensoria.gob.ec',
                pass: 'Zoquet2hñ.ñ'
            }
        });
        const mailOptions = {
            from: 'wpilco@defensoria.gob.ec',
            to: correo,
            subject: 'Correo de Prueba',
            text: `"Hemos tenido el placer de recibir información sobre lo siguiente:" \n\nBuscador: ${busqueda}\nNombres: ${nombres}\nFecha: ${fecha}\nOpción: ${opcion}`,
            attachments: [
                {
                    //OJO TOMAR EN CUENTA EL ATACHMENT 
                    filename: file.nombre,
                    //path: `/Files/${file.nombre}`
                },
            ]
        };
        // Enviar el correo
        try {
            yield (0, listararchivo_1.createListararchivo)(req, res, filePath);
            // Enviar el correo
            transporter.sendMail(mailOptions);
            return res.json({
                msg: `El formulario ${busqueda} ${nombres} ${fecha} ${opcion} ${file} a sido creado exitosamente`
            });
        }
        catch (error) {
            return res.status(500).json({
                msg: 'Hubo un error al enviar la informacion',
            });
        }
    }));
});
exports.getListararchivo = getListararchivo;
// Middleware de multer
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, "../../public/uploads"),
    filename: function (req, file, cb) {
        const uuid = crypto_1.default.randomUUID();
        cb(null, uuid + file.originalname.substring(file.originalname.lastIndexOf(".")));
    }
});
const upload = (0, multer_1.default)({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"];
        if (fileTypes.includes(file.mimetype)) {
            return cb(null, true);
        }
        return cb(new Error('Tipo de Archivo no permitido'));
    }
}).single("archive");
///////////////////////////////////////////
//AGREGE ESTA PARTE TOMAR EN CONSIDERACION 
const listararchivoUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nomenclatura, informacion, fecha, opcion, file } = req.body;
    //const {nomenclatura, informacion, fecha, opcion,file} = req.params;
    //Valido si la nomenclatura existe en la base de datos 
    const listararchivo = yield (0, listararchivo_2.putListarArchivo)(nomenclatura, informacion);
    if (!nomenclatura || !informacion || !fecha || !opcion || !file) {
        return res.status(400).json({
            msg: 'Todos los campos son requeridos.'
        });
    }
    res.status(400).json({ listararchivo });
});
exports.listararchivoUpdate = listararchivoUpdate;
