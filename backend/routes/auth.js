const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../middleware/validate-request");
const authCtrl = require("../controllers/auth");

router.post("/signup", createSchema, create);

module.exports = router;

function create(req, res, next) {
    authCtrl.signup(req.body)
        .then(() => res.json({ message: 'User created' }))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });
    validateRequest(req, next, schema);
}
