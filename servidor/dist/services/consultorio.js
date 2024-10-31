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
exports.getConsultorio = void 0;
const consultorio_1 = __importDefault(require("../models/consultorio"));
const getConsultorio = (nomenclatura, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const consultorio = yield consultorio_1.default.findOne({ where: { nomenclatura } });
        return consultorio;
    }
    catch (error) {
        // res.status(500).json({ message: 'Error al obtener el registro', error });
    }
});
exports.getConsultorio = getConsultorio;
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
