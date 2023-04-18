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

export const userStory = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.find({ userId: id });
    res.status(200).json({ story });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find();
    res.status(200).json({ stories });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const upvote = async (req, res) => {
  try {
    const { storyId, userId } = req.body;
    const story = await Story.findById({ _id: storyId });
    const upvotes = story.upVotes.filter((user) => user === userId);
    if (upvotes.length === 1) {
      const newVotes = story.upVotes.filter((user) => user !== userId);
      story.upVotes = newVotes;
      story.totalUpvotes -= 1;
      await story.save();
      console.log(story.upVotes);
      res.status(200).json({ message: "you upvotes is removed" });
    } else {
      story.upVotes.push(userId);
      story.totalUpvotes += 1;
      await story.save();
      console.log(story.upVotes);
      res.status(200).json({ message: "you have upvoted the story" });
    }
  } catch (err) {
    res.status(200).json({ message: err.message });
  }
};

export const downvotes = async (req, res) => {
  try {
    const { storyId, userId } = req.body;
    const story = await Story.findById({ _id: storyId });
    const downvotes = story.downVotes.filter((user) => user === userId);
    if (downvotes.length === 1) {
      const newVotes = story.downVotes.filter((user) => user !== userId);
      story.downVotes = newVotes;
      story.totalDownvotes -= 1;
      story.save();
      console.log(story.downVotes);
      res.status(200).json({ message: "your downvote is removed" });
    } else {
      story.downVotes.push(userId);
      story.totalDownvotes += 1;
      story.save();
      console.log(story.downVotes);
      res.status(200).json({ message: "you have downvoted the story" });
    }
  } catch (err) {
    res.status(200).json({ message: err.message });
  }
};
