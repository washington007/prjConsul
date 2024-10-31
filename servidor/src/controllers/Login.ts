import { Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createLogin, getLoginByCorreo } from '../services/login';

export const createUser = async (req: Request, res: Response) => {
    const { correo, clave } = req.body;

    const login = await getLoginByCorreo(correo, res)

    if(login){
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre ${correo}`
        })
    }

    const hashedPassword = await bcrypt.hash(clave, 10);
    console.log(hashedPassword);
    
    try{

        await createLogin(correo, hashedPassword)
        res.json({
            msg: 'Nuevo Usuario'
         })
    }catch(error){
        res.status(500).json({
            msg:'Ocurrio un error',
            error
        })
    }    
}   

export const loginUser = async (req: Request, res: Response) => {
    const {correo, clave} = req.body;

    //NO BORRAR
    //Validamos si el ususario existe en la base de datos 
    const login = await getLoginByCorreo(correo, res)

    if(!login){
        return res.status(400).json({
            msg: `No existe un usuario con el nombre ${correo}, vuelve a intentar`
        })
    }    
    
    //NO BORRAR
    //Validamos password
    const passwordValid = await bcrypt.compare(clave, login.getDataValue('clave'))
    if(!passwordValid){
        return res.status(400).json({
            msg: `Contraseña Incorrecta`
        })
    }

    //Generamos token
    const token = jwt.sign({
        correo: correo
    },process.env.SECRET_KEY || 'cisco');
    res.json(token);
}