import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Utilisateur } from '../models/index.js';

// Inscription : crée un utilisateur avec un mot de passe haché
export const inscription = async (req, res) => {
  try {
    const existe = await Utilisateur.findOne({ where: { email: req.body.email } });
    if (existe) {
      return res.status(400).json({ message: 'Ce courriel est déjà utilisé' });
    }

    const motDePasseHache = await bcrypt.hash(req.body.mot_de_passe, 10);

    const utilisateur = await Utilisateur.create({
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      mot_de_passe: motDePasseHache,
      id_role: req.body.id_role,
    });

    res.status(201).json({ message: 'Inscription réussie', id_utilisateur: utilisateur.id_utilisateur });
  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
};

// Connexion : vérifie le courriel et le mot de passe, puis renvoie un jeton JWT
export const connexion = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findOne({ where: { email: req.body.email } });
    if (!utilisateur) {
      return res.status(401).json({ message: 'Courriel ou mot de passe incorrect' });
    }

    const motDePasseOk = await bcrypt.compare(req.body.mot_de_passe, utilisateur.mot_de_passe);
    if (!motDePasseOk) {
      return res.status(401).json({ message: 'Courriel ou mot de passe incorrect' });
    }

    const token = jwt.sign(
      { id_utilisateur: utilisateur.id_utilisateur, email: utilisateur.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ message: 'Connexion réussie', token: token });
  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
};