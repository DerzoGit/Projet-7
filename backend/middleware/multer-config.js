// Package multer qui permet de gérer les fichiers dans les requêtes HTTP
const multer = require("multer");

// Génère l'extension des fichiers
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png"
};

// Objet de configuration pour multer. Envoie dans le dossier de destination des images. Change le nom du fichier et son extension
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images")
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + "." + extension);
    }
});

module.exports = multer({ storage }).single("media");