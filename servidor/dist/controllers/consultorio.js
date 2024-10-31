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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConsultorioBusqueda = void 0;
//Ten en cuenta que coloque el putConsultorio
const consultorio_1 = require("../services/consultorio");
const getConsultorioBusqueda = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    // console.log('NOMENCLATURA');
    const { nomenclatura } = req.params;
    const consultorio = yield (0, consultorio_1.getConsultorio)(nomenclatura, res);
    // console.log('CONSULTORIO');
    console.log(consultorio);
    if (!nomenclatura) {
        return res.status(400).json({
            msg: `No existe nomenclatura ${nomenclatura}, REVISA NUEVAMENTE`
        });
    }
    res.status(200).json({ consultorio });
});
exports.getConsultorioBusqueda = getConsultorioBusqueda;
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
