import { Router } from 'express';
import { verifierToken } from '../middlewares/auth.js';
import { valider, validerCommande } from '../middlewares/validations.js';
import {
  getCommandes,
  getCommandeById,
  createCommande,
  updateCommande,
  deleteCommande,
} from '../controllers/commandeController.js';

const router = Router();

router.get('/', verifierToken, getCommandes);
router.get('/:id', verifierToken, getCommandeById);
router.post('/', verifierToken, validerCommande, valider, createCommande);
router.put('/:id', verifierToken, updateCommande);
router.delete('/:id', verifierToken, deleteCommande);

export default router;