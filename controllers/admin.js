import TryCatch from "../middlewares/TryCatch.js";
import { Lecture } from "../models/Lecture.js";
import { Resources } from "../models/Resources.js";
import { User } from "../models/User.js";
import { rm } from "fs";
import { promisify } from "util";
import fs from "fs";
import { PDF } from "../models/PDF.js";

const unlinkAsync = promisify(fs.unlink);

export const createResource = TryCatch(async (req, res) => {
  const { title, description, category, createdBy} = req.body;
  const image = req.file;

  await Resources.create({
    title,
    description,
    category,
    createdBy,
    image: image?.path,
  });

  res.status(201).json({
    message: "Resource Created Successfully",
  });
});

export const addLectures = TryCatch(async (req, res) => {
  const resource = await Resources.findById(req.params.id);

  if (!resource)
    return res.status(404).json({
      message: "No Resource with this id",
    });

  const { title, description } = req.body;
  const file = req.file;

  const lecture = await Lecture.create({
    title,
    description,
    video: file?.path,
    Resource: resource._id,
  });

  res.status(201).json({
    message: "Lecture Added",
    lecture,
  });
});

export const deleteLecture = TryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  rm(lecture.video, () => {
    console.log("Video deleted");
  });

  await lecture.deleteOne();

  res.json({ message: "Lecture Deleted" });
});

export const addPDF = TryCatch(async (req, res) => {
  const resource = await Resources.findById(req.params.id);

  if (!resource)
    return res.status(404).json({
      message: "No Resource with this id",
    });

  const { title, description } = req.body;
  const file = req.file;

  const pdf = await PDF.create({
    title,
    description,
    fileUrl: file?.path, 
    Resource: resource._id,
  });

  res.status(201).json({
    message: "PDF Added",
    pdf,
  });
});




export const deletePDF = TryCatch(async (req, res) => {
  const pdf = await PDF.findById(req.params.id);

  if (!pdf) {
    return res.status(404).json({ message: "PDF not found" });
  }

  await unlinkAsync(pdf.fileUrl);
  console.log("PDF file deleted");

  await pdf.deleteOne();

  res.json({ message: "PDF Deleted" });
});


export const deleteResource = TryCatch(async (req, res) => {
  const resource = await Resources.findById(req.params.id);

  if (!resource) {
    return res.status(404).json({ message: "Resource not found" });
  }

  const lectures = await Lecture.find({ Resource: resource._id });
  const pdfs = await PDF.find({ Resource: resource._id });

  await Promise.all(
    lectures.map(async (lecture) => {
      await unlinkAsync(lecture.video);
      console.log("video deleted");
    })
  );
  await Promise.all(
    pdfs.map(async (pdf) => {
      await unlinkAsync(pdf.fileUrl);
      console.log("PDF file deleted");
    })
  );

  if (resource.image) {
    rm(resource.image, () => {
      console.log("image deleted");
    });
  }

  await Lecture.deleteMany({ Resource: resource._id });
  await PDF.deleteMany({ Resource: resource._id });
  await resource.deleteOne();

  res.json({
    message: "Resource Deleted",
  });
});

export const getAllStats = TryCatch(async (req, res) => {
  const totalResources = (await Resources.find()).length;
  const totalLectures = (await Lecture.find()).length;
  const totalUsers = (await User.find()).length;
  const totalPDFs = (await PDF.find()).length;

  const stats = {
    totalResources,
    totalLectures,
    totalUsers,
    totalPDFs,
  };

  res.json({
    stats,
  });
});
export const getAllUser = TryCatch(async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user._id } }).select(
    "-password"
  );

  res.json({ users });
});

