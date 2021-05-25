const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const parkSchema = new Schema({
  user_id: { type: String },
  name: { type: String },
  description: { type: String },
  directions: { type: String },
  designation: { type: String },
  city: { type: String },
  image0: { type: [String] },
  image1: { type: [String] },
  image2: { type: [String] },
  image3: { type: [String] },
  alt0: { type: String },
  alt1: { type: String },
  alt2: { type: String },
  alt3: { type: String },
  activity0: { type: String},
  activity1: { type: String},
  activity2: { type: String},
  activity3: { type: String},
  activity4: { type: String},
  weather: { type: String },
  topic0: { type: String },
  topic1: { type: String },
  topic2: { type: String },
  phone: { type: String},
  email: { type: String},
  
});

const Park = mongoose.model("Park", parkSchema);

module.exports = Park;


