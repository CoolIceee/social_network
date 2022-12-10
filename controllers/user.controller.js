const Users = require('../models/Users.model')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')
const Friends = require('../models/Friends.model')
const OutgoingRequests = require('../models/OutgoingRequests.model')
const jwtDecode = require('jwt-decode')

module.exports.userController = {
  registerUser: async (req, res) => {
    try {
      const { email, login, password } = req.body
      const candidateEmail = await Users.findOne({ email })
      const candidateLogin = await Users.findOne({ login })
      const errors = validationResult(req)
     
      if (candidateEmail || candidateLogin) {
        return res
          .status(400)
          .json({ error: 'Пользователь с такими данными уже существует' })
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ error: 'пароль не может быть меньше 6 символов' })
      }

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          error: 'Некоректные данные при регистрации',
        })
      }

      const hash = await bcrypt.hash(password, config.get('bcrypt'))
      await Users.create({
        email,
        login,
        password: hash,
        logoUser: 'avatar.png',
      })

      const candidate = await Users.findOne({ login })
      const payload = {
        id: candidate._id,
        login: candidate.login,
      }
      const token = await jwt.sign(payload, config.get('SecretKay'), {
        expiresIn: '24h',
      })
      await Friends.create({
        user: payload.id,
        friends: [],
      })
      res.json({ token })
    } catch (err) {
      res.status(404).json({ error: 'что-то пошло не так, повторите попытку!' })
    }
  },

  loginUser: async (req, res) => {
    try {
      const { login, password } = req.body
      const candidate = await Users.findOne({ login })

      if (!candidate) {
        return res.status(401).json({ error: 'Некорректныe данные' })
      }

      const valid = await bcrypt.compare(password, candidate.password)

      if (!valid) {
        return res.status(401).json({ error: 'Некорректныe данные' })
      }

      const payload = {
        id: candidate._id,
        avatar: candidate.logoUser,
        login: candidate.login,
        avatarUrl: candidate.logoUser,
      }

      const token = await jwt.sign(payload, config.get('SecretKay'), {
        expiresIn: '24h',
      })

      return res.json({ token })
    } catch (err) {
      res.status(404).json({ error: 'что-то пошло не так, повторите попытку!' })
    }
  },
  getUsers: async (req, res) => {
    try {
      const dataUsers = await Users.find()
      res.json(dataUsers)
    } catch (err) {
      res.status(404).json({ error: 'что-то пошло не так, повторите попытку!' })
    }
  },
  getMyData: async (req, res) => {
    try {
      const data = await Users.findById(req.user.id).populate('friends')
      
    
      const array = [data]
      res.json(array)
    } catch {
      res.status(404).json({ error: 'что-то пошло не так, повторите попытку!' })
    }
  },
}
