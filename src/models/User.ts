import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    username: { type: String, required: [true, "Username is required"], minLength: 5 },
    name: { type: String, required: [true, "Name is required"], minLength: 5 },
    email: { type: String, required: [true, "Email is required"], minLength: 10 },
    imageUrl: { type: String },
    password: { type: String, required: [true, "Password is required"], minLength: 5 },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true }]
}, {
    timestamps: true
})

if (mongoose.models.User) {
    delete mongoose.models.User;
}

const User = mongoose.model("User", UserModel);

export default User;