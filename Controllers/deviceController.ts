import { deviceDetails } from "../models/Device"

const getDeviceDetails = async (req: any, res: any) => {
  const { particle } = req.params
  const { toDate, fromDate } = req.body
  console.log(particle, toDate, fromDate)
  const query = (fromDate && toDate) ? {
    t: {
      $gte: fromDate,
      $lt: toDate
    }
  } : {}

  const deviceData: any = await deviceDetails.find(query, {
    _id: 1,
    device: 1,
    t: 1,
    w: 1,
    h: 1,
    ...particle === "p1" ? { p1: 1 } : particle === "p10" ? { p10: 1 } : { p25: 1 },
  })

  if (!deviceData) {
    res.status(400).json({ message: "Data not found" })
  }

  res.status(200).send({ data: deviceData })
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