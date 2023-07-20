const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Table = require('../models/tableModel');
const Host = require('../models/hostModel');
const User = require('../models/userModel');
const { loadUser } = require('../utils/userModel');

// find all tables
exports.getTables = catchAsyncErrors(async (req, res, next) => {
	const tables = await Table.find();
	// console.log('call');
	res.status(200).json({
		success: true,
		tables,
	});
});

// find table by id
exports.getTable = catchAsyncErrors(async (req, res, next) => {
	const table = await Table.findById(req.params.id);

	if (!table) {
		return next(new ErrorHander('Table not found with this ID', 404));
	}

	const { name, type, data, database } = table;

	let users = [];
	for (let i = 0; i < data.length; i++) {
		const user = data[i];
		users.push({
			id: user.id,
			nickname: user.nick_name,
			coin: Number(user.ticket),
		});
	}

	res.status(200).json({
		success: true,
		users,
	});
});

// get users salary info
exports.getSalary = catchAsyncErrors(async (req, res, next) => {
	// get all host
	const hosts = await Host.find().sort({ receive_coin: -1 });
	if (!hosts) {
		return next(new ErrorHander('Host not found with this ID', 404));
	}

	let users = [];
	for (let i = 0; i < hosts.length; i++) {
		const user = hosts[i];
		// if (user.id === '217981') {
		// 	console.log(user.receive_coin);
		// }

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

		if (numTicket >= 50000 && numTicket <= 249999) {
			// if (user.id === '217981') {
			// 	console.log('217981');
			// }
			netAmount = numTicket * 0.5;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount;
			grosSalary = base_pay;
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
		} else if (numTicket >= 650000 && numTicket <= 949999) {
			console.log('900000');
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
		} else if (numTicket >= 1250000 && numTicket < 1749999) {
			netAmount = 1250000 - 1250000 * 0.15;
			extra = numTicket - 1250000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.4;
			day_bonus = salary_amount * 0.49;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.11;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket >= 1750000 && numTicket < 2249999) {
			netAmount = 1750000 - 1750000 * 0.15;
			extra = numTicket - 1750000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.4;
			day_bonus = salary_amount * 0.49;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.11;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket >= 2250000 && numTicket < 2849999) {
			netAmount = 2250000 - 2250000 * 0.15;
			extra = numTicket - 2250000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.4;
			day_bonus = salary_amount * 0.49;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.11;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket >= 2850000 && numTicket < 3499999) {
			netAmount = 2850000 - 2850000 * 0.15;
			extra = numTicket - 2850000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.4;
			day_bonus = salary_amount * 0.49;
			extra_bonus = extra * 0.5 * 0.02;

			merchant_pay = salary_amount * 0.11;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket >= 3500000 && numTicket < 4499999) {
			netAmount = 3500000 - 3500000 * 0.14;
			extra = numTicket - 3500000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.395;
			day_bonus = salary_amount * 0.48;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.115;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
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
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket >= 5500000 && numTicket < 6999999) {
			netAmount = 5500000 - 5500000 * 0.14;
			extra = numTicket - 5500000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.395;
			day_bonus = salary_amount * 0.48;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.115;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket >= 7000000 && numTicket < 8499999) {
			netAmount = 7000000 - 7000000 * 0.13;
			extra = numTicket - 7000000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.39;
			day_bonus = salary_amount * 0.47;
			extra_bonus = extra * 0.5 * 0.02;

			merchant_pay = salary_amount * 0.14;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket >= 8500000 && numTicket < 109999999) {
			netAmount = 8500000 - 8500000 * 0.13;
			extra = numTicket - 8500000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.39;
			day_bonus = salary_amount * 0.47;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.14;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket >= 11000000 && numTicket < 13499999) {
			netAmount = 11000000 - 11000000 * 0.13;
			extra = numTicket - 11000000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.39;
			day_bonus = salary_amount * 0.47;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.14;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket >= 13500000 && numTicket < 16999999) {
			netAmount = 13500000 - 13500000 * 0.13;
			extra = numTicket - 13500000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.39;
			day_bonus = salary_amount * 0.47;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.14;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket >= 17000000 && numTicket < 19999999) {
			netAmount = 17000000 - 17000000 * 0.12;
			extra = numTicket - 17000000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.4;
			day_bonus = salary_amount * 0.45;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.15;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket >= 20000000 && numTicket < 24999999) {
			netAmount = 20000000 - 20000000 * 0.12;
			extra = numTicket - 20000000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.4;
			day_bonus = salary_amount * 0.45;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.15;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket >= 25000000 && numTicket <= 34999999) {
			netAmount = 25000000 - 25000000 * 0.12;
			extra = numTicket - 25000000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.4;
			day_bonus = salary_amount * 0.45;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.15;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket >= 35000000 && numTicket < 49999999) {
			netAmount = 35000000 - 35000000 * 0.11;
			extra = numTicket - 35000000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.4;
			day_bonus = salary_amount * 0.45;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.15;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket >= 50000000 && numTicket < 99999999) {
			netAmount = 50000000 - 50000000 * 0.11;
			extra = numTicket - 50000000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.4;
			day_bonus = salary_amount * 0.45;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.15;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket >= 100000000 && numTicket < 199999999) {
			netAmount = 100000000 - 100000000 * 0.1;
			extra = numTicket - 100000000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.39;
			day_bonus = salary_amount * 0.44;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.17;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket >= 200000000) {
			netAmount = 200000000 - 200000000 * 0.1;
			extra = numTicket - 200000000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.39;
			day_bonus = salary_amount * 0.44;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.17;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		}

		// console.log('===========================');
		// console.log('ID: ', user.id);
		// console.log('Ticket: ', user.ticket);
		// console.log('Salary: ', salary);
		// console.log('Gros Salary: ', grosSalary);
		// console.log('===========================');

		users.push({
			id: user.id,
			nickname: user.nick_name,
			family_name: user.family_name,
			family_id: user.family_btec_id,
			coin: Number(user.ticket),
			salary_amount: Number(salary_amount).toFixed(0),
			base_pay: Number(base_pay).toFixed(0),
			day_bonus: Number(day_bonus).toFixed(0),
			merchant_pay: Number(merchant_pay).toFixed(0),
			grosSalary: Number(grosSalary).toFixed(0),
			extra: Number(extra).toFixed(0),
			extra_bonus: Number(extra_bonus).toFixed(0),
			merchant_extra: Number(merchant_extra).toFixed(0),
			merchant_total: Number(merchant_total).toFixed(0),
		});
	}

	res.status(200).json({
		success: true,
		users,
		totalUsers: hosts.length,
	});
});

// get users by family_id
exports.getUsersByFamilyId = catchAsyncErrors(async (req, res, next) => {
	const tables = await Table.find();

	if (!tables) {
		return next(new ErrorHander('Tables not found with this ID', 404));
	}
	const userData = tables[2].data;

	const family_id = 76;

	let familyUsers = [];

	for (let i = 0; i < userData.length; i++) {
		const user = userData[i];

		if (user.family_id == family_id) {
			// console.log(user.id);
			familyUsers.push(user);
		}
	}

	// console.log(familyUsers.length);

	res.status(200).json({
		success: true,
	});
});

// create new Host
exports.createNewHost = catchAsyncErrors(async (req, res, next) => {
	const data = loadUser();
	const dataUsers = data[2].data;
	console.log(dataUsers.length);
	let users = [];

	for (let i = 0; i < dataUsers.length; i++) {
		const user = dataUsers[i];

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
		users.push(newHost);
	}

	console.log(dataUsers.length);

	res.status(201).json({
		success: true,
		users: dataUsers,
	});
});

// top 10 host by receive coin
exports.top10HostByReceiveCoin = catchAsyncErrors(async (req, res, next) => {
	const hosts = await Host.find().sort({ receive_coin: -1 }).limit(50);

	res.status(200).json({
		success: true,
		top10Host: hosts,
	});
});

// convert all host nick_name to text
exports.convertAllHostNickNameToText = catchAsyncErrors(
	async (req, res, next) => {
		const hosts = await Host.find();
		console.log(hosts.length);
		for (let i = 0; i < hosts.length; i++) {
			const host = hosts[i];
			const nickName = host.nick_name.replace(/\[/g, '').replace(/\]/g, '');
			const emoji = nickName.replace(/EMOJI:/g, '');
			const emojiText = emoji.replace(/:/g, '');
			// find host by _id
			const hostById = await Host.findById(host._id);
			hostById.nick_name = emojiText;
			await hostById.save();
		}

		res.status(200).json({
			success: true,
			users,
		});
	}
);

// remove duplicate host by id
exports.removeDuplicateHostById = catchAsyncErrors(async (req, res, next) => {
	// find duplicate host by id
	const hosts = await Host.find();

	for (let i = 0; i < hosts.length; i++) {
		const host = hosts[i];
		const hostById = await Host.findById(host._id);
		if (hostById.id == host.id && hostById._id != host._id) {
			await Host.findByIdAndDelete(host._id);
		}
	}

	res.status(200).json({
		success: true,
		massage: 'Remove duplicate host by id',
	});
});

// update all host family_id
exports.updateAllHostFamilyId = catchAsyncErrors(async (req, res, next) => {
	const hosts = await Host.find();

	for (let i = 0; i < hosts.length; i++) {
		const host = hosts[i];
		// find family by id
		const family = await User.findOne({ id: host.family_id });
		if (family) {
			const hostById = await Host.findById(host._id);
			hostById.family_btec_id = family.user_id;
			hostById.family_name = family.name;
			await hostById.save();
		}
	}

	res.status(200).json({
		success: true,
		massage: 'Update all host family_id',
	});
});

// get all host
exports.getAllHost = catchAsyncErrors(async (req, res, next) => {
	const hosts = await Host.find().sort({ receive_coin: -1 });

	res.status(200).json({
		success: true,
		hosts,
	});
});

// update all host family_name and family_btec_id by family_id
exports.updateAllHostFamilyNameAndFamilyBtecIdByFamilyId = catchAsyncErrors(
	async (req, res, next) => {
		const hosts = await Host.find();

		for (let i = 0; i < hosts.length; i++) {
			const host = hosts[i];
			// find family by id
			const family = await User.findOne({ id: host.family_id });
			if (family) {
				const hostById = await Host.findById(host._id);
				hostById.family_btec_id = family.user_id;
				hostById.family_name = family.name;
				await hostById.save();
			}
		}

		res.status(200).json({
			success: true,
			massage: 'Update all host family_name and family_btec_id by family_id',
		});
		// find family by id
	}
);

//update host salary info
exports.updateHostSalary = catchAsyncErrors(async (req, res, next) => {
	const userId = req.params.id;

	// find user by _id
	const agent = await User.findById(userId);
	if (!agent) {
		return next(new ErrorHander('User not found with this ID', 404));
	}

	// get all host by family_id and receive_coin >=1250000
	const hosts = await Host.find({
		family_id: agent.id,
		receive_coin: { $gte: 1250000 },
	});

	// update host salary info - 50% of receive_coin
	for (let i = 0; i < hosts.length; i++) {
		const host = hosts[i];
		const hostById = await Host.findById(host._id);

		hostById.salary_info = {
			base_pay: hostById.salary_info.base_pay * 0.5,
			merchant_pay: hostById.salary_info.merchant_pay * 0.5,
			salary_amount: hostById.salary_info.salary_amount * 0.5,
			day_bonus: hostById.salary_info.day_bonus * 0.5,
			grosSalary: hostById.salary_info.grosSalary * 0.5,
			extra_bonus: hostById.salary_info.extra_bonus * 0.5,
			merchant_extra: hostById.salary_info.merchant_extra * 0.5,
			merchant_total: hostById.salary_info.merchant_total * 0.5,
			motivator_bonus: hostById.salary_info.motivator_bonus * 0.5,
			target_point: hostById.salary_info.target_point * 0.5,
		};
		hostById.receive_coin = hostById.receive_coin * 0.5;
		hostById.ticket = hostById.ticket * 0.5;
		hostById.save();

		// console.log(hostById);
	}

	res.status(201).json({
		success: true,
		message: 'Update host salary info',
	});
});
