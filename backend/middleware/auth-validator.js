const passwordValidator = require("password-validator")
const emailValidator = require("email-validator")

exports.checkValid = (req, res, next) => {
    const passwordSchema = new passwordValidator();
    passwordSchema
        .is().min(8) // Minimum length 8
        .is().max(32) // Maximum length 32
        .has().uppercase() // Must have uppercase letters
        .has().lowercase() // Must have lowercase letters
        .has().digits(2) // Must have at least 2 digits
        .has().not().spaces() // Should not have spaces
        .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

    if(!emailValidator.validate(req.body.email) || !passwordSchema.validate(req.body.password)) {
        res.status(400).json({ error: "Le format de l'email ou le mot de passe est incorrect, ce dernier doit contenir entre 8 et 32 caractères dont au minimum 2 chiffres, des majuscules et minuscules" })
    } else if(emailValidator.validate(req.body.email) || passwordSchema.validate(req.body.password)) {
        next()
    }
}

exports.checkName = (req, res, next) => {
    const nameRegex = /^[a-zA-ZÀ-ÿ .,'-]+$/
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    if(nameRegex.test(firstName) === true || nameRegex.test(lastName) === true) {
        next()
    } else {
        return res.status(400).json({ error: "Veuillez vérifier le format de votre nom et de votre prénom" })
    }
}