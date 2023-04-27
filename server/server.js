const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const validateToken = require("./middleware/validateTokenHandler");
const cors = require("cors");



connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/friends", require("./routes/friendRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);


app.get("/", validateToken,(req, res)=>{
  res.send(`Hello there ...`)
})

app.listen(port, () => {
  console.log(`Server running on port `, port);
});
