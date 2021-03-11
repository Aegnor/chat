const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {body, validationResult} = require('express-validator')

const User = require('../models/User')
const env_config = require('../config/index')

//@TODO: Validate special chars
router.post(
    '/',
    body('login').isLength({ min: 3 }).withMessage('Username must be minimum 3 characters'),
    async (req, res) => {
        try {
            // @TODO: Refactor messages, maybe we need to send message in express-validator middleware
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                res.status(400).json({
                    error: 'Username must be minimum 3 characters'
                })
            }

            const { login, password } = req.body
            const user = await User.findOne({ login })

            if (user) {
                const isPasswordsEqual = bcrypt.compareSync(password, user.password)

                if (isPasswordsEqual) {
                    const token = jwt.sign(
                        user.toObject(),
                        env_config.JWT_SECRET,
                        {
                            expiresIn: 60 * 60 * 2
                        }
                    )

                    res.status(200).send({
                        token
                    });
                } else {
                    res.status(401).json({
                        error: 'Passwords are not the same, try again please'
                    })
                }
            } else {
                const usersCollection = await User.find()
                const newUser = new User({
                    login,
                    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
                })

                await newUser.save()

                if (usersCollection.length === 1) {
                    const admin = await User.findOne({login: usersCollection[0].login})
                    admin.isAdmin = true
                    await admin.save()
                    res.status(201).json(admin)
                } else {
                    res.status(201).json(newUser)
                }
            }
        } catch (e) {
            console.log(e)
            res.status(500).json({
                error: 'Something gone wrong, try again please'
            })
        }
    }
)

module.exports = router
