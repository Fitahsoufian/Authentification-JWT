const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
//   image_cover: {
//     type: ui,
//     required: true,
//   },
//   images : {
//     type: ui,
//     required: true,
//   },
  stars : {
    type: String,
    required: true,
  },
  status : {
    type: String,
    required: true,
  },
//   user_id : {
//     type: INT,
//     required: true,
//   }
});

const Hotel = mongoose.model("Hotel", HotelSchema);

module.exports = Hotel;