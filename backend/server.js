const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const tyreStockRouter = require("./routes/tyreStock");
const tyreBrandRouter = require("./routes/tyreBrand");
const tyreGodownRouter = require("./routes/tyreGodown");

app.use("/stocks", tyreStockRouter);
app.use("/brands", tyreBrandRouter);
app.use("/godowns", tyreGodownRouter);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
