const mongoose = require('mongoose');

module.exports = {
    requireId: (req, res, next) => {
        if(mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).send('Invalid.')
        }
        next()
    }
}