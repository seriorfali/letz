var mongoose = require('mongoose')
  , bcrypt = require('bcrypt-nodejs')
  , Schema = mongoose.Schema

// Schema for local and Facebook users.
var userSchema = new Schema({
    local: {
      email: {type: String, required: true,  unique: true},
      password: {type: String, required: true},
      first_name: String,
      last_name: String,
      dob: {type: Date, required: true, default: new Date()},
      status: String
    },
    facebook: {
      id: String,
      name: String,
      email: String,
      token: String
    }
})

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validPassword = function(password) {
  var user = this
  return bcrypt.compareSync(password, user.local.password)
}

var User = mongoose.model('User', userSchema)

module.exports = User
