import csv from "csvtojson";

const csvConvertor = (csvFilePath: any) => {
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      return jsonObj
    })
};

export default csvConvertor;
