// controllers/listararchivoController.ts
import { Request, Response } from 'express';
import Listararchivo from '../models/listararchivo';
import { triggerAsyncId } from 'async_hooks';
import { listararchivoUpdate } from '../controllers/listararchivo';

export const createListararchivo = async (req: Request, res: Response, filePath: string) => {
  try {
    const { busqueda, nombres, fecha, opcion, LoginId } = req.body;
    await Listararchivo.create({ busqueda, nombres, fecha, opcion, file: filePath, LoginId });
    console.log('Guardado en base de datos exitoso')
  } catch (error) {
    console.error('Ocurrio un error al guardar en la base de datos ->', error)
  }
};

export const getListararchivos = async (req: Request, res: Response) => {
  try {
    const listararchivos = await Listararchivo.findAll();
    res.status(200).json(listararchivos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los registros', error });
  }
};


//Tomar en consiedracion que se obtiene un registro por ID
export const getListararchivo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const listararchivo = await Listararchivo.findByPk(id);
    if (!listararchivo) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    res.status(200).json(listararchivo);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el registro', error });
  }
};

export const updateListararchivo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { busqueda, nombres, fecha, opcion, file, LoginId } = req.body;
    const listararchivo = await Listararchivo.findByPk(id);
    if (!listararchivo) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    await listararchivo.update({busqueda,nombres,fecha,opcion,file})
    res.status(200).json(listararchivo);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el registro', error });
  }
};

////////////////////////////////////////////
//OJO QUE ESTA PARTE AGREGUE TOMAR EN CUENTA 
export const putListarArchivo = async (req: Request, res: Response) => {
  try {
    const { nomenclatura, informacion, fecha, opcion, file } = req.body;

    // Buscar los registros que coincidan con los parámetros
    const listararchivo = await Listararchivo.findAll({
      where: {
        nomenclatura,
        informacion,
        fecha,
        opcion,
        file
      }
    });

    // Verificar si se encontraron registros
    if (listararchivo.length === 0) {
      return res.status(404).json({ message: 'No se encontraron registros para actualizar' });
    }

    // Actualizar los registros encontrados
    await Listararchivo.update(
      { informacion, fecha, opcion, file }, // Campos a actualizar
      {
        where: {
          nomenclatura,
          informacion, // Puedes ajustar según sea necesario
          fecha,
          opcion,
          file
        }
      }
    );

    // Retornar los registros actualizados
    return res.status(200).json({ message: 'Registros actualizados correctamente', registros: listararchivo });

  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el formulario', error });
  }
};



export const deleteListararchivo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const listararchivo = await Listararchivo.findByPk(id);
    if (!listararchivo) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    await listararchivo.destroy();
    res.status(200).json({ message: 'Registro eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el registro', error });
  }
};

