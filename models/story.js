import mongoose, { Schema } from "mongoose";

const StorySchema = mongoose.Schema(
  {
    storyDescription: {
      type: String,
    },
    fontStyle: {
      type: String,
      default: ""
    },
    media: {
      type: String,
      default: "",
    },
    upVotes: {
      type: Map,
      of: Boolean,
      default: {}
    },
    totalUpvotes: {
      type: Number,
      default: 0,
    },
    downVotes: {
      type: Map,
      of: Boolean,
      default: {}
    },
    totalDownvotes: {
      type: Number,
      default: 0,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userPicturePath: String,
    isPublic: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Story = mongoose.model("Story", StorySchema);
export default Story;
