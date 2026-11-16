import { Router } from 'express';
import { verifierToken } from '../middlewares/auth.js';
import { televerser } from '../middlewares/upload.js';
import { valider, validerCategorie } from '../middlewares/validations.js';
import {
  getCategories,
  getCategorieById,
  createCategorie,
  updateCategorie,
  deleteCategorie,
} from '../controllers/categorieController.js';

const router = Router();

router.get('/', getCategories);
router.get('/:id', getCategorieById);
router.post('/', verifierToken, televerser('image'), validerCategorie, valider, createCategorie);
router.put('/:id', verifierToken, televerser('image'), updateCategorie);
router.delete('/:id', verifierToken, deleteCategorie);

export default router;