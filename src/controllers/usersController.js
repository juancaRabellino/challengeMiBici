const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const usersController = {
  signUp: async (req, res) => {
    let errors = { details: [] }
    const { email, password } = req.body
    const userExists = await User.findOne({ email })

    userExists && errors.details.push(new Error('El nombre de usuario ya existe.'))

    let newUser, newUserSaved, token
    if (errors.details.length === 0) {
      const passwordHasheado = bcryptjs.hashSync(password, 10)
      newUser = new User({ email, password: passwordHasheado })
      newUserSaved = await newUser.save()
      token = jwt.sign({ ...newUserSaved }, process.env.SECRET_KEY, {})
    }

    return res.json({
      success: errors.details.length === 0 ? true : false,
      errors,
      response: errors.details.length === 0 && { token, email: newUserSaved.email, id: newUserSaved._id }
    })

  },

  signIn: async (req, res) => {
    const { email, password } = req.body
    const userExists = await User.findOne({ email })
    if (!userExists) {
      return res.json({ success: false, message: 'Email y/o contraseña incorrectos.' })
    }
    const passwordMatches = bcryptjs.compareSync(password, userExists.password)
    if (!passwordMatches) {
      return res.json({ success: false, message: 'Email y/o contraseña incorrectos.' })
    }
    let token = jwt.sign({ ...userExists }, process.env.SECRET_KEY, {})
    return res.json({ success: true, response: { token, email: userExists.email, id: userExists._id } })
  },

  allUsers: (req, res) => {
    User.find()
      .then(users => res.json({ success: true, response: users }))
      .catch(error => res.json({ success: false, error }))
  },
}

module.exports = usersController
