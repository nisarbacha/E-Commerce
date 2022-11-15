const express = require('express');
const { handleErrors } = require('./middlewares');
const usersRepo = require('../../repositories/users');
const signUpTemplate = require('../../views/admin/auth/signup')
const signinTemplate = require('../../views/admin/auth/signin')
const { requireEmail, requirePassword, requirePasswordConfirmation, requiredSigninEmail, requiredSigninPassword } = require('./validators')
const router = express.Router();


router.get('/signup', (req, res) => {
    res.send(signUpTemplate({ req }));
}); 

router.post('/signup',  
    [requireEmail, requirePasswordConfirmation,
    requirePassword], 
    handleErrors(signUpTemplate),
     async (req, res) => { 
    const { email, password } = req.body;  
        const user = await usersRepo.create({ email, password });
        req.session.userId = user.id;
         res.redirect('/admin/products');
    
});
router.get('/signin', (req, res) => {
    res.send(signinTemplate({}));
})
router.post('/signin',
[requiredSigninEmail, requiredSigninPassword],
    handleErrors(signinTemplate),
async (req, res) => { 
    const {email} = req.body; 
    const user = await usersRepo.getOneBy({ email });
    if(!user){
        throw new Error("The email is invalid")
    }
    req.session.userId = user.id;
    res.redirect('/admin/products');
})

router.get('/signout', (req, res) => {
    req.session = null;
    res.send('logout');
})

module.exports = router;