import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  Resource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resources",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const PDF = mongoose.model("PDF", schema);