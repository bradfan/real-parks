const router = require("express").Router();
const parkController = require("../../controllers/parkController");

// Matches with "/api/posts"
router
  .route("/api/parks")
  .get(parkController.findAll)
  .post(parkController.create)
  
router
.route("/api/parks/:id").delete(parkController.delete) 
// .get(parkController.findOne)

module.exports = router;

// in the create route check to see if the park already exists and if it does don't insert. Build function within line 8
