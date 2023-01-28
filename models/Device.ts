import mongoose, { model, Schema } from "mongoose";
interface DeviceDetails {
  device: String
  t: String
  w: String
  h: String
  p1: String
  p25: String
  p10: String
}
const deviceData = new Schema<DeviceDetails>({
  device: { type: String, require: true },
  t: { type: String, require: true },
  w: { type: String, require: true },
  h: { type: String, require: true },
  p1: { type: String, require: true },
  p25: { type: String, require: true },
  p10: { type: String, require: true },
})

export const deviceDetails = model<DeviceDetails>("deviceData", deviceData)

