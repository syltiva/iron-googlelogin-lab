const bcrypt =  require('bcrypt');
const { generateJwt } = require('../helpers/processJwt');
const User =  require("../models/User");

const signUpUser = async (req, res) => {
  const { email } = req.body;
  const testEmail = await User.findOne({email});
  if (testEmail) {
    return res.status(500).json({message: "Couldn't create user"});
  }
  const user = new User(req.body);
  try {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(req.body.password, salt);
    user.save();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({message: "Couldn't create user"});
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({email});
  if (!user) {
    return res.status(500).json({message: "Please check credentials"}) // user is not found
  }
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(500).json({message: "Please check credentials"});
  }
  const token = await generateJwt(user._id);
  return res.status(200).json({user, token});
}

const googleLogin = async (req, res) => {
  const {email, name} = req.body;
  let user = await User.findOne({email});
  if (!user) {
    user = await User.create({
      email: email, 
      name: name, 
      password: "P", 
      google: true
    });
  }
  try {
    const token = await generateJwt(user._id);
    return res.status(200).json({user, token})
  } catch (error) {
    return res.status(500).json({message: "User was not able to Log In"});
  }
};

module.exports = {
  signUpUser,
  loginUser,
  googleLogin
}