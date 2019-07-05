require("dotenv").config();

const express = require('express');
const app = express();
const port = 3000;
const routes = require("./lib/routes");

app.use(express.json());
app.use(routes);

app.use((err, req, res, next) => {
  if (err.httpStatusCode) {
    return res.status(err.httpStatusCode).json({ success: false, error: err.message });
  }

  return res.status(500).json({ success: false, error: "An unexpected error occured" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});