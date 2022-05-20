const bcrypt = require("bcrypt");
// const User = require("../models/user");
const db = require("../models/index");
// const Joi = require("joi");
// const validateRequest = require("../middleware/validate-request");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
    
    try {
        // validate
        // const schema = Joi.object({
        // firstName: Joi.string().required(),
        // lastName: Joi.string().required(),
        // email: Joi.string().email().required(),
        // password: Joi.string().min(6).required(),
        // });
        // validateRequest(req, next, schema);

        
        const user = await db.User.findOne({ where: { email: req.body.email }})
        if (user) {
            return res.status(409).json({ error: "Cet email est déjà utilisé "});
        } else {
            const passwordHash = await bcrypt.hash(req.body.password, 10);
            const userData = new db.User ({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                passwordHash: passwordHash
            });

            await userData.save();

            return res.status(200).json({ message: "L'utilisateur a été créé "});

        }
    } catch (error) {
        return res.status(400).json({ error: "Une erreur est apparue lors de l'inscription "});
    }
}


exports.login = (req, res, next) => {
    db.User.findOne({
        where: { email: req.body.email }
    })
    .then(user => {
        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé "});
        }
        bcrypt.compare(req.body.password, user.passwordHash)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: "Mot de passe incorrect "});
                }
                res.status(200).json({
                    userId: user.id,
                    token: jwt.sign({ userId: user.id, role: user.role }, "RANDOM_TOKEN_SECRET", { expiresIn: "24h" })
                });
            });
    })
    .catch(error => res.status(500).json({ error }));
}