import mongoose, { Schema } from "mongoose";

const StorySchema = mongoose.Schema(
  {
    storyDescription: {
      type: String,
    },
    media: {
      type: String,
      default: "",
    },
    upVotes: {
      type: Array,
      default: [],
    },
    totalUpvotes: {
      type: Number,
      default: 0,
    },
    downVotes: {
      type: Array,
      default: [],
    },
    totalDownvotes: {
      type: Number,
      default: 0,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isPublic: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Story = mongoose.model("Story", StorySchema);
export default Story;
