const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const authValidator = require("../utils/utils");
const Event = require("../model/Event");

router.post(
  "/",
  [
    check("name", "Please enter a valid name").not().isEmpty(),
    check("description", "Please enter a valid description").not().isEmpty(),
    check("date", "Please enter a valid date").not().isEmpty(),
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

    const { name, description, date, location, categories } = req.body;
    try {
      let event = new Event({
        name,
        description,
        date,
        location,
        categories,
        comments: []
      });

      await event.save();
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
    Event.find({}, function(err, events) {
      res.json(events);
    });
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

router.post(
  "/:id",
  [
    check("comment", "Please enter a valid date").not().isEmpty(),
    check("commentBy", "Please enter a valid location").not().isEmpty()
  ],
  authValidator,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { comment, commentBy } = req.body;
    try {
      Event.updateOne({ _id: req.params.id }, {
        $push: {
          comments: {
            comment,
            commentBy
          }
        }
      }, {
        new: true,
        upsert: true
      }).exec();

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

router.get("/:id", async (req, res) => {
  try {
    Event.findById(req.params.id, function(err, event) {
      if(err) throw err;
      res.json(event);
    });
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});


router.delete("/:id", authValidator, async (req, res) => {
  try {
    Event.findByIdAndDelete(req.params.id, function (err) {
      if (err) throw err;
      res.status(200).json({success: true});
    });
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

module.exports = router;
