import { Router } from 'express';
import { verifierToken } from '../middlewares/auth.js';
import { valider, validerAvis } from '../middlewares/validations.js';
import {
  getAvis,
  getAvisById,
  createAvis,
  updateAvis,
  deleteAvis,
} from '../controllers/avisController.js';

const router = Router();

router.get('/', getAvis);
router.get('/:id', getAvisById);
router.post('/', verifierToken, validerAvis, valider, createAvis);
router.put('/:id', verifierToken, updateAvis);
router.delete('/:id', verifierToken, deleteAvis);

export default router;