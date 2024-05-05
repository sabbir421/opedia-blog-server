const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
  res.response.success({}, 'health is good');
});

module.exports = router;
