import { Router } from 'express';
import { verifierToken } from '../middlewares/auth.js';
import { televerser } from '../middlewares/upload.js';
import { valider, validerProduit } from '../middlewares/validations.js';
import {
  getProduits,
  getProduitById,
  createProduit,
  updateProduit,
  deleteProduit,
} from '../controllers/produitController.js';

const router = Router();

router.get('/', getProduits);
router.get('/:id', getProduitById);
router.post('/', verifierToken, televerser('image'), validerProduit, valider, createProduit);
router.put('/:id', verifierToken, televerser('image'), updateProduit);
router.delete('/:id', verifierToken, deleteProduit);

export default router;