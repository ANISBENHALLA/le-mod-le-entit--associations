import sequelize from '../config/database.js';
import Role from './Role.js';
import Utilisateur from './Utilisateur.js';
import Categorie from './Categorie.js';
import Produit from './Produit.js';
import Commande from './Commande.js';
import LigneCommande from './LigneCommande.js';
import Avis from './Avis.js';

// Un role regroupe plusieurs utilisateurs ; un utilisateur a un seul role.
Role.hasMany(Utilisateur, { foreignKey: 'id_role', as: 'utilisateurs' });
Utilisateur.belongsTo(Role, { foreignKey: 'id_role', as: 'role' });

// Une categorie regroupe plusieurs produits ; un produit a une seule categorie.
Categorie.hasMany(Produit, { foreignKey: 'id_categorie', as: 'produits' });
Produit.belongsTo(Categorie, { foreignKey: 'id_categorie', as: 'categorie' });

// Un utilisateur passe plusieurs commandes ; une commande appartient a un utilisateur.
Utilisateur.hasMany(Commande, { foreignKey: 'id_utilisateur', as: 'commandes' });
Commande.belongsTo(Utilisateur, { foreignKey: 'id_utilisateur', as: 'utilisateur' });

// Une commande contient plusieurs lignes ; chaque ligne vise un produit.
Commande.hasMany(LigneCommande, { foreignKey: 'id_commande', as: 'lignes' });
LigneCommande.belongsTo(Commande, { foreignKey: 'id_commande', as: 'commande' });
Produit.hasMany(LigneCommande, { foreignKey: 'id_produit', as: 'lignes' });
LigneCommande.belongsTo(Produit, { foreignKey: 'id_produit', as: 'produit' });

// Relation plusieurs-a-plusieurs entre commande et produit, via ligne_commande.
Commande.belongsToMany(Produit, {
  through: LigneCommande,
  foreignKey: 'id_commande',
  otherKey: 'id_produit',
  as: 'produits',
});
Produit.belongsToMany(Commande, {
  through: LigneCommande,
  foreignKey: 'id_produit',
  otherKey: 'id_commande',
  as: 'commandes',
});

// Un utilisateur redige plusieurs avis ; un produit recoit plusieurs avis.
Utilisateur.hasMany(Avis, { foreignKey: 'id_utilisateur', as: 'avis' });
Avis.belongsTo(Utilisateur, { foreignKey: 'id_utilisateur', as: 'utilisateur' });
Produit.hasMany(Avis, { foreignKey: 'id_produit', as: 'avis' });
Avis.belongsTo(Produit, { foreignKey: 'id_produit', as: 'produit' });

export {
  sequelize,
  Role,
  Utilisateur,
  Categorie,
  Produit,
  Commande,
  LigneCommande,
  Avis,
};
