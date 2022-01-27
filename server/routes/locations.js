const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const authValidator = require("../utils/utils");
const Location = require("../model/Location");
const Event = require("../model/Event");

router.post(
  "/",
  [
    check("location", "Please enter a valid location").not().isEmpty()
  ],
  authValidator,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { location } = req.body;
    try {
      let locationDoc = new Location({
        location
      });

      await locationDoc.save();
      res.status(200).json({
        success: true
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    Location.find({}, function(err, locations) {
      res.json(locations);
    });
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});


router.delete("/:id", authValidator, async (req, res) => {
  try {
    Location.findByIdAndDelete(req.params.id, function (err) {
      if (err) throw err;
      res.status(200).json({success: true});
    });
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});


module.exports = router;
