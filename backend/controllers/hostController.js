const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Table = require('../models/tableModel');
const Host = require('../models/hostModel');
const User = require('../models/userModel');
const mysqlDB = require('../config/dbsql');

// generate salary for host
exports.generateSalary = catchAsyncErrors(async (req, res, next) => {
	try {
		// Fetch data from both bogo_user and bogo_family tables in parallel
		const [users, families] = await Promise.all([
			new Promise((resolve, reject) => {
				mysqlDB.query('SELECT * FROM bogo_user', function (err, rows) {
					if (err) {
						reject(err);
						console.log(err);
					} else {
						resolve(rows);
						// console.log(rows.length);
					}
				});
			}),
			new Promise((resolve, reject) => {
				mysqlDB.query('SELECT * FROM bogo_family', function (err, rows) {
					if (err) {
						reject(err);
					} else {
						resolve(rows);
					}
				});
			}),
		]);

		let existUsers = 0;
		let notExistUsers = 0;
		let usersToCreate = [];

		// Prepare an array of users to create in MongoDB
		for (let i = 0; i < users.length; i++) {
			const user = users[i];
			// find existing user from mongodb bogo_user_salary where user_id = id
			const existUser = await Host.findOne({ id: user.id });
			if (existUser) {
				// update user salary info
				const numTicket = Number(user.ticket);
				let netAmount = 0;
				let base_pay = 0;
				let merchant_pay = 0;
				let salary_amount = 0;
				let day_bonus = 0;
				let grosSalary = 0;
				let extra = 0;
				let extra_bonus = 0;
				let merchant_extra = 0;
				let merchant_total = 0;
				let motivator_bonus = 0;
				let target_point = 0;
				let diamonds = 0;

				if (numTicket >= 50000 && numTicket <= 249999) {
					// if (user.id === '217981') {
					// 	console.log('217981');
					// }
					netAmount = numTicket * 0.5;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount;
					grosSalary = base_pay;
					target_point = 50000;
				} else if (numTicket >= 250000 && numTicket <= 449999) {
					netAmount = 250000 - 250000 * 0.16;
					extra = numTicket - 250000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.405;
					day_bonus = salary_amount * 0.49;
					extra_bonus = extra * 0.5 * 0.02;
					grosSalary = base_pay + day_bonus + extra_bonus;
					merchant_extra = extra * 0.2 * 0.02;
					merchant_pay = salary_amount * 0.105;
					merchant_total = merchant_pay + merchant_extra;
					target_point = 250000;
				} else if (numTicket >= 450000 && numTicket <= 649999) {
					netAmount = 450000 - 450000 * 0.16;
					extra = numTicket - 450000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.405;
					day_bonus = salary_amount * 0.49;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.105;
					merchant_extra = extra * 0.2 * 0.02;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus;
					target_point = 450000;
				} else if (numTicket >= 650000 && numTicket <= 949999) {
					// console.log('900000');
					netAmount = 650000 - 650000 * 0.16;
					extra = numTicket - 650000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.405;
					day_bonus = salary_amount * 0.49;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.105;
					merchant_extra = extra * 0.2 * 0.02;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus;
					target_point = 650000;
				} else if (numTicket >= 950000 && numTicket < 1249999) {
					netAmount = 950000 - 950000 * 0.16;
					extra = numTicket - 950000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.405;
					day_bonus = salary_amount * 0.49;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.105;
					merchant_extra = extra * 0.2 * 0.02;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus;
					target_point = 950000;
				} else if (numTicket >= 1250000 && numTicket < 1749999) {
					netAmount = 1250000 - 1250000 * 0.15;
					extra = numTicket - 1250000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.4;
					day_bonus = salary_amount * 0.49;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.11;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 2000;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 1250000;
				} else if (numTicket >= 1750000 && numTicket < 2249999) {
					netAmount = 1750000 - 1750000 * 0.15;
					extra = numTicket - 1750000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.4;
					day_bonus = salary_amount * 0.49;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.11;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 2000;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 1750000;
				} else if (numTicket >= 2250000 && numTicket < 2849999) {
					netAmount = 2250000 - 2250000 * 0.15;
					extra = numTicket - 2250000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.4;
					day_bonus = salary_amount * 0.49;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.11;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 2500;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 2250000;
				} else if (numTicket >= 2850000 && numTicket < 3499999) {
					netAmount = 2850000 - 2850000 * 0.15;
					extra = numTicket - 2850000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.4;
					day_bonus = salary_amount * 0.49;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.11;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 2500;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 2850000;
				} else if (numTicket >= 3500000 && numTicket < 4499999) {
					netAmount = 3500000 - 3500000 * 0.14;
					extra = numTicket - 3500000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.395;
					day_bonus = salary_amount * 0.48;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.115;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 3500;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 3500000;
				} else if (numTicket >= 4500000 && numTicket < 5499999) {
					// console.log('here');
					netAmount = 4500000 - 4500000 * 0.14;
					extra = numTicket - 4500000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.395;
					day_bonus = salary_amount * 0.48;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.115;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 3500;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 4500000;
				} else if (numTicket >= 5500000 && numTicket < 6999999) {
					netAmount = 5500000 - 5500000 * 0.14;
					extra = numTicket - 5500000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.395;
					day_bonus = salary_amount * 0.48;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.115;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 3500;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 5500000;
				} else if (numTicket >= 7000000 && numTicket < 8499999) {
					netAmount = 7000000 - 7000000 * 0.13;
					extra = numTicket - 7000000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.39;
					day_bonus = salary_amount * 0.47;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.14;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 4500;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 7000000;
				} else if (numTicket >= 8500000 && numTicket < 10999999) {
					netAmount = 8500000 - 8500000 * 0.13;
					extra = numTicket - 8500000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.39;
					day_bonus = salary_amount * 0.47;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.14;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 4500;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 8500000;
				} else if (numTicket >= 11000000 && numTicket < 13499999) {
					netAmount = 11000000 - 11000000 * 0.13;
					extra = numTicket - 11000000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.39;
					day_bonus = salary_amount * 0.47;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.14;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 5500;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 11000000;
				} else if (numTicket >= 13500000 && numTicket < 16999999) {
					netAmount = 13500000 - 13500000 * 0.13;
					extra = numTicket - 13500000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.39;
					day_bonus = salary_amount * 0.47;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.14;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 5500;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 13500000;
				} else if (numTicket >= 17000000 && numTicket < 19999999) {
					netAmount = 17000000 - 17000000 * 0.12;
					extra = numTicket - 17000000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.4;
					day_bonus = salary_amount * 0.45;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.15;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 6000;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 17000000;
				} else if (numTicket >= 20000000 && numTicket < 24999999) {
					netAmount = 20000000 - 20000000 * 0.12;
					extra = numTicket - 20000000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.4;
					day_bonus = salary_amount * 0.45;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.15;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 6000;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 20000000;
				} else if (numTicket >= 25000000 && numTicket <= 34999999) {
					netAmount = 25000000 - 25000000 * 0.12;
					extra = numTicket - 25000000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.4;
					day_bonus = salary_amount * 0.45;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.15;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 6000;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 25000000;
				} else if (numTicket >= 35000000 && numTicket < 49999999) {
					netAmount = 35000000 - 35000000 * 0.11;
					extra = numTicket - 35000000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.4;
					day_bonus = salary_amount * 0.45;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.15;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 6500;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 35000000;
				} else if (numTicket >= 50000000 && numTicket < 99999999) {
					netAmount = 50000000 - 50000000 * 0.11;
					extra = numTicket - 50000000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.4;
					day_bonus = salary_amount * 0.45;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.15;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 6500;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 50000000;
				} else if (numTicket >= 100000000 && numTicket < 199999999) {
					netAmount = 100000000 - 100000000 * 0.1;
					extra = numTicket - 100000000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.39;
					day_bonus = salary_amount * 0.44;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.17;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 7000;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 100000000;
				} else if (numTicket >= 200000000) {
					netAmount = 200000000 - 200000000 * 0.1;
					extra = numTicket - 200000000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.39;
					day_bonus = salary_amount * 0.44;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.17;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 7000;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 200000000;
				}

				existUser.diamonds = user.diamonds;
				existUser.ticket = user.ticket;
				existUser.coin = user.coin;
				existUser.receive_coin = user.ticket;
				existUser.online_time = user.online_time;
				existUser.salary_info = {
					base_pay,
					day_bonus,
					extra_bonus,
					merchant_pay,
					merchant_extra,
					merchant_total,
					motivator_bonus,
					salary_amount,
					target_point,
					grosSalary,
					diamonds,
				};
				(existUser.is_target = numTicket >= 50000 ? true : false),
					await existUser.save();
			} else {
				const numTicket = Number(user.ticket);
				let netAmount = 0;
				let base_pay = 0;
				let merchant_pay = 0;
				let salary_amount = 0;
				let day_bonus = 0;
				let grosSalary = 0;
				let extra = 0;
				let extra_bonus = 0;
				let merchant_extra = 0;
				let merchant_total = 0;
				let motivator_bonus = 0;
				let target_point = 0;
				let diamonds = 0;

				if (numTicket >= 50000 && numTicket <= 249999) {
					// if (user.id === '217981') {
					// 	console.log('217981');
					// }
					netAmount = numTicket * 0.5;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount;
					grosSalary = base_pay;
					target_point = 50000;
				} else if (numTicket >= 250000 && numTicket <= 449999) {
					netAmount = 250000 - 250000 * 0.16;
					extra = numTicket - 250000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.405;
					day_bonus = salary_amount * 0.49;
					extra_bonus = extra * 0.5 * 0.02;
					grosSalary = base_pay + day_bonus + extra_bonus;
					merchant_extra = extra * 0.2 * 0.02;
					merchant_pay = salary_amount * 0.105;
					merchant_total = merchant_pay + merchant_extra;
					target_point = 250000;
				} else if (numTicket >= 450000 && numTicket <= 649999) {
					netAmount = 450000 - 450000 * 0.16;
					extra = numTicket - 450000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.405;
					day_bonus = salary_amount * 0.49;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.105;
					merchant_extra = extra * 0.2 * 0.02;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus;
					target_point = 450000;
				} else if (numTicket >= 650000 && numTicket <= 949999) {
					// console.log('900000');
					netAmount = 650000 - 650000 * 0.16;
					extra = numTicket - 650000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.405;
					day_bonus = salary_amount * 0.49;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.105;
					merchant_extra = extra * 0.2 * 0.02;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus;
					target_point = 650000;
				} else if (numTicket >= 950000 && numTicket < 1249999) {
					netAmount = 950000 - 950000 * 0.16;
					extra = numTicket - 950000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.405;
					day_bonus = salary_amount * 0.49;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.105;
					merchant_extra = extra * 0.2 * 0.02;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus;
					target_point = 950000;
				} else if (numTicket >= 1250000 && numTicket < 1749999) {
					netAmount = 1250000 - 1250000 * 0.15;
					extra = numTicket - 1250000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.4;
					day_bonus = salary_amount * 0.49;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.11;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 2000;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 1250000;
				} else if (numTicket >= 1750000 && numTicket < 2249999) {
					netAmount = 1750000 - 1750000 * 0.15;
					extra = numTicket - 1750000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.4;
					day_bonus = salary_amount * 0.49;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.11;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 2000;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 1750000;
				} else if (numTicket >= 2250000 && numTicket < 2849999) {
					netAmount = 2250000 - 2250000 * 0.15;
					extra = numTicket - 2250000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.4;
					day_bonus = salary_amount * 0.49;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.11;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 2500;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 2250000;
				} else if (numTicket >= 2850000 && numTicket < 3499999) {
					netAmount = 2850000 - 2850000 * 0.15;
					extra = numTicket - 2850000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.4;
					day_bonus = salary_amount * 0.49;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.11;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 2500;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 2850000;
				} else if (numTicket >= 3500000 && numTicket < 4499999) {
					netAmount = 3500000 - 3500000 * 0.14;
					extra = numTicket - 3500000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.395;
					day_bonus = salary_amount * 0.48;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.115;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 3500;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 3500000;
				} else if (numTicket >= 4500000 && numTicket < 5499999) {
					// console.log('here');
					netAmount = 4500000 - 4500000 * 0.14;
					extra = numTicket - 4500000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.395;
					day_bonus = salary_amount * 0.48;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.115;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 3500;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 4500000;
				} else if (numTicket >= 5500000 && numTicket < 6999999) {
					netAmount = 5500000 - 5500000 * 0.14;
					extra = numTicket - 5500000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.395;
					day_bonus = salary_amount * 0.48;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.115;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 3500;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 5500000;
				} else if (numTicket >= 7000000 && numTicket < 8499999) {
					netAmount = 7000000 - 7000000 * 0.13;
					extra = numTicket - 7000000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.39;
					day_bonus = salary_amount * 0.47;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.14;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 4500;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 7000000;
				} else if (numTicket >= 8500000 && numTicket < 10999999) {
					netAmount = 8500000 - 8500000 * 0.13;
					extra = numTicket - 8500000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.39;
					day_bonus = salary_amount * 0.47;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.14;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 4500;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 8500000;
				} else if (numTicket >= 11000000 && numTicket < 13499999) {
					netAmount = 11000000 - 11000000 * 0.13;
					extra = numTicket - 11000000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.39;
					day_bonus = salary_amount * 0.47;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.14;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 5500;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 11000000;
				} else if (numTicket >= 13500000 && numTicket < 16999999) {
					netAmount = 13500000 - 13500000 * 0.13;
					extra = numTicket - 13500000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.39;
					day_bonus = salary_amount * 0.47;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.14;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 5500;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 13500000;
				} else if (numTicket >= 17000000 && numTicket < 19999999) {
					netAmount = 17000000 - 17000000 * 0.12;
					extra = numTicket - 17000000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.4;
					day_bonus = salary_amount * 0.45;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.15;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 6000;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 17000000;
				} else if (numTicket >= 20000000 && numTicket < 24999999) {
					netAmount = 20000000 - 20000000 * 0.12;
					extra = numTicket - 20000000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.4;
					day_bonus = salary_amount * 0.45;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.15;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 6000;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 20000000;
				} else if (numTicket >= 25000000 && numTicket <= 34999999) {
					netAmount = 25000000 - 25000000 * 0.12;
					extra = numTicket - 25000000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.4;
					day_bonus = salary_amount * 0.45;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.15;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 6000;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 25000000;
				} else if (numTicket >= 35000000 && numTicket < 49999999) {
					netAmount = 35000000 - 35000000 * 0.11;
					extra = numTicket - 35000000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.4;
					day_bonus = salary_amount * 0.45;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.15;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 6500;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 35000000;
				} else if (numTicket >= 50000000 && numTicket < 99999999) {
					netAmount = 50000000 - 50000000 * 0.11;
					extra = numTicket - 50000000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.4;
					day_bonus = salary_amount * 0.45;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.15;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 6500;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 50000000;
				} else if (numTicket >= 100000000 && numTicket < 199999999) {
					netAmount = 100000000 - 100000000 * 0.1;
					extra = numTicket - 100000000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.39;
					day_bonus = salary_amount * 0.44;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.17;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 7000;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 100000000;
				} else if (numTicket >= 200000000) {
					netAmount = 200000000 - 200000000 * 0.1;
					extra = numTicket - 200000000;
					salary_amount = netAmount * 0.02;
					base_pay = salary_amount * 0.39;
					day_bonus = salary_amount * 0.44;
					extra_bonus = extra * 0.5 * 0.02;
					merchant_pay = salary_amount * 0.17;
					merchant_extra = extra * 0.2 * 0.02;
					motivator_bonus = 7000;
					merchant_total = merchant_pay + merchant_extra;
					grosSalary = base_pay + day_bonus + extra_bonus + motivator_bonus;
					target_point = 200000000;
				}

				const nickName = user.nick_name.replace(/\[/g, '').replace(/\]/g, '');
				const emoji = nickName.replace(/EMOJI:/g, '');
				const emojiText = emoji.replace(/:/g, '');

				// find family by user family id from families
				const family = families.find((f) => f.id === user.family_id);
				// console.log('family', family);

				// create new host
				const newHost = await Host.create({
					id: user.id,
					ticket: user.ticket,
					nick_name: emojiText,
					coin: user.diamonds,
					receive_coin: user.ticket,
					diamonds: user.diamonds,
					total_use_coin: user.use_diamonds,
					family_id: user.family_id,
					family_btec_id: family ? family.user_id : null,
					family_name: family ? family.name : 'No Family',
					avatar_url: user.identify_hold_image,
					nid_image_url_1: user.identify_positive_image,
					nid_image_url_2: user.identify_negative_image,
					online_time: user.online_time,
					salary_info: {
						netAmount,
						base_pay,
						merchant_pay,
						salary_amount,
						day_bonus,
						grosSalary,
						extra,
						extra_bonus,
						merchant_extra,
						merchant_total,
						motivator_bonus,
						target_point,
					},
					is_target: numTicket >= 50000 ? true : false,
				});
			}
		}

		// Bulk insert users in MongoDB
		if (usersToCreate.length > 0) {
			await Host.insertMany(usersToCreate);
		}

		console.log('existUser', existUsers);
		console.log('notExistUser', notExistUsers);

		res.status(200).json({
			success: true,
			message: 'Salary generated successfully',
			users: users.length,
			families: families.length,
		});
	} catch (err) {
		// Handle errors appropriately, e.g., send an error response
		res.status(500).json({
			success: false,
			message: 'Error generating salary',
			error: err.message,
		});
	}
});
