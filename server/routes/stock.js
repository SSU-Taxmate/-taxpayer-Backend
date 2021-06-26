const express = require('express');
const router = express.Router();
router.get("/:stockId", (req, res) => {
    res.send("asdf")
});
module.exports = router;
