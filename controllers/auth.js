import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { joiUserSchema } from "../middleware/auth.js";
import User from "../models/User.js";

// register user
export const register = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, picturePath } =
      req.body;
    // JOI validation
    console.log(req.body)
    await joiUserSchema.validateAsync({
      firstname: firstName,
      lastname: lastName,
      username: username,
      email: email,
      password: password,
    });
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
    res.status(201).json({ message: "User Registered", user: savedUser });
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "user doesnot exist" });
    }
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Please enter the correct password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    user.password = "";
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(200).json({ message: err.message });
  }
};
