const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')


const register = async (req, res) => {
  const user = await User.create({...req.body})
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({user: {name: user.name}, token})
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Email and password are required')
  }

  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid email or password')
  }

  const isValidPassword = await user.comparePassword(password)
  if (!isValidPassword) {
    throw new UnauthenticatedError('Invalid email or password')
  }

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({user: {name: user.name}, token})
}

module.exports = {
  register, 
  login
}