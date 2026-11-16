import { LigneCommande, Produit } from '../models/index.js';
import { getPagination, formatPage } from '../utils/pagination.js';

// GET /api/lignes-commande?page=1&limit=10&id_commande=4
export const getLignesCommande = async (req, res) => {
  try {
    const { page, limit, offset } = getPagination(req.query);
    const where = {};
    if (req.query.id_commande) where.id_commande = req.query.id_commande;

    const resultat = await LigneCommande.findAndCountAll({
      where,
      include: [{ model: Produit, as: 'produit' }],
      order: [['id_ligne_commande', 'ASC']],
      limit,
      offset,
    });
    res.json(formatPage(resultat, page, limit));
  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
};

export const getLigneCommandeById = async (req, res) => {
  try {
    const ligne = await LigneCommande.findByPk(req.params.id, {
      include: [{ model: Produit, as: 'produit' }],
    });
    if (!ligne) return res.status(404).json({ message: 'Ligne de commande introuvable' });
    res.json(ligne);
  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
};

export const createLigneCommande = async (req, res) => {
  try {
    const { id_commande, id_produit, quantite } = req.body;
    const produit = await Produit.findByPk(id_produit);
    if (!produit) return res.status(404).json({ message: 'Produit introuvable' });
    const ligne = await LigneCommande.create({
      id_commande,
      id_produit,
      quantite,
      prix_unitaire: produit.prix,
    });
    res.status(201).json(ligne);
  } catch (erreur) {
    res.status(400).json({ message: erreur.message });
  }
};

export const updateLigneCommande = async (req, res) => {
  try {
    const ligne = await LigneCommande.findByPk(req.params.id);
    if (!ligne) return res.status(404).json({ message: 'Ligne de commande introuvable' });
    const { quantite } = req.body;
    await ligne.update({ quantite });
    res.json(ligne);
  } catch (erreur) {
    res.status(400).json({ message: erreur.message });
  }
};

export const deleteLigneCommande = async (req, res) => {
  try {
    const ligne = await LigneCommande.findByPk(req.params.id);
    if (!ligne) return res.status(404).json({ message: 'Ligne de commande introuvable' });
    await ligne.destroy();
    res.json({ message: 'Ligne de commande supprimee' });
  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
};
