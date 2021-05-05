const router = require("express").Router();
let tyreBrand = require("../models/tyreBrandModel.js");

router.route("/").get((req, res) => {
  tyreBrand
    .find()
    .then((brands) => res.json(brands))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const date = Date.parse(req.body.date);

  const newBrand = new tyreBrand({
    name,
    date,
  });

  newBrand
    .save()
    .then(() => res.json("Brand Added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
