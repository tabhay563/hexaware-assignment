const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Backend is running",
    success: true,
  });
});


const userRoutes = require("./routes/user.route");
app.use("/api/users", userRoutes);


module.exports = app;
