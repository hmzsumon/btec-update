const express = require('express');
const router = express.Router();
const { generateSalary } = require('../controllers/hostController');

router.route('/host/salary').put(generateSalary);
module.exports = router;
