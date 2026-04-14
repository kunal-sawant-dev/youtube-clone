import mongoose from "mongoose";

const commentschema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    videoid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "videofiles",
      required: true,
    },

    commentbody: {
      type: String,
      required: true,
    },

    usercommented: {
      type: String,
      required: true,
    },

    // New Feature — City Name
    city: {
      type: String,
      default: "Unknown",
    },

    // Like Feature
    likes: {
      type: Number,
      default: 0,
    },

    // Dislike Feature
    dislikes: {
      type: Number,
      default: 0,
    },

    commentedon: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("comment", commentschema);