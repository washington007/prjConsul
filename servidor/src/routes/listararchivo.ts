import { Router } from 'express';
import { getListararchivo} from '../controllers/listararchivo';
import { listararchivoUpdate } from '../controllers/listararchivo';

const router = Router();
// router.get('/', getListararchivo);
router.post('/', getListararchivo);

//ESTA PARTE AGREGE
router.put('/:nomenclatura/:informacion/:fecha/:opcion/:file', listararchivoUpdate);


export default router; 