import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Commande = sequelize.define(
  'Commande',
  {
    id_commande: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date_commande: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    statut: { type: DataTypes.STRING(30), allowNull: false, defaultValue: 'en attente' },
    total: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
    adresse_livraison: { type: DataTypes.STRING(255), allowNull: false },
    id_utilisateur: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: 'commande', timestamps: false }
);

export default Commande;
