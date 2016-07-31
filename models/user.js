const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String }
});

userSchema.pre('save', function(next) {
  // the user var is for an instance of userSchema
  const user = this;

  // bcrypt here will just create the salt needed for the password, it takes error and the salt produced
  bcrypt.genSalt(10, function(err, salt) {
    if(err) { return next(err); }

    // here bcrypt actually uses the salt with the password. it takes the item you want hashed, the salt you want to use, null(idk), and a cb
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if(err) { return next(err) };

      // assign the password to the user object and it's good.
      user.password = hash;
      next();
    });
  });
});

// Create the model class
const ModelClass = mongoose.model('user', userSchema);


// Export the model
module.exports = ModelClass;
