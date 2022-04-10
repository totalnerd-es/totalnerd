const winston = require('winston');
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

module.exports = function() {
    mongoose.connect('mongodb://localhost/giftapp')
        .then(() => winston.info('Connected to MongoDB'));
}