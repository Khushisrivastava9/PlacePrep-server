import express from "express";
import { isAdmin, isAuth } from "../middlewares/isAuth.js";
import { uploadFiles, uploadPDF } from "../middlewares/multer.js";
import { addLectures, addPDF, createResource, deleteLecture, deletePDF, deleteResource, getAllStats, getAllUser } from "../controllers/admin.js";

const router = express.Router();

router.post("/Resource/new", isAuth, isAdmin, uploadFiles, createResource);
router.post("/Resource/:id", isAuth, isAdmin, uploadFiles, addLectures);
router.post("/Resource/:id/upload-pdf", isAuth, isAdmin, uploadPDF, addPDF);
router.delete("/resource/:id", isAuth, isAdmin, deleteResource);
router.delete("/lecture/:id", isAuth, isAdmin, deleteLecture);
router.delete("/pdf/:id", isAuth, isAdmin, deletePDF); 
router.get("/stats", isAuth, isAdmin, getAllStats);
router.get("/users", isAuth, isAdmin, getAllUser);

export default router;