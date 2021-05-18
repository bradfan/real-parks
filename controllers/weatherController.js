const db = require("../models");

module.exports = {
  renderHTML: (req, res) => {
    db.Weather.find(req.query)
      .sort({ temp })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(500).json(err));
  },
};
