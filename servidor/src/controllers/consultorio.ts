import { Request, Response} from 'express';
//Ten en cuenta que coloque el putConsultorio
import { getConsultorio } from '../services/consultorio';

export const getConsultorioBusqueda = async (req: Request, res: Response) => {
    console.log(req.params);
    // console.log('NOMENCLATURA');
    const {nomenclatura} = req.params;
    const consultorio = await getConsultorio(nomenclatura, res)
    // console.log('CONSULTORIO');
    console.log(consultorio);
    if(!nomenclatura){
        return res.status(400).json({
            msg: `No existe nomenclatura ${nomenclatura}, REVISA NUEVAMENTE`
        })
    }
    res.status(200).json({consultorio});  
}

///////////////////////////////////////////
//AGREGE ESTA PARTE TOMAR EN CONSIDERACION 
// export const putConsultorioActualizacion = async (req: Request, res: Response) =>{
//     const {nomenclatura} = req.params;
//     //Valido si la nomenclatura existe en la base de datos 
//     const consultorio = await putConsultorio

//     if(!consultorio){
//         return res.status(400).json({
//             msg: `No existe la nomenclatura con el nombre ${nomenclatura}, vuelve a intentar`
//         })
//     }

//     Valido la nomenclatura  para verificar si existe otra nomenclatura
//     const nomenclaturasExistentes =  await verificarNomenclaturaExistente(nomenclatura);
//     if(nomenclaturasExistentes){
//         return res.status(400).json({
//             msg: `La nomenclatura ${nomenclatura}, ya esta en uso`
//         });
//     }
// };
