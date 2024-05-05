const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
const routes = require("./routes");
const databaseInit = require("./config/database");
const { variable } = require("./config/variables");
const responseHandler = require("./helper/lib/responseHandler");

const app = express();
dotenv.config();
databaseInit();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(responseHandler);
app.use(routes);

app.listen(variable.port, () => {
  console.log(`API server listening on port http://localhost:${variable.port}`);
});
