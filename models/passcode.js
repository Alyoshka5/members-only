const mongoose = require('mongoose');

const Schema = mongoose.Schema

const PasscodeSchema = new Schema({
    code: String,
    forStatus: String
});

module.exports = mongoose.model('Passcode', PasscodeSchema);