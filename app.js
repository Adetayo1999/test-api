require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");
const usersRoute = require("./routes/user.route");
const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));
app.use("/api/users", usersRoute);

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Ready To Go");
  })
  .catch((err) => {
    console.error(err.message);
  });

app.listen(PORT, () => {
  console.log(`Serving On Port ${PORT}`);
});
