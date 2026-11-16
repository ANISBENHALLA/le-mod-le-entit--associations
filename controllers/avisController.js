import { Avis, Produit, Utilisateur } from '../models/index.js';
import { getPagination, formatPage } from '../utils/pagination.js';

const inclusions = [
  { model: Utilisateur, as: 'utilisateur', attributes: ['id_utilisateur', 'nom', 'prenom', 'photo'] },
  { model: Produit, as: 'produit', attributes: ['id_produit', 'nom', 'image'] },
];

// GET /api/avis?page=1&limit=10&id_produit=2
export const getAvis = async (req, res) => {
  try {
    const { page, limit, offset } = getPagination(req.query);
    const where = {};
    if (req.query.id_produit) where.id_produit = req.query.id_produit;

    const resultat = await Avis.findAndCountAll({
      where,
      include: inclusions,
      order: [['date_avis', 'DESC']],
      limit,
      offset,
    });
    res.json(formatPage(resultat, page, limit));
  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
};

export const getAvisById = async (req, res) => {
  try {
    const avis = await Avis.findByPk(req.params.id, { include: inclusions });
    if (!avis) return res.status(404).json({ message: 'Avis introuvable' });
    res.json(avis);
  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
};

export const createAvis = async (req, res) => {
  try {
    const { note, commentaire, id_utilisateur, id_produit } = req.body;
    const avis = await Avis.create({ note, commentaire, id_utilisateur, id_produit });
    res.status(201).json(avis);
  } catch (erreur) {
    res.status(400).json({ message: erreur.message });
  }
};

export const updateAvis = async (req, res) => {
  try {
    const avis = await Avis.findByPk(req.params.id);
    if (!avis) return res.status(404).json({ message: 'Avis introuvable' });
    const { note, commentaire } = req.body;
    await avis.update({ note, commentaire });
    res.json(avis);
  } catch (erreur) {
    res.status(400).json({ message: erreur.message });
  }
};

export const deleteAvis = async (req, res) => {
  try {
    const avis = await Avis.findByPk(req.params.id);
    if (!avis) return res.status(404).json({ message: 'Avis introuvable' });
    await avis.destroy();
    res.json({ message: 'Avis supprime' });
  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
};
