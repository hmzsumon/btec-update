import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import FadeLoader from 'react-spinners/FadeLoader';
import ExcelJS from 'exceljs';

import { formatDate } from '../../../utils/functions';
import { DataGrid } from '@mui/x-data-grid';

// import Actions from './Actions';
import { useParams } from 'react-router-dom';

import { useGetFamilySalaryAdminQuery } from '../../../features/admin/adminApi';
// import { Link } from 'react-router-dom';
// import { FiEye } from 'react-icons/fi';

const FamilySalary = () => {
	const { id } = useParams();
	const { data, isLoading } = useGetFamilySalaryAdminQuery(id);
	const {
		hosts,
		family,
		// singleFamily,
		// totalMerchantPay,
		// totalCoins,
		// totalGrossSalary,
		// totalHost,
	} = data || [];

	// // handle delete user
	// const handleDelete = () => {
	// 	console.log('delete');
	// };

	// // handle cancel withdraw
	// const cancelWithdraw = () => {
	// 	console.log('cancel');
	// };

	const columns = [
		{
			field: 'serial',
			headerName: 'SL',
			width: 70,
		},
		{
			field: 'name',
			headerName: 'Name',
			width: 160,
			renderCell: (params) => {
				return (
					<div className='flex items-center'>
						{decodeURIComponent(params.row.name)}
					</div>
				);
			},
		},

		{
			field: 'id',
			headerName: 'Bteclive ID',
			description: 'This column has a value getter and is not sortable.',
			sortable: false,
			width: 160,
		},
		{
			field: 'coin',
			headerName: 'Received Coin',
			width: 150,
			renderCell: (params) => {
				return (
					<div className='text-[0.9rem]'>
						<p className='text-yellow-400'>
							{Number(params.row.coin).toLocaleString('en-US')}
						</p>
					</div>
				);
			},
		},
		{
			field: 'base_pay',
			headerName: 'Base Pay',
			width: 150,
			renderCell: (params) => {
				return (
					<div className='text-[0.8rem]'>
						<p className='text-purple-600'>
							{Number(params.row.base_pay).toLocaleString('en-US', {
								style: 'currency',
								currency: 'bdt',
							})}
						</p>
					</div>
				);
			},
		},
		{
			field: 'day_bonus',
			headerName: 'Day Bonus',
			width: 150,
			renderCell: (params) => {
				return (
					<div className='text-[0.8rem]'>
						<p className='text-blue-500'>
							{Number(params.row.day_bonus).toLocaleString('en-US', {
								style: 'currency',
								currency: 'bdt',
							})}
						</p>
					</div>
				);
			},
		},
		{
			field: 'premium_bonus',
			headerName: 'Premium Bonus',
			width: 150,
			renderCell: (params) => {
				return (
					<div className='text-xs'>
						<p className='text-blue-500'>
							{Number(params.row.premium_bonus).toLocaleString('en-US', {
								style: 'currency',
								currency: 'BDT',
							})}
						</p>
					</div>
				);
			},
		},
		{
			field: 'extra_bonus',
			headerName: 'Extra Bonus',
			width: 150,
			renderCell: (params) => {
				return (
					<div className='text-[0.8rem]'>
						<p className='text-orange-500'>
							{Number(params.row.extra_bonus).toLocaleString('en-US', {
								style: 'currency',
								currency: 'bdt',
							})}
						</p>
					</div>
				);
			},
		},
		{
			field: 'grosSalary',
			headerName: 'Host Salary',
			width: 150,
			renderCell: (params) => {
				return (
					<div className='text-[0.8rem]'>
						<p className='text-green-500'>
							{Number(params.row.grosSalary).toLocaleString('en-US', {
								style: 'currency',
								currency: 'bdt',
							})}
						</p>
					</div>
				);
			},
		},
		{
			field: 'merchant_pay',
			headerName: 'Merchant Pay',
			width: 150,
			renderCell: (params) => {
				return (
					<div className='text-[0.8rem]'>
						<p className='text-orange-300'>
							{Number(
								Number(params.row.merchant_pay) +
									Number(params.row.merchant_extra)
							).toLocaleString('en-US', {
								style: 'currency',
								currency: 'bdt',
							})}
						</p>
					</div>
				);
			},
		},
		{
			field: 'total_pay',
			headerName: 'Total Pay',
			width: 150,
			renderCell: (params) => {
				return (
					<div className='text-[0.8rem]'>
						<p className='text-yellow-500 '>
							{Number(params.row.total_pay).toLocaleString('en-US', {
								style: 'currency',
								currency: 'bdt',
							})}
						</p>
					</div>
				);
			},
		},

		// {
		// 	field: 'balance',
		// 	headerName: 'Balance',
		// 	width: 150,
		// 	renderCell: (params) => {
		// 		console.log(params.row.balance);
		// 		return (
		// 			<div className='text-[0.5rem]'>
		// 				<p className='text-orange-500'>
		// 					M: {params.row.balance.m} &#8354;
		// 				</p>
		// 				<p className='text-green-500'>
		// 					W: {params.row.balance.b} &#8354;
		// 				</p>
		// 				<p className='text-blue-500'>B: {params.row.balance.w} &#8354;</p>
		// 			</div>
		// 		);
		// 	},
		// },

		// {
		// 	field: 'action',
		// 	headerName: 'Action',
		// 	width: 160,
		// 	renderCell: (params) => {
		// 		return (
		// 			<Actions
		// 				editRoute={'user'}
		// 				deleteHandler={handleDelete}
		// 				cancelWithdraw={cancelWithdraw}
		// 				status={params.row.status}
		// 				id={params.row.id}
		// 				method={params.row.method}
		// 			/>
		// 		);
		// 	},
		// },
	];

	const rows = [];

	hosts &&
		hosts.map((user) => {
			return rows.push({
				id: user.id,
				serial: rows.length + 1,
				name: user.nick_name,
				coin: user.receive_coin,
				target: user.salary_info.target_point,
				base_pay: user.salary_info.base_pay,
				merchant_pay: user.salary_info.merchant_pay,
				grosSalary: user.salary_info.grosSalary,
				day_bonus: user.salary_info.day_bonus,
				premium_bonus: user.salary_info.motivator_bonus,
				extra: user.salary_info.extra,
				extra_bonus: user.salary_info.extra_bonus,
				merchant_extra: user.salary_info.merchant_extra,
				merchant_total: user.salary_info.merchant_total,
				total_pay:
					Number(user.salary_info.grosSalary) +
					Number(user.salary_info.merchant_total),
			});
		});
	return (
		<DashboardLayout>
			{isLoading ? (
				<div className='flex items-center justify-center w-full h-screen'>
					<FadeLoader color={'#fbbf24'} />
				</div>
			) : (
				<div className='p-4'>
					<div className='my-3 space-y-2 '>
						<p className='space-x-2 '>
							<span className='text-green-500'>Family Name: </span>
							<span>{family && family.name}</span>
						</p>
						<p className='space-x-2 '>
							<span className='text-green-500'>Family ID: </span>
							<span>{family && family.user_id}</span>
						</p>
						<p className='space-x-2 '>
							<span className='text-green-500'>Family Total Coin: </span>
							<span>
								{Number(family && family.receive_coins).toLocaleString('en-US')}
							</span>
						</p>
						<p className='space-x-2 '>
							<span className='text-green-500'>Total Host Salary: </span>
							<span>
								{Number(family && family.host_salary).toLocaleString('en-US', {
									style: 'currency',
									currency: 'bdt',
								})}
							</span>
						</p>
						<p className='space-x-2 '>
							<span className='text-green-500'>Agent Salary: </span>
							<span>
								{Number(family && family.salary).toLocaleString('en-US', {
									style: 'currency',
									currency: 'bdt',
								})}
							</span>
						</p>
						<p className='space-x-2 '>
							<span className='text-green-500'>Total Salary: </span>
							<span>
								{Number(family && family.total_salary).toLocaleString('en-US', {
									style: 'currency',
									currency: 'bdt',
								})}
							</span>
						</p>
						<p className='space-x-2 '>
							<span className='text-green-500'>Total Host: </span>
							<span>{family && family.total_hosts}</span>
						</p>
						<p className='space-x-2 '>
							<span className='text-green-500'>Total Success Host: </span>
							<span>{family && family.success_hosts} </span>
						</p>
					</div>

					<div className='w-full shadow-lg rounded-xl' style={{ height: 470 }}>
						<DataGrid
							rows={rows}
							columns={columns}
							pageSize={100}
							rowsPerPageOptions={[20]}
							checkboxSelection={false}
							onSelectionModelChange={(id) => {}}
						/>
					</div>
				</div>
			)}
		</DashboardLayout>
	);
};

export default FamilySalary;
