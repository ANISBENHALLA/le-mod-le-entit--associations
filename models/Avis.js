import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Avis = sequelize.define(
  'Avis',
  {
    id_avis: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    note: { type: DataTypes.INTEGER, allowNull: false },
    commentaire: { type: DataTypes.TEXT },
    date_avis: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    id_utilisateur: { type: DataTypes.INTEGER, allowNull: false },
    id_produit: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: 'avis', timestamps: false }
);

export default Avis;
