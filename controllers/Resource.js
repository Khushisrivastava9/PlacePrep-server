import TryCatch from "../middlewares/TryCatch.js";
import { Lecture } from "../models/Lecture.js";
import { PDF } from "../models/PDF.js";
import { Resources } from "../models/Resources.js";
import { User } from "../models/User.js";

export const getAllResources = TryCatch(async (req, res) => {
    const resources= await Resources.find();
    res.json({
      resources,
    });
});

export const getSingleResource = TryCatch(async (req, res) => {
    const resource = await Resources.findById(req.params.id);
    res.json({
      resource,
    });
  });

  export const fetchLectures = TryCatch(async (req, res) => {
    const lectures = await Lecture.find({ Resource: req.params.id });
    if (!lectures.length) {
      return res.status(404).json({ message: "No lectures found for this resource." });
    }
    const user = await User.findById(req.user._id);
  
    if (user.role === "admin") {
      return res.json({ lectures });
    }
  
    res.json({ lectures });
  });
  
  export const fetchLecture = TryCatch(async (req, res) => {
    const lecture = await Lecture.findById(req.params.id);
    if (!lecture) {
      return res.status(404).json({ message: "No lecture found for this resource." });
    }
    const user = await User.findById(req.user._id);
  
    if (user.role === "admin") {
      return res.json({ lecture });
    }
  
    res.json({ lecture });
});

export const getMyResources = TryCatch(async (req, res) => {
  const resources = await Resources.find(req.params.id);

  res.json({
    resources,
  });
});

export const fetchPDFs = TryCatch(async (req, res) => {
  const pdfs = await PDF.find({ Resource: req.params.id });
  if (!pdfs.length) {
    return res.status(404).json({ message: "No PDFs found for this resource." });
  }
  res.json({ pdfs });
});

// Fetch a single PDF by its ID
export const fetchPDF = TryCatch(async (req, res) => {
  const pdf = await PDF.findById(req.params.id);
  if (!pdf) {
    return res.status(404).json({ message: "No PDF found with this ID." });
  }
  res.json({ pdf });
});