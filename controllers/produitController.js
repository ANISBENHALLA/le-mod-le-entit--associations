import { Produit, Categorie } from '../models/index.js';
import { getPagination, formatPage } from '../utils/pagination.js';

// GET /api/produits?page=1&limit=10&id_categorie=2
export const getProduits = async (req, res) => {
  try {
    const { page, limit, offset } = getPagination(req.query);
    const where = {};
    if (req.query.id_categorie) where.id_categorie = req.query.id_categorie;

    const resultat = await Produit.findAndCountAll({
      where,
      include: [{ model: Categorie, as: 'categorie' }],
      order: [['id_produit', 'ASC']],
      limit,
      offset,
    });
    res.json(formatPage(resultat, page, limit));
  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
};

export const getProduitById = async (req, res) => {
  try {
    const produit = await Produit.findByPk(req.params.id, {
      include: [{ model: Categorie, as: 'categorie' }],
    });
    if (!produit) return res.status(404).json({ message: 'Produit introuvable' });
    res.json(produit);
  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
};

export const createProduit = async (req, res) => {
  try {
    const { nom, description, prix, stock, id_categorie } = req.body;
    // Image téléversée avec Multer (champ form-data "image")
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;
    const produit = await Produit.create({ nom, description, prix, stock, image, id_categorie });
    res.status(201).json(produit);
  } catch (erreur) {
    res.status(400).json({ message: erreur.message });
  }
};

export const updateProduit = async (req, res) => {
  try {
    const produit = await Produit.findByPk(req.params.id);
    if (!produit) return res.status(404).json({ message: 'Produit introuvable' });
    const { nom, description, prix, stock, id_categorie } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;
    await produit.update({ nom, description, prix, stock, image, id_categorie });
    res.json(produit);
  } catch (erreur) {
    res.status(400).json({ message: erreur.message });
  }
};

export const deleteProduit = async (req, res) => {
  try {
    const produit = await Produit.findByPk(req.params.id);
    if (!produit) return res.status(404).json({ message: 'Produit introuvable' });
    await produit.destroy();
    res.json({ message: 'Produit supprime' });
  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
};
