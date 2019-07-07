require("dotenv").config();

const express = require('express');
const app = express();
const port = 3000;
const routes = require("./lib/routes");
const {
  catchAll,
  errorHandler,
} = require("./lib/middleware");

app.use(express.json());
app.use(routes);

app.use(catchAll);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});