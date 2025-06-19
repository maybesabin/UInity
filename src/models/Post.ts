import mongoose from "mongoose";

const PostModel = new mongoose.Schema({
    title: { type: String, required: [true, "Title is required"] },
    description: { type: String, },
    code: { type: String, required: [true, "Code is required"] },
    upvotes: { type: Number, default: 0 },
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: [true, "User is required"] },
    upvotedBy: [{ type: mongoose.Schema.ObjectId, ref: "User" }]
}, {
    timestamps: true
})

if (mongoose.models.Post) {
    delete mongoose.models.Post;
}

const Post = mongoose.model("Post", PostModel)

export default Post