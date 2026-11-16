import bcrypt from 'bcryptjs';
import { Utilisateur, Role } from '../models/index.js';
import { getPagination, formatPage } from '../utils/pagination.js';

// Le mot de passe n'est jamais renvoye dans les reponses.
const sansMotDePasse = { exclude: ['mot_de_passe'] };

export const getUtilisateurs = async (req, res) => {
  try {
    const { page, limit, offset } = getPagination(req.query);
    const resultat = await Utilisateur.findAndCountAll({
      attributes: sansMotDePasse,
      include: [{ model: Role, as: 'role' }],
      order: [['id_utilisateur', 'ASC']],
      limit,
      offset,
    });
    res.json(formatPage(resultat, page, limit));
  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
};

export const getUtilisateurById = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByPk(req.params.id, {
      attributes: sansMotDePasse,
      include: [{ model: Role, as: 'role' }],
    });
    if (!utilisateur) return res.status(404).json({ message: 'Utilisateur introuvable' });
    res.json(utilisateur);
  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
};

export const createUtilisateur = async (req, res) => {
  try {
    const { nom, prenom, email, mot_de_passe, telephone, adresse, id_role } = req.body;
    // Photo téléversée avec Multer (champ form-data "photo")
    const photo = req.file ? `/uploads/${req.file.filename}` : req.body.photo;
    // Le mot de passe est haché avant d'être enregistré
    const motDePasseHache = await bcrypt.hash(mot_de_passe, 10);
    const utilisateur = await Utilisateur.create({
      nom, prenom, email, mot_de_passe: motDePasseHache, telephone, adresse, photo, id_role,
    });
    const { mot_de_passe: _retire, ...donnees } = utilisateur.toJSON();
    res.status(201).json(donnees);
  } catch (erreur) {
    res.status(400).json({ message: erreur.message });
  }
};

export const updateUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByPk(req.params.id);
    if (!utilisateur) return res.status(404).json({ message: 'Utilisateur introuvable' });
    const { nom, prenom, email, telephone, adresse, id_role } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : req.body.photo;
    await utilisateur.update({ nom, prenom, email, telephone, adresse, photo, id_role });
    const { mot_de_passe: _retire, ...donnees } = utilisateur.toJSON();
    res.json(donnees);
  } catch (erreur) {
    res.status(400).json({ message: erreur.message });
  }
};

export const deleteUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByPk(req.params.id);
    if (!utilisateur) return res.status(404).json({ message: 'Utilisateur introuvable' });
    await utilisateur.destroy();
    res.json({ message: 'Utilisateur supprime' });
  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
};
