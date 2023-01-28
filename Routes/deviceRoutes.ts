import { Router } from "express";
import { getDeviceDetails, uploadCSVData } from "../Controllers/deviceController";

const router = Router()

router.get("/device-details/:particle", getDeviceDetails)

router.post("/upload-data", uploadCSVData)


export default router