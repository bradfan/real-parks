const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const parkSchema = new Schema({
  user_id: { type: String },
  name: { type: String },
  description: { type: String },
  directions: { type: String },
  image: { type: [String] },
  designation: { type: String },
  alt: { type: String },
  city: { type: String },
});

const Park = mongoose.model("Park", parkSchema);

module.exports = Park;


