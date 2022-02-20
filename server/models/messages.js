const mongoose = require('mongoose')

const articaleSchema = mongoose.Schema({
    content: { type: String, required: true },
    from: { type: String, required: true },
    mid: { type:String, required: true },
    to: { type: String, required: true }
},{timestamps: true})

module.exports = mongoose.model('messages', articaleSchema)