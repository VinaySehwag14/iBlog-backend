const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      min: 4,
      max: 50,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: Buffer,
      contentType: String,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", PostSchema);
