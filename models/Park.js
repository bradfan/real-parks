const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// framework of a model from book hw - need info from api object to complete correctly
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

/*
  axios.get('https://api.example.com')
  .then((response) => {
    Post.create({
      title: response.post_title,
    })
  })
  

*/
