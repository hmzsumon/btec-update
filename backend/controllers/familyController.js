const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Family = require('../models/familyModel');
const Table = require('../models/tableModel');
const Host = require('../models/hostModel');
const User = require('../models/userModel');

// get all families list
exports.getFamilies = catchAsyncErrors(async (req, res, next) => {
	const users = await User.find({ role: 'user' }).sort({
		receive_coins: -1,
	});
	if (!users) {
		return next(new ErrorHander('No families found', 404));
	}

	// find success users
	const successUsers = await User.find({ role: 'user', is_success: true });

	// get total salary
	const totalSalary = users.reduce((acc, user) => acc + user.salary, 0);

	// get total host_salary
	const totalHostSalary = users.reduce(
		(acc, user) => acc + user.host_salary,
		0
	);

	// get total receive_coins
	const totalReceiveCoins = users.reduce(
		(acc, user) => acc + user.receive_coins,
		0
	);

	res.status(200).json({
		success: true,
		familyUser: users,
		successUsers: successUsers.length,
		totalSalary,
		totalHostSalary,
		totalReceiveCoins,
	});
});

// create new family
exports.newFamily = catchAsyncErrors(async (req, res, next) => {
	const neewFamily = {
		name: 'test',
		type: 'test',
		data: [],
		database: 'test',
	};
	const family = await Family.create(neewFamily);

	res.status(201).json({
		success: true,
		family,
	});
});

// get family salary info by family id
exports.getFamilySalaryInfo = catchAsyncErrors(async (req, res, next) => {
	const familyId = req.params.id;

	// find family by id
	const family = await User.findOne({ id: familyId });
	if (!family) {
		return next(new ErrorHander('Family not found with this ID', 404));
	}

	// get all host
	const hosts = await Host.find({ family_id: familyId }).sort({
		receive_coin: -1,
	});
	if (!hosts) {
		return next(new ErrorHander('Host not found with this ID', 404));
	}

	//get total merchant pay
	// const totalMerchantPay = users.reduce((acc, user) => {
	// 	return acc + Number(user.merchant_total);
	// }, 0);

	// //get total coins
	// const totalCoins = users.reduce((acc, user) => {
	// 	return acc + Number(user.coin);
	// }, 0);

	// //get total gross salary
	// const totalGrossSalary = users.reduce((acc, user) => {
	// 	return acc + Number(user.grosSalary);
	// }, 0);

	// get total pay

	res.status(200).json({
		success: true,
		hosts,
		family,
	});
});

// update user salary
exports.updateUserSalary = catchAsyncErrors(async (req, res, next) => {
	const users = await User.find({ role: 'user' });
	if (!users) {
		return next(new ErrorResponse('No users found', 404));
	}

	// get all host
	const hosts = await Host.find();
	if (!hosts) {
		return next(new ErrorHander('Host not found with this ID', 404));
	}

	// get users hosts by id and family_id
	for (let i = 0; i < users.length; i++) {
		const user = users[i];

		// find user by _id
		const agent = await User.findById(user._id);
		if (!agent) {
			return next(new ErrorHander('User not found with this ID', 404));
		}

		// get user host
		const userHost = hosts.filter((host) => {
			return host.family_id === user.id;
		});

		let base_pay = 0;
		let salary = 0;
		let extra_bonus = 0;
		let receive_coins = 0;
		let extra_coins = 0;
		let total_hosts = 0;
		let host_salary = 0;
		let success_hosts = 0;
		let target_coins = 0;
		let agentHost = [];

		// get salary
		for (let j = 0; j < userHost.length; j++) {
			const host = userHost[j];

			base_pay += host.salary_info.merchant_pay;
			salary += host.salary_info.merchant_total;
			host_salary += host.salary_info.grosSalary;
			extra_bonus += host.salary_info.merchant_extra;
			receive_coins += host.receive_coin;
			extra_coins += host.salary_info.extra;
			total_hosts += 1;
			success_hosts += host.is_target ? 1 : 0;
			target_coins += host.salary_info.target_point;
			agentHost.push(host._id);

			// console.log('===========================');
			// console.log('ID: ', user.id);
			// console.log('Ticket: ', user.ticket);
			// console.log('Salary: ', salary);
			// console.log('Gros Salary: ', grosSalary);
			// console.log('===========================');
		}

		// update agent salary
		agent.salary = salary;
		agent.extra_bonus = extra_bonus;
		agent.base_pay = base_pay;
		agent.host_salary = host_salary;
		agent.receive_coins = receive_coins;
		agent.extra_coins = extra_coins;
		agent.total_hosts = total_hosts;
		agent.success_hosts = success_hosts;
		agent.total_salary = salary + host_salary;
		agent.hosts = agentHost;
		agent.is_success = salary > 0 ? true : false;

		console.log('===========================');
		console.log('ID: ', agent.user_id);
		console.log('Salary: ', agent.salary);
		console.log('Extra: ', agent.extra);
		console.log('Base Pay: ', agent.base_pay);
		console.log(' Host Salary: ', agent.host_salary);
		console.log('==============================');
		agent.save();

		// console.log('id:', user.user_id, 'userHost: ', userHost.length);
	}

	res.status(200).json({
		success: true,
		massage: 'Update success',
	});
});

// update user salary by id
exports.updateUserSalaryById = catchAsyncErrors(async (req, res, next) => {
	const userId = req.params.id;

	// find user by _id
	const agent = await User.findById(userId);
	if (!agent) {
		return next(new ErrorHander('User not found with this ID', 404));
	}

	// get all host salary_info.receive_coin >=1200000
	const hosts = await Host.find({ family_id: agent.id });
	if (!hosts) {
		return next(new ErrorHander('Host not found with this ID', 404));
	}

	let base_pay = 0;
	let salary = 0;
	let extra_bonus = 0;
	let receive_coins = 0;
	let extra_coins = 0;
	let total_hosts = 0;
	let host_salary = 0;
	let success_hosts = 0;
	let target_coins = 0;
	let agentHost = [];

	// get salary
	for (let j = 0; j < hosts.length; j++) {
		const host = hosts[j];

		base_pay += host.salary_info.merchant_pay;
		salary += host.salary_info.merchant_total;
		host_salary += host.salary_info.grosSalary;
		extra_bonus += host.salary_info.merchant_extra;
		receive_coins += host.receive_coin;
		extra_coins += host.salary_info.extra;
		total_hosts += 1;
		success_hosts += host.is_target ? 1 : 0;
		target_coins += host.salary_info.target_point;
		agentHost.push(host._id);

		// console.log('===========================');
		// console.log('ID: ', user.id);
		// console.log('Ticket: ', user.ticket);
		// console.log('Salary: ', salary);
		// console.log('Gros Salary: ', grosSalary);
		// console.log('===========================');
	}

	// update agent salary
	agent.salary = salary;
	agent.extra_bonus = extra_bonus;
	agent.base_pay = base_pay;
	agent.host_salary = host_salary;
	agent.receive_coins = receive_coins;
	agent.extra_coins = extra_coins;
	agent.total_hosts = total_hosts;
	agent.success_hosts = success_hosts;
	agent.total_salary = salary + host_salary;
	agent.hosts = agentHost;
	agent.is_success = salary > 0 ? true : false;

	console.log('===========================');
	console.log('ID: ', agent.user_id);
	console.log('Salary: ', agent.salary);
	console.log('Extra: ', agent.extra);
	console.log('Base Pay: ', agent.base_pay);
	console.log(' Host Salary: ', agent.host_salary);
	console.log('==============================');
	agent.save();

	res.status(200).json({
		success: true,
		massage: 'Update success',
	});

	// salary: salary,
});
