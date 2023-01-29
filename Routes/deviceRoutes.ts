import { Router } from "express";
import { getDeviceDetails, uploadCSVData } from "../Controllers/deviceController";
import multer from "multer"
const router = Router()

var upload = multer({ dest: 'uploads/' });

router.get("/device-details", getDeviceDetails)

router.post("/upload-data", upload.single("file"), uploadCSVData)


export default router