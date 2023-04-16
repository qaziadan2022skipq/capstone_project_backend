import mongoose, { Schema } from "mongoose";

const StorySchema = mongoose.Schema({
    storyDescription : {
        type: String
    },
    storyPicture:{
        type: String,
        default: ""
    },
    storyVideo:{
        type: String,
        default: ""
    },
    upVotes: {
        type: Number,
        default: 0
    },
    downVotes: {
        type: Number,
        default: 0
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps:true });

const Story = mongoose.model("Story", StorySchema);
export default Story;