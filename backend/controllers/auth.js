const bcrypt = require("bcrypt");
const db = require("../config/db");
// const Joi = require("joi");
// const validateRequest = require("../middleware/validate-request");

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
            return res.status(500).json({ message: "Cet email est déjà utilisé "});
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
        return res.status(400).json({ message: "Une erreur est apparue lors de l'inscription "});
    }
}