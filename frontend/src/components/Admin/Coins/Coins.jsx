import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import FadeLoader from 'react-spinners/FadeLoader';
import ExcelJS from 'exceljs';
import { formatDate } from '../../../utils/functions';
import { DataGrid } from '@mui/x-data-grid';

import { useGetCoinsAdminQuery } from '../../../features/admin/adminApi';

const Coins = () => {
	const { data, isLoading } = useGetCoinsAdminQuery();
	const { users: hosts, receiveCoins, diamonds } = data || [];

	//handle excel export
	const handleExcelExport = () => {
		const workbook = new ExcelJS.Workbook();
		const sheet = workbook.addWorksheet('Family Salary');
		sheet.properties.defaultRowHeight = 30;
		// style header
		const headerRow = sheet.getRow(1);
		headerRow.font = { size: 12, bold: true };
		headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
		headerRow.height = 30;
		headerRow.eachCell((cell) => {
			cell.fill = {
				type: 'pattern',
				pattern: 'solid',
				fgColor: { argb: 'FFA500' },
			};
		});
		headerRow.border = {
			top: { style: 'thin' },
			left: { style: 'thin' },
			bottom: { style: 'thin' },
			right: { style: 'thin' },
		};
		headerRow.fill = {
			type: 'pattern',
			pattern: 'solid',
			fgColor: { argb: 'FFA500' },
		};

		sheet.columns = [
			// { header: 'Name', key: 'name', width: 30 },
			{ header: 'Bteclive ID', key: 'id', width: 20 },
			{ header: 'Received Coin', key: 'receiveCoins', width: 20 },
			{ header: 'Diamonds', key: 'diamonds', width: 20 },
		];

		const rows = hosts?.map((user) => {
			// console.log(user);
			return {
				id: user.id,
				receiveCoins: user.receive_coins,
				diamonds: user.diamonds,
			};
		});

		sheet.addRows(rows);

		workbook.xlsx.writeBuffer().then((data) => {
			const blob = new Blob([data], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			});
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.setAttribute('hidden', '');
			a.setAttribute('href', url);
			a.setAttribute('download', 'host-salary.xlsx');
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		});
	};

	const columns = [
		{
			field: 'serial',
			headerName: 'Serial',
			width: 100,
		},

		// {
		// 	field: 'nick_name',
		// 	headerName: 'Name',
		// 	width: 200,
		// 	renderCell: (params) => {
		// 		return (
		// 			<div className='flex items-center'>
		// 				{decodeURIComponent(params.row.nick_name)}
		// 			</div>
		// 		);
		// 	},
		// },

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
				nick_name: user.nick_name,
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
							Total Receive Coins:{' '}
							{Number(receiveCoins).toLocaleString('en-IN')}
						</h1>
						<h1 className=' font-semibold'>
							Total Diamonds: {Number(diamonds).toLocaleString('en-IN')}
						</h1>
						<h1 className=' font-semibold'>
							Total Diamonds & Receive Coins:{' '}
							{Number(diamonds + receiveCoins).toLocaleString('en-IN')}
						</h1>
						<h1 className=' font-semibold'>
							Total Hosts: {Number(hosts.length).toLocaleString('en-IN')}
						</h1>
					</div>

					<div className='my-2 text-right'>
						<button
							className='px-4 py-1 bg-orange-500 rounded'
							onClick={handleExcelExport}
						>
							Export to Excel
						</button>
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
