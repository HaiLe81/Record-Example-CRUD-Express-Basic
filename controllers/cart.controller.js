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
        Cart.findOne({ sessionId: sessionId }, async function(err, doc){
            if(err){
                console.log(err)
            }
            if(doc === null){
                console.log('null')
                var doc = new Cart();
                await doc.save()
                doc.sessionId = sessionId;
                doc.cart = [
                    { productId: productId, count: 1 }
                ]
                console.log('doc catch>', doc)
                console.log('doc null> ', doc)
                await doc.save()
            } else {
                let listCart = doc.cart;
                console.log('listCart>:', listCart)
                let index = listCart.findIndex(x => x.productId === productId)
                if(index !== -1){
                    listCart[index].count+=1;
                } else {
                    listCart.push({ productId: productId, count: 1 })
                }
                doc.save()

            }

        })
        // .then(doc => {
        //     console.log('doc>', doc.cart)
        //     let listCart = doc.cart;
        //     let index = listCart.findIndex(x => x.productId === productId)
        //     if(index !== 1){
        //         listCart[index].count+=1;
        //     } else {
        //         listCart.push({ productId: productId, count: 1 })
        //     }
        //     doc.save()
        // })
        // .then(() => {
        //     var doc = new Cart();
        //     doc.save()
        //     doc.sessionId = sessionId;
        //     doc.cart = [
        //         { productId: productId, count: 1 }
        //     ]
        //     console.log('doc catch>', doc)
        //     doc.save()
        // })
        // .catch(err => {
        //     console.log('err>', err)

        // })
 
        res.redirect('/products');
    }
}