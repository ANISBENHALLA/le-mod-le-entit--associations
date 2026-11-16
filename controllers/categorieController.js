import { Categorie, Produit } from '../models/index.js';
import { getPagination, formatPage } from '../utils/pagination.js';

export const getCategories = async (req, res) => {
  try {
    const { page, limit, offset } = getPagination(req.query);
    const resultat = await Categorie.findAndCountAll({
      order: [['nom', 'ASC']],
      limit,
      offset,
    });
    res.json(formatPage(resultat, page, limit));
  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
};

export const getCategorieById = async (req, res) => {
  try {
    const categorie = await Categorie.findByPk(req.params.id, {
      include: [{ model: Produit, as: 'produits' }],
    });
    if (!categorie) return res.status(404).json({ message: 'Categorie introuvable' });
    res.json(categorie);
  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
};

export const createCategorie = async (req, res) => {
  try {
    const { nom, description } = req.body;
    // Image téléversée avec Multer (champ form-data "image")
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;
    const categorie = await Categorie.create({ nom, description, image });
    res.status(201).json(categorie);
  } catch (erreur) {
    res.status(400).json({ message: erreur.message });
  }
};

export const updateCategorie = async (req, res) => {
  try {
    const categorie = await Categorie.findByPk(req.params.id);
    if (!categorie) return res.status(404).json({ message: 'Categorie introuvable' });
    const { nom, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;
    await categorie.update({ nom, description, image });
    res.json(categorie);
  } catch (erreur) {
    res.status(400).json({ message: erreur.message });
  }
};

export const deleteCategorie = async (req, res) => {
  try {
    const categorie = await Categorie.findByPk(req.params.id);
    if (!categorie) return res.status(404).json({ message: 'Categorie introuvable' });
    await categorie.destroy();
    res.json({ message: 'Categorie supprimee' });
  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
};
