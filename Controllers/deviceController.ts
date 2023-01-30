import { deviceDetails } from "../models/Device"
import csv from "csvtojson"

const getDeviceDetails = async (req: any, res: any) => {
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const particle = req.query.particle ? req.query.particle : "p1";
    const toDate = req.query.toDate ? req.query.toDate : "";
    const fromDate = req.query.fromDate ? req.query.fromDate : "";

    const query = (fromDate && toDate) ? {
      t: {
        $gte: fromDate,
        $lt: toDate
      }
    } : {}

    const count = await deviceDetails.count()
    const deviceData: any = await deviceDetails.find(query, {
      _id: 1,
      device: 1,
      t: 1,
      w: 1,
      h: 1,
      ...particle == "p1" ? { p1: 1 } : particle == "p10" ? { p10: 1 } : { p25: 1 },
    }).limit(pageSize).skip(pageSize * page);

    if (!deviceData) {
      res.status(400).json({ message: "Data not found" })
    }

    res.status(200).send({ data: deviceData, count })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" })
  }

}


const uploadCSVData = async (req: any, res: any) => {
  try {
    const data: any[] = []

    csv().fromFile(req.file.path).then(result => {

      data.push(...result)
      deviceDetails.insertMany(result).then(function () {
        res.status(200).send({
          message: "Successfully Uploaded!"
        });
      }).catch(function (error) {
        res.status(500).send({
          message: "failure",
          error
        });
      });
    })

  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" })
  }

}

export {
  getDeviceDetails,
  uploadCSVData
}