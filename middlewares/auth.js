import jwt from 'jsonwebtoken';

// Vérifie le jeton envoyé dans l'en-tête : Authorization: Bearer <jeton>
export const verifierToken = (req, res, next) => {
  const entete = req.headers.authorization;
  if (!entete) {
    return res.status(401).json({ message: 'Jeton manquant' });
  }

  const token = entete.split(' ')[1];
  try {
    req.utilisateur = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (erreur) {
    res.status(401).json({ message: 'Jeton invalide' });
  }
};