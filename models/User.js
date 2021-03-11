const {Schema, model} = require('mongoose')

module.exports = model('User', new Schema(
    {
        login: {
            type: String,
            trim: true,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    }
))
