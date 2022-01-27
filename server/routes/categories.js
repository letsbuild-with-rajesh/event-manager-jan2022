const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const authValidator = require("../utils/utils");
const Category = require("../model/Category");

router.post(
  "/",
  [
    check("category", "Please enter a valid category").not().isEmpty()
  ],
  authValidator,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { category } = req.body;
    try {
      let categoryDoc = new Category({
        category
      });

      await categoryDoc.save();
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
    Category.find({}, function(err, categories) {
      res.json(categories);
    });
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});


router.delete("/:id", authValidator, async (req, res) => {
  try {
    Category.findByIdAndDelete(req.params.id, function (err) {
      if (err) throw err;
      res.status(200).json({success: true});
    });
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});


module.exports = router;
