const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserSchema = new Schema({
    firstName: { type: String, required: true, maxLength: 50 },
    lastName: { type: String, required: true, maxLength: 50 },
    email: { type: String, required: true, validate: [validateEmail, 'Please provide a valid email address'] },
    password: { type: String, required: true },
    status: { type: String, required: true },
    isAdmin: Boolean
});

UserSchema.virtual('url').get(function() {
    return `/user/${this._id}`;
});

module.exports = mongoose.model('User', UserSchema);