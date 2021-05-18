const router = require("express").Router();
const parkController = require("../../controllers/parkController");

// Matches with "/api/posts"
router
  .route("/api/parks")
  .get(parkController.findAll)
  .post(parkController.create);
router.route("/api/parks/:id").delete(parkController.delete);

module.exports = router;
