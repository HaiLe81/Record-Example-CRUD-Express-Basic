// var db = require('../db');

var Cart = require('../models/cart.model');

module.exports =  {
    addToCart: (req, res, next) => {
        // get productID
        var productId = req.params.productId;
        // console.log('productId1:', productId)
        // console.log('typeof', typeof productId)
        // get sessionId
        var sessionId = req.signedCookies.sessionId;
        // console.log('ses:', sessionId)
        if(!sessionId) {
            res.redirect('/products');
            return;
        }
        
        // var count = db
        // .get('Sessions')
        // .find({ id: sessionId })
        // .get('cart.' + productId, 0)

        // db.get('Sessions').find({ id: sessionId })
        // .set('cart.' + productId, count+1)
        // .write()
        // Cart.find().then((doc) => {
        //     console.log('doc>', doc)
        //     // console.log('doc.cart', typeof doc.cart)
        //     let index1 = doc.findIndex(x => x.sessionId === sessionId)
        //     console.log('index1', index1)
        //     let item = doc[index1];
        //     console.log('item>', item)
        //     // console.log('item>', typeof item)
        //     let listCart = item.cart;

        //     console.log('lsCart>', listCart)

        //     let index = listCart.findIndex(x => x.productId === productId)
        //     if(index !== 1){
        //         listCart[index].count+=1;
        //     } else {
        //         listCart.push({productId: productId, count: 1})
        //     }

        //     doc.save()
        // })


        // find by sessionId
        Cart.findOne({ sessionId: sessionId }).then(doc => {
            console.log('doc>', doc.cart)
            let listCart = doc.cart;
            let index = listCart.findIndex(x => x.productId === productId)
            if(index !== 1){
                listCart[index].count+=1;
            } else {
                listCart.push({ productId: productId, count: 1 })
            }
            doc.save()
        })
        .catch(err => {
            console.log(err)
        })
 
        res.redirect('/products');
    }
}