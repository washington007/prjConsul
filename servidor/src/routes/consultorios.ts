import { Router } from 'express';
import { getConsultorioBusqueda } from '../controllers/consultorio';

const router = Router();
router.get('/:nomenclatura', getConsultorioBusqueda);

export default router;