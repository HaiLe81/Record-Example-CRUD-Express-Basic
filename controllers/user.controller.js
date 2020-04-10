var md5 = require('md5');

var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
})

var db = require('../db');

var Auth = require('../models/auth.model');

var Huflit = require('../models/user.model');

module.exports = {
    index: async function(req, res) {
        let page = parseInt(req.query.page) || 1;
        let perPage = 3;

        let start = (page - 1) * perPage;
        let end = page * perPage;
        await Huflit.find()
        .then(doc => {
            console.log('fullFree ength:', doc.length)
            res.render('users/index', {
                FreeLaHuflit: doc.slice(start, end),
                fullFree: doc.length
            });
        })
    },
    search: async function(req, res) {
        let q = req.query.q;
        // let matchedUsers = db.get('FreeLaHuflit').value().filter((user) => {
        //     return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        // })

        await Huflit.find()
        .then((doc) => {
            let matchedUsers = doc.filter(x => {
                return x.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
            })
            
            res.render('users/index', {
                FreeLaHuflit: matchedUsers
            })
        })
    },
    create: (req, res) => {
        res.render('users/create')
    },
    get: async function(req, res) {
        // var id = parseInt(req.params.id);
        var id = req.params.id;
        console.log('id', id)
        // console.log(typeof id)
        // var FreeLaHuflit = db.get('FreeLaHuflit').find({ id: id }).value();

        await Huflit.findOne({ _id: id })
        .then((doc) => {
            console.log('doc>>>>', doc)
            res.render('users/view', {
                FreeLaHuflit: doc
            });
        })
    },
    post: async function(req, res) {
        
        var arr = req.file.path.split('').slice(15)
        arr.splice(0, 0, "uploads/")
        var newArr = arr.join('')

        // db.get('FreeLaHuflit').push(req.body)
        //     .write();
        // change code to upload file to mongoose

        const file = req.file
        console.log(file)

        const path = await cloudinary.uploader.upload(
            req.file.path
        )
        .then(result => result.url)
        .catch(_ => false)
        // const path = await cloudinary.uploader.upload(
        //     newArr,
        //     { public_id: `user/${newArr}` }
        // ).then(result => {
        //     console.log('result', result)
        //     return result
        // })
        // .catch(_ => false)
        //     console.log('path Cloud', path)
        const newUser = new Huflit({
            name: req.body.name,
            phone: req.body.phone,
            age: req.body.age,
            avatar: path
        })
        console.log('run here 1')
        await newUser.save()
        res.redirect('/users')

    },
    changePassword: (req, res) => {
        res.render('users/changePassword')
    },
    postChangePassword:  (req, res) => {
        // update password 
        // let a = db.get('ListAccout').find({ id: req.signedCookies.userId })
        //     .assign({ password: md5(req.body.password) })
        //     .value()
        
        // update password
        Auth.findOne({ _id: req.signedCookies.userId }, async function(err, doc) {
            if(err){
                console.log(err)
            }

            if(doc === null){
                console.log('null')
            } else {
                doc.password = md5(req.body.password);
                doc.save()
            }
        })

        res.redirect('/users');
    }
}