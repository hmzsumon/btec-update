const express = require('express');
const router = express.Router();
const {
	generateSalary,
	updateSalaryFromExcel,
	findAllHostFromSql,
} = require('../controllers/hostController');

router.route('/host/salary').put(generateSalary);
router.route('/host/salary/excel').put(updateSalaryFromExcel);
router.route('/host/sql').get(findAllHostFromSql);
module.exports = router;
