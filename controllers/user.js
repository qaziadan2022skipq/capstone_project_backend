import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userFound = await User.findById(id);
    console.log(userFound);
    res.status(200).json(userFound);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// export const getUserStory = () => {
//   console.log("Hello");
// };
