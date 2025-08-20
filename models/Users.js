import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    profilepic: { type: String, default: "https://i.imgur.com/your-default-profilepic.png" },
    coverpic: { type: String, default: "https://i.imgur.com/your-default-coverpic.png" },
    githubId: { type: String, sparse: true }, // Add this to track GitHub users
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || model("User", UserSchema);