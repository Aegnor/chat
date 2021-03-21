const jwt = require('jsonwebtoken')
const env_config = require('../config/index')

exports.signJwtToken = (data) => {
    return jwt.sign(
        data,
        env_config.JWT_SECRET,
        {
            expiresIn: 60 * 60 * 2
        }
    )
}
