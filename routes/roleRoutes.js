import { Router } from 'express';
import { verifierToken } from '../middlewares/auth.js';
import { valider, validerRole } from '../middlewares/validations.js';
import {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from '../controllers/roleController.js';

const router = Router();

router.get('/', verifierToken, getRoles);
router.get('/:id', verifierToken, getRoleById);
router.post('/', verifierToken, validerRole, valider, createRole);
router.put('/:id', verifierToken, updateRole);
router.delete('/:id', verifierToken, deleteRole);

export default router;