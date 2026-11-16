import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Categorie = sequelize.define(
  'Categorie',
  {
    id_categorie: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nom: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.TEXT },
    image: { type: DataTypes.STRING(255) },
  },
  { tableName: 'categorie', timestamps: false }
);

export default Categorie;
