const mongoose = require('mongoose');
const validator = require('validator');
const bcyrpt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validator: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  },
  subscriptions: [
    {
      nameOfService: {
        type: String,
        required: [true, 'A subscription must have a name'],
        trim: true,
        maxLength: [20, 'Please enter less than 21 characters.']
      },
      amount: {
        type: Number,
        required: [true, 'A subscription must have an amount']
      },
      monthly: {
        type: String,
        required: [true, 'Please enter monthly/yearly'],
        enum: {
          values: ['Monthly', 'monthly', 'Yearly', 'yearly'],
          message: 'Please enter Monthly or Yearly'
        }
      },
      dueDate: {
        type: Date,
        required: [true, 'Please enter the payment due date']
      }
    }
  ]
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcyrpt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcyrpt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
