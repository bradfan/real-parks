const db = require("../models");
const jwt = require("jsonwebtoken");

function decodeToken(req) {
  const auth = req.headers.authorization;
  console.log("auth:", auth);
  const token = auth.split(" ")[1];
  const userData = jwt.decode(token);
  console.log("userData:", userData);
  return userData;
}

module.exports = {
  findAll: function (req, res) {
    const userData = decodeToken(req);
    db.Park.find({
      user_id: userData.id,
    })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  create: function (req, res) {
    console.log("/api/parks/create", req.body);
    const userData = decodeToken(req);
    const parkToSave = {
      ...req.body,
      user_id: userData.id,
    };
    console.log("park to save", parkToSave);
    db.Park.findOne({
      directions: req.body.directions,
    })
      .then((item) => {
        // console.log("item:", item);
        if (item) {
           res.status(200).send("Already Saved!")
        } else {
          // createNew
          db.Park.create(parkToSave)
            .then((dbModel) => res.json(dbModel))
            .catch((err) => res.status(422).json(err));
        }
      })

      .catch((err) => res.status(422).json(err));
  },

  delete: function (req, res) {
    const userData = decodeToken(req);
    db.Park.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findOne: function (req, res) {
    const userData = decodeToken(req);
    const parkToView = {
      ...req.body,
      user_id: userData.id,
    };
    db.Park.findById({ parkToView })
      .then((dbModel) => dbModel.create())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  // create a new function "findOne" "get route" for one park based on park id, find the one park send it to the front findById function out of mongoose
};
