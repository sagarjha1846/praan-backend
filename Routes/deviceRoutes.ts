import { Router } from "express";
import { getDeviceDetails, uploadCSVData } from "../Controllers/deviceController";
import multer from "multer"
import { authMiddleware } from "../Middleware/validateUser";
const router = Router()

var upload = multer({ dest: 'uploads/' });

router.get("/device-details", authMiddleware, getDeviceDetails)

router.post("/upload-data", authMiddleware, upload.single("file"), uploadCSVData)

export default router