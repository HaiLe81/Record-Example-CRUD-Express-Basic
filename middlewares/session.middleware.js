var db = require('../db');

var shortid = require('shortid');

module.exports = (req, res, next) => {
    if(!req.signedCookies.sessionId) {
        var sessionId = shortid.generate()
        res.cookie('sessionId', sessionId, {
            signed: true
        });
        db.get('Sessions').push({
            id: sessionId
        }).write();
    }

    next();
}