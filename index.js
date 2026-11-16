import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js';
import roleRoutes from './routes/roleRoutes.js';
import utilisateurRoutes from './routes/utilisateurRoutes.js';
import categorieRoutes from './routes/categorieRoutes.js';
import produitRoutes from './routes/produitRoutes.js';
import commandeRoutes from './routes/commandeRoutes.js';
import ligneCommandeRoutes from './routes/ligneCommandeRoutes.js';
import avisRoutes from './routes/avisRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.json({ message: "API de la boutique en ligne" });
});

app.use('/api/roles', roleRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/categories', categorieRoutes);
app.use('/api/produits', produitRoutes);
app.use('/api/commandes', commandeRoutes);
app.use('/api/lignes-commande', ligneCommandeRoutes);
app.use('/api/avis', avisRoutes);

// Route inconnue
app.use((req, res) => {
  res.status(404).json({ message: 'Route introuvable' });
});

const demarrer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Serveur demarre sur http://localhost:${PORT}`);
    });
  } catch (erreur) {
    console.error('Connexion a la base de donnees impossible :', erreur.message);
    process.exit(1);
  }
};

demarrer();
