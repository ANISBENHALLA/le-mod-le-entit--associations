import { sequelize, Commande, LigneCommande, Produit, Utilisateur } from '../models/index.js';
import { getPagination, formatPage } from '../utils/pagination.js';

const utilisateurSansMotDePasse = {
  model: Utilisateur,
  as: 'utilisateur',
  attributes: { exclude: ['mot_de_passe'] },
};

// GET /api/commandes?page=1&limit=10&id_utilisateur=3
export const getCommandes = async (req, res) => {
  try {
    const { page, limit, offset } = getPagination(req.query);
    const where = {};
    if (req.query.id_utilisateur) where.id_utilisateur = req.query.id_utilisateur;

    const resultat = await Commande.findAndCountAll({
      where,
      include: [utilisateurSansMotDePasse],
      order: [['date_commande', 'DESC']],
      limit,
      offset,
    });
    res.json(formatPage(resultat, page, limit));
  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
};

export const getCommandeById = async (req, res) => {
  try {
    const commande = await Commande.findByPk(req.params.id, {
      include: [
        utilisateurSansMotDePasse,
        { model: LigneCommande, as: 'lignes', include: [{ model: Produit, as: 'produit' }] },
      ],
    });
    if (!commande) return res.status(404).json({ message: 'Commande introuvable' });
    res.json(commande);
  } catch (erreur) {
    res.status(500).json({ message: erreur.message });
  }
};

// Corps attendu :
// { "id_utilisateur": 1, "adresse_livraison": "...", "lignes": [{ "id_produit": 2, "quantite": 3 }] }
export const createCommande = async (req, res) => {
  const { id_utilisateur, adresse_livraison, lignes } = req.body;
  if (!Array.isArray(lignes) || lignes.length === 0) {
    return res.status(400).json({ message: 'Une commande doit contenir au moins un produit' });
  }

  const transaction = await sequelize.transaction();
  try {
    const commande = await Commande.create(
      { id_utilisateur, adresse_livraison },
      { transaction }
    );

    let total = 0;
    for (const ligne of lignes) {
      const produit = await Produit.findByPk(ligne.id_produit, { transaction });
      if (!produit) throw new Error(`Produit ${ligne.id_produit} introuvable`);
      if (produit.stock < ligne.quantite) {
        throw new Error(`Stock insuffisant pour le produit ${produit.nom}`);
      }

      await LigneCommande.create(
        {
          id_commande: commande.id_commande,
          id_produit: produit.id_produit,
          quantite: ligne.quantite,
          prix_unitaire: produit.prix,
        },
        { transaction }
      );
      await produit.update({ stock: produit.stock - ligne.quantite }, { transaction });
      total += Number(produit.prix) * ligne.quantite;
    }

    await commande.update({ total }, { transaction });
    await transaction.commit();

    const complete = await Commande.findByPk(commande.id_commande, {
      include: [{ model: LigneCommande, as: 'lignes' }],
    });
    res.status(201).json(complete);
  } catch (erreur) {
    await transaction.rollback();
    res.status(400).json({ message: erreur.message });
  }
};

// Seuls le statut et l'adresse de livraison peuvent etre modifies.
export const updateCommande = async (req, res) => {
  try {
    const commande = await Commande.findByPk(req.params.id);
    if (!commande) return res.status(404).json({ message: 'Commande introuvable' });
    const { statut, adresse_livraison } = req.body;
    await commande.update({ statut, adresse_livraison });
    res.json(commande);
  } catch (erreur) {
    res.status(400).json({ message: erreur.message });
  }
};

export const deleteCommande = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const commande = await Commande.findByPk(req.params.id, { transaction });
    if (!commande) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Commande introuvable' });
    }
    await LigneCommande.destroy({ where: { id_commande: commande.id_commande }, transaction });
    await commande.destroy({ transaction });
    await transaction.commit();
    res.json({ message: 'Commande supprimee' });
  } catch (erreur) {
    await transaction.rollback();
    res.status(500).json({ message: erreur.message });
  }
};
