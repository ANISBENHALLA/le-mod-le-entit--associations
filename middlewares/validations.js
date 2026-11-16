import { body, validationResult } from 'express-validator';
import fs from 'fs';

// Vérifie s'il y a des erreurs de validation
export const valider = (req, res, next) => {
  const erreurs = validationResult(req);
  if (!erreurs.isEmpty()) {
    // Si une image a été téléversée, on la supprime car la requête est refusée
    if (req.file) fs.unlink(req.file.path, () => {});
    return res.status(400).json({ erreurs: erreurs.array() });
  }
  next();
};

// Règles pour un rôle
export const validerRole = [
  body('nom').notEmpty().withMessage('Le nom est obligatoire'),
];

// Règles pour un utilisateur
export const validerUtilisateur = [
  body('nom').notEmpty().withMessage('Le nom est obligatoire'),
  body('prenom').notEmpty().withMessage('Le prénom est obligatoire'),
  body('email').isEmail().withMessage('Le courriel est invalide'),
  body('mot_de_passe').isLength({ min: 8 }).withMessage('Le mot de passe doit avoir au moins 8 caractères'),
  body('id_role').isInt().withMessage('id_role doit être un nombre'),
];

// Règles pour une catégorie
export const validerCategorie = [
  body('nom').notEmpty().withMessage('Le nom est obligatoire'),
];

// Règles pour un produit
export const validerProduit = [
  body('nom').notEmpty().withMessage('Le nom est obligatoire'),
  body('prix').isFloat({ min: 0 }).withMessage('Le prix doit être un nombre positif'),
  body('stock').optional().isInt({ min: 0 }).withMessage('Le stock doit être un nombre positif'),
  body('id_categorie').isInt().withMessage('id_categorie doit être un nombre'),
];

// Règles pour une commande
export const validerCommande = [
  body('id_utilisateur').isInt().withMessage('id_utilisateur doit être un nombre'),
  body('adresse_livraison').notEmpty().withMessage("L'adresse de livraison est obligatoire"),
  body('lignes').isArray({ min: 1 }).withMessage('Il faut au moins un produit'),
];

// Règles pour une ligne de commande
export const validerLigneCommande = [
  body('id_commande').isInt().withMessage('id_commande doit être un nombre'),
  body('id_produit').isInt().withMessage('id_produit doit être un nombre'),
  body('quantite').isInt({ min: 1 }).withMessage('La quantité doit être au moins 1'),
];

// Règles pour un avis
export const validerAvis = [
  body('note').isInt({ min: 1, max: 5 }).withMessage('La note doit être entre 1 et 5'),
  body('id_utilisateur').isInt().withMessage('id_utilisateur doit être un nombre'),
  body('id_produit').isInt().withMessage('id_produit doit être un nombre'),
];

// Règles pour la connexion
export const validerConnexion = [
  body('email').isEmail().withMessage('Le courriel est invalide'),
  body('mot_de_passe').notEmpty().withMessage('Le mot de passe est obligatoire'),
];