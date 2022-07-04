const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const usersController = {
  createUser: async (req, res) => {
    const { email, password } = req.body
    const passwordHasheado = bcryptjs.hashSync(password, 10)
    if (!email || !password)
      return res.status(400).json({ success: false, response: "Los campos email y password son obligatorios" })

    newUser = new User({ email, password: passwordHasheado })
    newUser.save()
      .then(newUserSaved => res.status(201).json({ success: true, response: { newUser: {...newUserSaved._doc, token: jwt.sign({ ...newUserSaved }, process.env.SECRET_KEY, {}) }} }))
      .catch(err => res.status(400).json({ success: false, response: err }))

  },

  signIn: async (req, res) => {
    const { email, password } = req.body
    const userExists = await User.findOne({ email })
    if (!userExists)
      return res.status(400).json({ success: false, message: 'Email y/o contraseña incorrectos.' })
    
      const passwordMatches = bcryptjs.compareSync(password, userExists.password)
    if (!passwordMatches)
      return res.status(400).json({ success: false, message: 'Email y/o contraseña incorrectos.' })

    let token = jwt.sign({ ...userExists }, process.env.SECRET_KEY, {})
    return res.status(201).json({ success: true, response: { token, email: userExists.email, id: userExists._id } })
  },

  allUsers: (req, res) => {
    User.find()
      .then(users => res.status(200).json({ success: true, response: users }))
      .catch(error => res.status(400).json({ success: false, error }))
  },
}

module.exports = usersController
