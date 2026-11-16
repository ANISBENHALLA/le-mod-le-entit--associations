import { Role } from '../models/index.js';

export const getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({ order: [['id_role', 'ASC']] });
    res.json(roles);
  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
};

export const getRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role introuvable' });
    res.json(role);
  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
};

export const createRole = async (req, res) => {
  try {
    const { nom, description } = req.body;
    const role = await Role.create({ nom, description });
    res.status(201).json(role);
  } catch (erreur) {
    res.status(400).json({ message: erreur.message });
  }
};

export const updateRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role introuvable' });
    const { nom, description } = req.body;
    await role.update({ nom, description });
    res.json(role);
  } catch (erreur) {
    res.status(400).json({ message: erreur.message });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role introuvable' });
    await role.destroy();
    res.json({ message: 'Role supprime' });
  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
};
