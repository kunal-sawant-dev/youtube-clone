import comment from "../Modals/comment.js";
import mongoose from "mongoose";
import axios from "axios";



// Post Comment
export const postcomment = async (req, res) => {
  const { userid, videoid, commentbody, usercommented } = req.body;

  // Block Special Characters
  const regex = /^[a-zA-Z0-9\s.,!?]+$/;

  if (!regex.test(commentbody)) {
    return res.status(400).json({
      message: "Special characters not allowed",
    });
  }

  try {

    // Get City
    const location = await axios.get("https://ipapi.co/json/");
    const city = location.data.city;

    const postcomment = new comment({
      userid,
      videoid,
      commentbody,
      usercommented,
      city,
    });

    await postcomment.save();

    return res.status(200).json({ comment: true });

  } catch (error) {
    console.error("error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};



// Get All Comments
export const getallcomment = async (req, res) => {
  const { videoid } = req.params;

  try {
    const commentvideo = await comment
      .find({ videoid: videoid })
      .sort({ createdAt: -1 });

    return res.status(200).json(commentvideo);

  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};



// Delete Comment
export const deletecomment = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("comment unavailable");
  }

  try {
    await comment.findByIdAndDelete(_id);

    return res.status(200).json({ comment: true });

  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};



// Edit Comment
export const editcomment = async (req, res) => {
  const { id: _id } = req.params;
  const { commentbody } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("comment unavailable");
  }

  try {
    const updatecomment = await comment.findByIdAndUpdate(
      _id,
      {
        $set: { commentbody: commentbody },
      },
      { new: true }
    );

    res.status(200).json(updatecomment);

  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};



// Like Comment
export const likecomment = async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await comment.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    res.status(200).json(updated);

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};



// Dislike Comment
export const dislikecomment = async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await comment.findByIdAndUpdate(
      id,
      { $inc: { dislikes: 1 } },
      { new: true }
    );

    // Auto Delete after 2 dislikes
    if (updated.dislikes >= 2) {
      await comment.findByIdAndDelete(id);

      return res.status(200).json({
        message: "Comment removed due to dislikes",
      });
    }

    res.status(200).json(updated);

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};



// Translate Comment
export const translateComment = async (req, res) => {
  const { text, target } = req.body;

  try {
    const response = await axios.post(
      "https://libretranslate.de/translate",
      {
        q: text,
        source: "auto",
        target: target,
        format: "text",
      }
    );

    res.status(200).json({
      translated: response.data.translatedText,
    });

  } catch (error) {
    res.status(500).json({
      message: "Translation error",
    });
  }
};