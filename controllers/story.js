// import User from "../models/User.js";
import Story from "../models/story.js";

export const createStory = async (req, res) => {
  try {
    const { storyDescription, storyPicture, storyVideo, userId } = req.body;
    // const user = await User.findById(userId);
    const newStory = new Story({
      storyDescription,
      storyPicture,
      storyVideo,
      userId,
    });
    await newStory.save();
    res.status(200).json({ message: "Stroy sucessfully uplaoded" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const userStory = async(req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.find({userId:id});
    res.status(200).json({story})
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllStories = async(req, res) => {
  try{
    const stories = await Story.find();
    res.status(200).json({stories})

  } catch(err){
    res.status(500).json({message:err.message})
  }
}
