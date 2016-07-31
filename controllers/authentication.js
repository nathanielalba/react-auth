const User = require('../models/user');

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if(err) { return next(err) };

    if(!email || !password) {
      return res.status(422).send({ error: 'You must provide an email and password' });
    }

    // if a user with email does exist, return an error
    if(existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // if a user with email does not exist, create and save user record
    const user = new User({
      email: email,
      password: password
    });

    // respond to request indicating the user was created
    user.save(function(err) {
      if (err) { return next(err); }

      res.json({ success: 'true' });
    });
  });
}
