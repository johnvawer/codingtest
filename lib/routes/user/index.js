const express = require("express");
const router = express.Router();

router.use("/", require("./get"));

module.exports = router;