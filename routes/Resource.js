import express from "express";
import {  getAllResources, getSingleResource,fetchLectures, fetchLecture, fetchPDFs, fetchPDF, getMyResources } from "../controllers/Resource.js";
import { isAuth } from "../middlewares/isAuth.js";
const router = express.Router();

router.get("/Resource/all", getAllResources);
router.get("/Resource/:id", getSingleResource);
router.get("/lectures/:id", isAuth, fetchLectures);
router.get("/lecture/:id", isAuth, fetchLecture);
router.get("/myresource", isAuth, getMyResources);
router.get("/pdfs/:id", isAuth, fetchPDFs);
router.get("/pdf/:id", isAuth, fetchPDF);

export default router;
