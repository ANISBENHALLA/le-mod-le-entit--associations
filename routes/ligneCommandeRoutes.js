import { Router } from 'express';
import { verifierToken } from '../middlewares/auth.js';
import { valider, validerLigneCommande } from '../middlewares/validations.js';
import {
  getLignesCommande,
  getLigneCommandeById,
  createLigneCommande,
  updateLigneCommande,
  deleteLigneCommande,
} from '../controllers/ligneCommandeController.js';

const router = Router();

router.get('/', verifierToken, getLignesCommande);
router.get('/:id', verifierToken, getLigneCommandeById);
router.post('/', verifierToken, validerLigneCommande, valider, createLigneCommande);
router.put('/:id', verifierToken, updateLigneCommande);
router.delete('/:id', verifierToken, deleteLigneCommande);

export default router;