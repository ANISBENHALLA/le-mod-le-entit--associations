import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Produit = sequelize.define(
  'Produit',
  {
    id_produit: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nom: { type: DataTypes.STRING(150), allowNull: false },
    description: { type: DataTypes.TEXT },
    prix: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    image: { type: DataTypes.STRING(255) },
    id_categorie: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: 'produit', timestamps: false }
);

export default Produit;
