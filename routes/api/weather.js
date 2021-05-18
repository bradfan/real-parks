const router = require("express").Router();
const weatherController = require("../../controllers/weatherController");

// Matches with "/api/posts"
router.route("/").get(weatherController.renderHTML);

module.exports = router;
