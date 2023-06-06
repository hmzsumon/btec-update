import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import FadeLoader from 'react-spinners/FadeLoader';

import { formatDate } from '../../../utils/functions';
import { DataGrid } from '@mui/x-data-grid';

import { useGetAllHostAdminQuery } from '../../../features/admin/adminApi';

const Users = () => {
	const { data, isLoading } = useGetAllHostAdminQuery();
	const { hosts } = data || [];

	const columns = [
		{
			field: 'serial',
			headerName: 'Serial',
			width: 100,
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
			field: 'family_name',
			headerName: 'Family Name',
			description: 'This column has a value getter and is not sortable.',
			sortable: false,
			width: 160,
			renderCell: (params) => {
				return (
					<div className='flex items-center'>
						{decodeURIComponent(params.row.family_name)}
					</div>
				);
			},
		},
		{
			field: 'family_id',
			headerName: 'Family ID',
			description: 'This column has a value getter and is not sortable.',
			sortable: false,
			width: 160,
		},
		{
			field: 'coin',
			headerName: 'Received Coin',
			width: 150,
		},
		{
			field: 'target',
			headerName: 'Target Coin',
			width: 150,
		},
		{
			field: 'base_pay',
			headerName: 'Base Pay',
			width: 150,
			renderCell: (params) => {
				return (
					<div className='text-xs'>
						<p className='text-green-500'>
							{Number(params.row.base_pay).toLocaleString('en-US', {
								style: 'currency',
								currency: 'BDT',
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
					<div className='text-xs'>
						<p className='text-orange-500'>
							{Number(params.row.day_bonus).toLocaleString('en-US', {
								style: 'currency',
								currency: 'BDT',
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
					<div className='text-xs'>
						<p className='text-blue-500'>
							{Number(params.row.extra_bonus).toLocaleString('en-US', {
								style: 'currency',
								currency: 'BDT',
							})}
						</p>
					</div>
				);
			},
		},
		{
			field: 'grosSalary',
			headerName: 'Host Total Salary',
			width: 150,
			renderCell: (params) => {
				return (
					<div className='text-xs'>
						<p className='text-rose-600'>
							{Number(params.row.grosSalary).toLocaleString('en-US', {
								style: 'currency',
								currency: 'BDT',
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
					<div className='text-xs'>
						<p className='text-orange-500'>
							{Number(params.row.merchant_total).toLocaleString('en-US', {
								style: 'currency',
								currency: 'BDT',
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
				serial: 1 + rows.length,
				name: user.nick_name,
				family_name: user.family_name,
				family_id: user.family_btec_id,
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
					<div>
						<h1 className='text-2xl font-semibold'>
							Total Hosts: {hosts?.length}
						</h1>
					</div>
					<div className='w-full shadow-lg rounded-xl' style={{ height: 470 }}>
						<DataGrid
							rows={rows}
							columns={columns}
							pageSize={20}
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

export default Users;
