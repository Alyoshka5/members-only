const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema

const PostSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, maxLength: 150 },
    content: { type: String, required: true },
    datePosted: { type: Date, default: Date.now }
});

PostSchema.virtual('url').get(function() {
    return `post/${this._id}`;
});

PostSchema.virtual('datePostedFormatted').get(function() {
    return DateTime.fromJSDate(this.datePosted).toLocaleString(DateTime.DATE_MED);
});

PostSchema.virtual('timePosted').get(function() {
    return DateTime.fromJSDate(this.datePosted).toLocaleString(DateTime.TIME_SIMPLE);
});

module.exports = mongoose.model('Post', PostSchema);