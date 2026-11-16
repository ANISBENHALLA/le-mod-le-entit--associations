import { Router } from 'express';
import { inscription, connexion } from '../controllers/authController.js';
import { valider, validerUtilisateur, validerConnexion } from '../middlewares/validations.js';

const router = Router();

router.post('/inscription', validerUtilisateur, valider, inscription);
router.post('/connexion', validerConnexion, valider, connexion);

export default router;