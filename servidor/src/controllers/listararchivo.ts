 import multer, { FileFilterCallback } from "multer";
import crypto from "crypto";
import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import Listararchivo from "../models/listararchivo";
import { createListararchivo} from "../services/listararchivo";
//OJO SI NO SALE BORRAR ESTO
import { putListarArchivo } from "../services/listararchivo";

const nodeMailer = require('nodemailer');

export const getListararchivo = async (req: Request, res: Response) => {
    const { busqueda, nombres, fecha, opcion, file, correo } = req.body;

    if(!file){
        return res.status(400).json({msg: 'No se a proporcionado un archivo de Excell'})
    }

    // Verificar que el archivo en base64 esté presente
    if (!file || !file.recursoArchivo) {
        return res.status(400).json({ msg: 'No se ha proporcionado un archivo en formato base64.' });
    }

    // Decodificar el archivo base64
    const base64Data = file.recursoArchivo.replace(/^data:application\/octet-stream;base64,/, ""); // Asegúrate de usar el tipo MIME correcto
    const fileName = `${busqueda}_${nombres}_${fecha}_${opcion}_${file.nombre}`; // Genera un nombre único
    const filePath = path.join(__dirname, "../../public/uploads", fileName);

    // Guardar el archivo en el sistema de archivos
    fs.writeFile(filePath, base64Data, 'base64', async (err) => {
        if (err) {
            return res.status(500).json({ msg: 'Error al guardar el archivo.' });
        }

        const transporter = nodeMailer.createTransport({
            host:'',
            port: 1,
            secure:false,
            auth:{
                user:'',
                pass:''
            }
        });
        
        const mailOptions = {
            from:'',
            to: correo,
            subject:'Correo de Prueba',
            text:`"Hemos tenido el placer de recibir información sobre lo siguiente:" \n\nBuscador: ${busqueda}\nNombres: ${nombres}\nFecha: ${fecha}\nOpción: ${opcion}`,
            attachments:[
                {
                    //OJO TOMAR EN CUENTA EL ATACHMENT 
                    filename: file.nombre,
                    //path: `/Files/${file.nombre}`
                }, 
            ]
        };
    
        // Enviar el correo
        try {
             await createListararchivo(req, res, filePath)
            // Enviar el correo
              transporter.sendMail(mailOptions);
            
            return res.json({
                msg: `El formulario ${busqueda} ${nombres} ${fecha} ${opcion} ${file} a sido creado exitosamente`
            });
        } catch (error){
            return res.status(500).json({
                msg: 'Hubo un error al enviar la informacion',
            });
        }
    });
};

// Middleware de multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, "../../public/uploads"),
    filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
        const uuid = crypto.randomUUID();
        cb(null, uuid + file.originalname.substring(file.originalname.lastIndexOf(".")));
    }
});

const upload = multer({
    storage,
    fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        const fileTypes = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"];
        if (fileTypes.includes(file.mimetype)) {
            return cb(null, true);
        }          
        return cb(new Error('Tipo de Archivo no permitido'));
    }
}).single("archive");



///////////////////////////////////////////
//AGREGE ESTA PARTE TOMAR EN CONSIDERACION 
export const listararchivoUpdate = async (req: Request, res: Response) =>{
    const {nomenclatura, informacion, fecha, opcion,file} = req.body;
    //const {nomenclatura, informacion, fecha, opcion,file} = req.params;

    //Valido si la nomenclatura existe en la base de datos 
    const listararchivo = await putListarArchivo(nomenclatura,informacion);

    if (!nomenclatura || !informacion || !fecha || !opcion || !file) {
        return res.status(400).json({
            msg: 'Todos los campos son requeridos.'
        });
    }
    res.status(400).json({listararchivo});  
};
