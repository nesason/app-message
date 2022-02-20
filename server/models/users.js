const mongoose = require('mongoose')

const articaleSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        uniqe: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true }
})

module.exports = mongoose.model('users', articaleSchema)