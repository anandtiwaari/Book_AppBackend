const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./Routes/bookRoutes");
const userRoutes = require("./Routes/userRoutes");
const bodyParser = require("body-parser");
dotenv.config();
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use("/", routes);
app.use("/", userRoutes);

const port = 3000;
app.get("/", (req, res) => {
  res.send("<h1>its working</h1>");
});

try {
  mongoose.connect(process.env.DATABASE_URL);
  console.log(`Database connected suuccessFully`);
} catch (error) {
  console.log(error);
}

app.listen(port, () => {
  console.log(`Server is Live on the ${port}`);
});
