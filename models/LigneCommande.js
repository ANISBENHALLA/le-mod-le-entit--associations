import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const LigneCommande = sequelize.define(
  'LigneCommande',
  {
    id_ligne_commande: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quantite: { type: DataTypes.INTEGER, allowNull: false },
    prix_unitaire: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    id_commande: { type: DataTypes.INTEGER, allowNull: false },
    id_produit: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: 'ligne_commande', timestamps: false }
);

export default LigneCommande;
