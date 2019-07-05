const express = require("express");
const router = express.Router();

router.get("/", require("./get"));
router.get("/:id", require("./getById"));
router.post("/", require("./post"));
router.put("/:id", require("./put"));
router.delete("/:id", require("./delete"));

module.exports = router;