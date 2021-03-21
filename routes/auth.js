const router = require('express').Router()
const bcrypt = require('bcryptjs')
const {body, validationResult} = require('express-validator')

const User = require('../models/User')
const {signJwtToken} = require('../helpers/jwt')

router.post(
    '/',
    body('login')
        .isLength({ min: 3 })
        .withMessage('Username must be minimum 3 characters')
        .custom(value => {
            return !value.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)
        })
        .withMessage('Username must not contain special chars like: `!@#$%^&*()_+-=[]{};\':"|,.<>/?~]'),
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json(errors)
            }

            const {login, password} = req.body
            const user = await User.findOne({login})

            if (user) {
                const isPasswordsEqual = bcrypt.compareSync(password, user.password)

                if (isPasswordsEqual) {
                    res.status(200).send(signJwtToken({
                        role: user.role,
                        login: user.login,
                        _id: user._id
                    }))
                } else {
                    res.status(401).json({
                        error: 'Passwords are not the same, try again please'
                    })
                }
            } else {
                const usersCollection = await User.find()

                const newUser = new User({
                    login,
                    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
                    role: !usersCollection.length ? 'admin' : 'user'
                })

                await newUser.save()

                const token = signJwtToken({
                    role: newUser.role,
                    login: newUser.login,
                    _id: newUser._id
                })

                res.status(201).json({
                    token,
                    msg: !usersCollection.length ? 'You are now admin of the chat' : 'You successfully created account'
                })
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
