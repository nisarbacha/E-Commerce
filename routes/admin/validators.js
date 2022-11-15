const { check } = require('express-validator');
const usersRepo = require('../../repositories/users');

module.exports = {
    //Product validators
   /*  requireFile: check('file', 'You must select an image or file.').notEmpty(), */
    requireTitle: check('title').trim().isLength({ min: 2, max: 20 }).withMessage("Title must provide"),
    requirePrice: check('price').trim().isLength({ min: 2, max: 20 }).withMessage("Price must be a number"),
    // User Auth validators
    requireEmail: check('email').trim().normalizeEmail().isEmail()
    .withMessage("Must be a valid E-mail")
        .custom(async (email) => {
            const existingUser = await usersRepo.getOneBy({ email });
            if (existingUser) {
                throw new Error('E-mail in use');
            }
        }),
    requirePassword: check('password').trim().isLength({ min: 4 }).withMessage("Password Must be 2 to 6"),
    requirePasswordConfirmation: check('passwordConfirmation')
        .trim()
        .isLength({ min: 4 })
        .withMessage('Must be between 4 and 20 characters')
        .custom(async (passwordConfirmation, { req }) => { 
            if (passwordConfirmation !== req.body.password) {
                throw new Error('Passwords must match');
            }
        }),
    requiredSigninEmail: check('email').trim().normalizeEmail().isEmail()
        .withMessage("Provide a valid E-mail").custom(async (email) => {
            const user = await usersRepo.getOneBy({ email });
            if (!user) {
                throw new Error("Email is not found");
            }
        }),
    requiredSigninPassword: check('password').trim().custom(async (password, { req }) => {
        const user = await usersRepo.getOneBy({ email: req.body.email });
        if (!user) {
            throw new Error('Invalid Password ');
        }
        const validPassword = await usersRepo.comparePasswords(user.password, password)
        if (!validPassword) {
            throw new Error('Invalid password');
        }
    })
}
