const router = require("express").Router();
let tyreStock = require("../models/tyreStockModel.js");

router.route("/").get((req, res) => {
  tyreStock
    .find()
    .then((stocks) => res.json(stocks))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const brand = req.body.brand;
  const godown = req.body.godown;
  const vehicle_name = req.body.vehicle_name;
  const size = req.body.size;
  const no_of_units = Number(req.body.no_of_units);
  const date = Date.parse(req.body.date);

  const newStock = new tyreStock({
    brand,
    godown,
    vehicle_name,
    size,
    no_of_units,
    date,
  });

  newStock
    .save()
    .then(() => res.json("Stock Added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  tyreStock
    .findById(req.params.id)
    .then((stock) => res.json(stock))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  tyreStock
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("Stock Deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  tyreStock
    .findById(req.params.id)
    .then((stock) => {
      stock.brand = req.body.brand;
      stock.godown = req.body.godown;
      stock.vehicle_name = req.body.vehicle_name;
      stock.size = req.body.size;
      stock.no_of_units = Number(req.body.no_of_units);
      stock.date = Date.parse(req.body.date);

      stock
        .save()
        .then(() => res.json("Stock Updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
