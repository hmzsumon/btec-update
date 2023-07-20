const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { type } = require('os');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			// required: [true, 'Please Enter Your Name'],
		},
		email: {
			type: String,
		},
		phone: {
			type: String,
			trim: true,
		},
		user_id: {
			type: String,
			trim: true,
		},
		id: {
			type: String,
			trim: true,
		},
		role: {
			type: String,
			default: 'user',
			enum: {
				values: ['user', 'admin'],
			},
		},
		password: {
			type: String,
			required: [true, 'Please Enter Your Password'],
			minLength: [6, 'Password should be greater than 6 characters'],
			select: false,
		},

		hosts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Host',
			},
		],
		total_hosts: {
			type: Number,
			default: 0,
		},
		success_hosts: {
			type: Number,
		},

		is_new: {
			type: Boolean,
			default: true,
		},

		current_salary: {
			type: Number,
			default: 0,
		},
		//agent total salary
		total_salary: {
			type: Number,
			default: 0,
		},
		//agent salary
		salary: {
			type: Number,
			default: 0,
		},
		base_pay: {
			type: Number,
			default: 0,
		},
		host_salary: {
			type: Number,
			default: 0,
		},
		extra_bonus: {
			type: Number,
			default: 0,
		},
		receive_coins: {
			type: Number,
			default: 0,
		},
		target_coins: {
			type: Number,
			default: 0,
		},
		extra_coins: {
			type: Number,
			default: 0,
		},

		is_success: {
			type: Boolean,
			default: false,
		},

		resetPasswordToken: String,
		resetPasswordExpire: Date,
	},
	{
		timestamps: true,
	}
);

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}

	this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

// Compare Password

userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
	// Generating Token
	const resetToken = crypto.randomBytes(20).toString('hex');

	// Hashing and adding resetPasswordToken to userSchema
	this.resetPasswordToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

	return resetToken;
};

module.exports = mongoose.model('User', userSchema);
