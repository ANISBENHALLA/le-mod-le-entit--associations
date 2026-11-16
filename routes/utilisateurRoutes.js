import { Router } from 'express';
import { verifierToken } from '../middlewares/auth.js';
import { televerser } from '../middlewares/upload.js';
import { valider, validerUtilisateur } from '../middlewares/validations.js';
import {
  getUtilisateurs,
  getUtilisateurById,
  createUtilisateur,
  updateUtilisateur,
  deleteUtilisateur,
} from '../controllers/utilisateurController.js';

const router = Router();

router.get('/', verifierToken, getUtilisateurs);
router.get('/:id', verifierToken, getUtilisateurById);
router.post('/', verifierToken, televerser('photo'), validerUtilisateur, valider, createUtilisateur);
router.put('/:id', verifierToken, televerser('photo'), updateUtilisateur);
router.delete('/:id', verifierToken, deleteUtilisateur);

export default router;