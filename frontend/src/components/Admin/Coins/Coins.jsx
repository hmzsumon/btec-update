import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import FadeLoader from 'react-spinners/FadeLoader';

import { formatDate } from '../../../utils/functions';
import { DataGrid } from '@mui/x-data-grid';

import { useGetCoinsAdminQuery } from '../../../features/admin/adminApi';

const Coins = () => {
	const { data, isLoading } = useGetCoinsAdminQuery();
	const { users: hosts, receiveCoins, diamonds } = data || [];

	const columns = [
		{
			field: 'serial',
			headerName: 'Serial',
			width: 100,
		},

		{
			field: 'id',
			headerName: 'Bteclive ID',
			description: 'This column has a value getter and is not sortable.',
			sortable: false,
			width: 160,
		},

		{
			field: 'receiveCoins',
			headerName: 'Received Coin',
			width: 150,
		},
		{
			field: 'diamonds',
			headerName: 'Diamonds',
			width: 150,
		},
	];

	const rows = [];

	hosts &&
		hosts.map((user) => {
			return rows.push({
				id: user.id,
				serial: 1 + rows.length,
				receiveCoins: user.receive_coins,
				diamonds: user.diamonds,
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
					<div className='space-y-2'>
						<h1 className='  font-semibold'>
							Total Receive Coins: {receiveCoins}
						</h1>
						<h1 className=' font-semibold'>Total Diamonds: {diamonds}</h1>
						<h1 className=' font-semibold'>
							Total Diamonds & Receive Coins: {diamonds + receiveCoins}
						</h1>
						<h1 className=' font-semibold'>Total Hosts: {hosts?.length}</h1>
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

export default Coins;
