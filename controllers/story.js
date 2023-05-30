import User from "../models/User.js";
import Story from "../models/story.js";

export const createStory = async (req, res) => {
  try {
    const { storyDescription, userId } = req.body;
    const path = req.file;
    const mediaPath = path.destination.concat("/" + path.originalname);
    const user = await User.findById(userId);
    const newStory = new Story({
      storyDescription,
      media: mediaPath,
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      userPicturePath: user.picturePath,
    });
    await newStory.save();
    console.log(newStory);
    const story = await Story.find()
    res.status(200).json({story});
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
    const stories = await Story.find({isPublic: true});
    res.status(200).json({ stories });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const upvote = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const story = await Story.findById({ _id: id });
    const isUpvoted = story.upVotes.get(userId);
    console.log(isUpvoted)
    if (isUpvoted) {
      story.upVotes.delete(userId);
      story.totalUpvotes -= 1;
    } else {
      story.upVotes.set(userId, true);
      story.totalUpvotes += 1;
    }
    console.log(story.totalUpvotes)
    const updatedStory = await Story.findByIdAndUpdate(
      id,
      { upVotes: story.upVotes,
      totalUpvotes: story.totalUpvotes },
      { new: true }
    );
    res.status(200).json(updatedStory)
  } catch (err) {
    res.status(200).json({ message: err.message });
  }
};

export const downvotes = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const story = await Story.findById({ _id: id });
    const isDownvoted = story.downVotes.get(userId);
    console.log(isDownvoted)
    if (isDownvoted) {
      story.downVotes.delete(userId);
      story.totalDownvotes -= 1;
    } else {
      story.downVotes.set(userId, true);
      story.totalDownvotes += 1;
    }
    console.log(story.totalDownvotes)
    const updatedStory = await Story.findByIdAndUpdate(
      id,
      { downVotes: story.downVotes,
      totalDownvotes: story.totalDownvotes },
      { new: true }
    );
    res.status(200).json(updatedStory)
  } catch (err) {
    res.status(200).json({ message: err.message });
  }
};

export const trendingStories = async (req, res) => {
  try {
    const trendingStories = await Story.find({isPublic:true}).sort([
      ["totalUpvotes", -1],
      ["createdAt", -1],
    ]);
    res.status(200).json({ trendingStories });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const publicStory = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findById({ _id: id });
    story.isPublic = true;
    story.save();
    res.status(200).json({ message: "story is public" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const privateStory = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findById({ _id: id });
    story.isPublic = false;
    story.save();
    res.status(200).json({ message: "story is private" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
