// Lit ?page=1&limit=10 dans l'URL et calcule l'offset pour Sequelize.
export const getPagination = (query) => {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 10));
  const offset = (page - 1) * limit;
  return { page, limit, offset };
};

// Met en forme le resultat de findAndCountAll.
export const formatPage = ({ count, rows }, page, limit) => ({
  total: count,
  page,
  limit,
  totalPages: Math.ceil(count / limit),
  data: rows,
});
