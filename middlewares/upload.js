import multer from 'multer';
import path from 'path';

// Les fichiers sont enregistrés dans le dossier uploads/ avec un nom unique.
const stockage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const nomUnique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
    cb(null, nomUnique);
  },
});

// Seules les images sont acceptées.
const filtreImage = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Le fichier doit être une image (jpg, png, gif, webp)'));
  }
};

const upload = multer({
  storage: stockage,
  fileFilter: filtreImage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 Mo maximum
});

// Téléverse un seul fichier envoyé en form-data dans le champ indiqué
// (ex. : televerser('image')). En cas d'erreur, répond 400.
export const televerser = (champ) => (req, res, next) => {
  upload.single(champ)(req, res, (erreur) => {
    if (erreur) {
      return res.status(400).json({ message: erreur.message });
    }
    next();
  });
};
