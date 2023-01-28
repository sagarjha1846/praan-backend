import { deviceDetails } from "../models/Device"

const getDeviceDetails = async (req: any, res: any) => {

  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const particle = req.query.particle ? req.query.particle : "p1";
  const toDate = req.query.toDate ? req.query.toDate : "";
  const fromDate = req.query.fromDate ? req.query.fromDate : "";
  console.log(particle, pageSize, page, toDate, fromDate)
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
}


const uploadCSVData = async (req: any, res: any) => {
  const data = req.body
  const dataInserted = await deviceDetails.insertMany(req.body)

  if (dataInserted) {
    res.status(200).json({
      message: "Data Inserted"
    })
  }

  res.status(400).json({ message: "Data not found" })
}

export {
  getDeviceDetails,
  uploadCSVData
}