import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Utilisateur = sequelize.define(
  'Utilisateur',
  {
    id_utilisateur: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nom: { type: DataTypes.STRING(100), allowNull: false },
    prenom: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    mot_de_passe: { type: DataTypes.STRING(255), allowNull: false },
    telephone: { type: DataTypes.STRING(20) },
    adresse: { type: DataTypes.STRING(255) },
    photo: { type: DataTypes.STRING(255) },
    id_role: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: 'utilisateur', timestamps: false }
);

export default Utilisateur;
