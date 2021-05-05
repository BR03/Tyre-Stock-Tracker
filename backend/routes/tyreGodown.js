const router = require("express").Router();
let tyreGodown = require("../models/tyreGodownModel.js");

router.route("/").get((req, res) => {
  tyreGodown
    .find()
    .then((godowns) => res.json(godowns))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const location = req.body.location;
  const date = Date.parse(req.body.date);

  const newGodown = new tyreGodown({
    name,
    location,
    date,
  });

  newGodown
    .save()
    .then(() => res.json("Godown Added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
