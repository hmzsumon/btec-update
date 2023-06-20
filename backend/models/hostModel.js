const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hostSchema = new Schema(
	{
		id: {
			type: String,
			required: true,
		},
		nick_name: {
			type: String,
		},
		ticket: {
			type: Number,
			default: 0,
		},
		coin: {
			type: Number,
			default: 0,
		},
		receive_coin: {
			type: Number,
			default: 0,
		},
		diamonds: {
			type: Number,
			default: 0,
		},
		total_use_coin: {
			type: Number,
			default: 0,
		},
		family_id: {
			type: String,
		},
		family_btec_id: {
			type: String,
		},
		family_name: {
			type: String,
		},
		avatar_url: {
			type: String,
		},
		nid_image_url_1: {
			type: String,
		},
		nid_image_url_2: {
			type: String,
		},
		online_time: {
			type: Number,
			default: 0,
		},
		salary_info: {
			netAmount: {
				type: Number,
				default: 0,
			},
			base_pay: {
				type: Number,
				default: 0,
			},
			merchant_pay: {
				type: Number,
				default: 0,
			},
			salary_amount: {
				type: Number,
				default: 0,
			},
			day_bonus: {
				type: Number,
				default: 0,
			},
			grosSalary: {
				type: Number,
				default: 0,
			},
			extra: {
				type: Number,
				default: 0,
			},
			extra_bonus: {
				type: Number,
				default: 0,
			},
			merchant_extra: {
				type: Number,
				default: 0,
			},
			merchant_total: {
				type: Number,
				default: 0,
			},
			motivator_bonus: {
				type: Number,
				default: 0,
			},
			target_point: {
				type: Number,
				default: 0,
			},
			date: {
				type: Date,
				default: Date.now,
			},
		},
		is_target: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Host', hostSchema);
