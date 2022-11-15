const express = require('express');
const router = express.Router();
const cartsRepo = require('../repositories/carts')
const productRepo = require('../repositories/products');
const cartDisplayTemplate = require('../views/carts/show');

 router.post('/cart/products', async (req, res) => {
   // figure out the cart  
    let cart;
    if (!req.session.cartId) {
      /*   we dont have a cart, we need to create one,
        and store the cart id on the req.session.cartid
        property  */
        cart = await cartsRepo.create({ items: [] });
        req.session.cartId = cart.id;

    } else {
       /*  we have a cart, lets get it from the repository */
        cart = await cartsRepo.getOne(req.session.cartId)
        console.log(cart)
    }
    
     // either increment quantity for existing item or add new product to items array
      const existingItem = cart.items.find(item => item.id === req.body.productId);
     if (existingItem) {
         // increment quantity and save cart
         existingItem.quantity++;
     } else {
         // add new product in item array
         cart.items.push({ id: req.body.productId, quantity: 1 })
     }
     await cartsRepo.update(cart.id, {
         items: cart.items
     })  
    res.redirect("/cart");
}); 
  router.get('/cart', async (req, res) => {
    if(!req.session.cartId){
        return res.redirect('/');
    }else{
        const cart = await cartsRepo.getOne(req.session.cartId);
        for(let item of cart.items){
            const product = await productRepo.getOne(item.id);
            item.product = product;
            
        }
        res.send(cartDisplayTemplate({items:cart.items}));
    }
});  
 
router.post('/cart/product/delete', async (req, res) => {
    const{ itemId} = req.body;
    const cart = await cartsRepo.getOne( req.session.cartId);
    const items = cart.items.filter(item => item.id !== itemId);
    await cartsRepo.update(req.session.cartId, { items});
    res.redirect('/cart')
});  


module.exports = router; 