// Import bcrypt pour chiffrage password
const bcrypt = require("bcrypt");
// Import des models
const db = require("../models/index");
// Import jwt pour création et vérification des tokens à la connexion
const jwt = require("jsonwebtoken");

// Inscription de l'utilisateur
exports.signup = async (req, res, next) => {
    
    try {
        const user = await db.User.findOne({ where: { email: req.body.email }})
        // Vérification du mail si déjà présent dans la DB
        if (user) {
            return res.status(409).json({ error: "Cet email est déjà utilisé" });
        } else {
            // Hash du password et création de l'utilisateur
            const passwordHash = await bcrypt.hash(req.body.password, 10);
            const userData = new db.User ({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                passwordHash: passwordHash
            });

            // Save de l'utilisateur dans la DB
            await userData.save();

            return res.status(200).json({ message: "L'utilisateur a été créé" });

        }
    } catch (error) {
        return res.status(400).json({ error: "Une erreur est apparue lors de l'inscription" });
    }
}

// Connexion de l'utlisateur
exports.login = (req, res, next) => {
    // Vérification si l'utilisateur est présent dans la DB
    db.User.findOne({
        where: { email: req.body.email }
    })
    .then(user => {
        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }
        // Vérification du password avec bcrypt
        bcrypt.compare(req.body.password, user.passwordHash)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: "Mot de passe incorrect" });
                }
                
                // Création du token de connexion
                res.status(200).json({
                    userId: user.id,
                    userRole: user.role,
                    token: jwt.sign({ userId: user.id, role: user.role }, process.env.SECRET_TOKEN, { expiresIn: "24h" })
                });
            });
    })
    .catch(error => res.status(500).json({ error }));
}