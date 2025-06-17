import mongoose from "mongoose";

const PostModel = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }
    ,
    code: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        required: true,
        default: 0
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    upvotedBy: [{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }]
}, {
    timestamps: true
})

if (mongoose.models.Post) {
    delete mongoose.models.Post;
}

const Post = mongoose.model("Post", PostModel)

export default Post