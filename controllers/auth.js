import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// register user
export const register = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, picturePath } =
      req.body;
    // incorrect information
    if (!firstName && !lastName && !username && !email && !password &&!picturePath) {
      return res.status(500).json({message: "Please Fill all the required fields"})
    }
    console.log(username, email)
    
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const passwordHashed = bcrypt.hashSync(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: passwordHashed,
      picturePath,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ msg: "user doesnot exist" });
    }
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Password moesnot matches" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(200).json({ message: err.message });
  }
};
