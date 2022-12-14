const sharp = require("sharp");
const ExifImage = require("exif").ExifImage;

const getCoordinates = (imgFile) => {
  return new Promise((resolve, reject) => {
    try {
      // TODO: Use node-exif to get longitude and latitude from imgFile
      // coordinates below should be an array of GPS coordinates in decimal format: [longitude, latitude]
      new ExifImage({ image: imgFile }, (error, exifData) => {
        let coordinates;
        if (error) {
          console.log("Error: " + error.message);
        } else {
          if (exifData.gps.GPSLongitude) {
            const decimalLon = gpsToDecimal(
              exifData.gps.GPSLongitude,
              exifData.gps.GPSLongitudeRef
            );
            const decimalLat = gpsToDecimal(
              exifData.gps.GPSLatitude,
              exifData.gps.GPSLatitudeRef
            );
            coordinates = [decimalLon, decimalLat];
          }
        }
        resolve(coordinates);
      });
    } catch (error) {
      reject(error);
    }
  });
};

// convert GPS coordinates to decimal format
// for longitude, send exifData.gps.GPSLongitude, exifData.gps.GPSLongitudeRef
// for latitude, send exifData.gps.GPSLatitude, exifData.gps.GPSLatitudeRef
const gpsToDecimal = (gpsData, hem) => {
  let d =
    parseFloat(gpsData[0]) +
    parseFloat(gpsData[1] / 60) +
    parseFloat(gpsData[2] / 3600);
  return hem === "S" || hem === "W" ? (d *= -1) : d;
};

const makeThumbnail = async (file, thumbname) => {
  await sharp(file)
    .resize(160)
    .png()
    .toFile("./thumbnails/" + thumbname);
};

module.exports = {
  getCoordinates,
  makeThumbnail,
};
