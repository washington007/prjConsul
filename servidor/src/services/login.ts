// controllers/loginController.ts
import { Request, Response } from 'express';
import Login from '../models/login'; 

export const createLogin = async (correo: string, hashedPassword: string) => {
  try {
    
    await Login.create({ correo, clave: hashedPassword });
    console.log('Usuario Creado');
    
  } catch (error) {
    console.log('Error al Crear Usuario',error);
    
  }
};

export const getLogins = async (req: Request, res: Response) => {
  try {
    const logins = await Login.findAll();
    res.status(200).json(logins);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los logins', error });
  }
};

export const getLoginByCorreo = async (correo: string, res: Response) => {
  try {
    const login = await Login.findOne({where: {correo}});
    return login
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el login', error });
  }
};

export const updateLogin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { correo, clave } = req.body;
    const login = await Login.findByPk(id);

    if (!login) {
      return res.status(404).json({ message: 'Login no encontrado' });
    }

    await login.update({
        correo,
        clave
    })

    res.status(200).json(login);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el login', error });
  }
};

export const deleteLogin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const login = await Login.findByPk(id);
    if (!login) {
      return res.status(404).json({ message: 'Login no encontrado' });
    }
    await login.destroy();
    res.status(200).json({ message: 'Login eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el login', error });
  }
};
