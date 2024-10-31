import {Request, Response} from 'express';
import Consultorio from '../models/consultorio';
  
export const getConsultorio = async (nomenclatura:string, res: Response) => {
    try {
      const consultorio = await Consultorio.findOne({where: {nomenclatura}});
    return consultorio
    } catch (error) {
      // res.status(500).json({ message: 'Error al obtener el registro', error });
    }
  };  


///////////////////////////////////////////
//AGREGE ESTA PARTE TOMAR EN CONSIDERACION ES PARA ACTUALIZAR 
  // export const putConsultorio = async (req: Request, res: Response) => {
  //   try {
  //     const { id } = req.params;
  //     const { nomenclatura, informacion } = req.body;
      
  //     const consultorio = await Consultorio.findByPk(id);
  //     if (!consultorio) {
  //       return res.status(404).json({ message: 'Registro no encontrado' });
  //     }
  //     await consultorio.update({ nomenclatura, informacion })
  //     res.status(200).json(consultorio);
  //   } catch (error) {
  //     res.status(500).json({ message: 'Error al actualizar el registro', error });
  //   }
  // };
  

  
  //AGREGE ESTA PARTE 
  //Tomar en consiedracion que se obtiene un registro por ID
  // export const getConsultorioBusqueda = async (req: Request, res: Response) => {
  //   try {
  //     const { id } = req.params;
  //     const consultorio = await Consultorio.findByPk(id);
  //     if (!consultorio) {
  //       return res.status(404).json({ message: 'Registro no encontrado' });
  //     }
  //     res.status(200).json(consultorio);
  //   } catch (error) {
  //     res.status(500).json({ message: 'Error al obtener el registro', error });
  //   }
  // };
