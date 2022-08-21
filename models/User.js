import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please provide name'],
    minLength: 3,
    maxLength: 20,
    trim: true,
  },

  email: {
    type: String,
    required: [true, 'please provide email'],
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: 'please provide valid email',
    },
    unique: true,
  },

  password: {
    type: String,
    required: [true, 'please provide password'],
    minLength: 6,
    trim: true,
    select: false,
  },

  lastName: {
    type: String,
    maxLength: 50,
    trim: true,
    default: 'test',
  },

  location: {
    type: String,
    trim: true,
    default: 'India',
  },
})

// jason web token set up
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
}

// password comparison for the login
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

UserSchema.pre('save', async function () {
  // this.modifiedPaths will return an array of modified fields
  // console.log(this.modifiedPaths())

  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})
export default mongoose.model('User', UserSchema)
