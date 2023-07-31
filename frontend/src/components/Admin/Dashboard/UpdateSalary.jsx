import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import DashboardLayout from '../../Admin/layouts/DashboardLayout';
import {
	useUpdateFamilySalaryMutation,
	useUpdateUserSalaryMutation,
} from '../../../features/admin/adminApi';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const UpdateSalary = () => {
	const [updateUserSalary, { isLoading, isSuccess, isError, error }] =
		useUpdateUserSalaryMutation();

	const [
		updateFamilySalary,
		{
			isLoading: f_loading,
			isSuccess: f_success,
			isError: f_isError,
			error: f_error,
		},
	] = useUpdateFamilySalaryMutation();

	const handleSubmit = (e) => {};

	useEffect(() => {
		if (isSuccess) {
			toast.success('User Salary Updated Successfully');
		}
		if (isError) {
			toast.error(error.data.message);
		}
	}, [isSuccess, isError, error]);

	useEffect(() => {
		if (f_success) {
			toast.success('Family Salary Updated Successfully');
		}
		if (f_isError) {
			toast.error(f_error.data.message);
		}
	}, [f_success, f_isError, f_error]);

	return (
		<ThemeProvider theme={darkTheme}>
			<DashboardLayout>
				<div className=''>
					<div className='px-4 py-20 sign-up-wrapper '>
						<Box
							className='flex flex-col gap-4 bg-slate-800 p-4 rounded-md w-[95%] md:w-7/12 mx-auto'
							noValidate
							autoComplete='off'
						>
							<h2 className='my-4 text-2xl text-center '>Update Salary</h2>

							<Box
								component='form'
								className='flex flex-col w-full gap-4 mx-auto rounded-md'
								noValidate
								autoComplete='off'
								onSubmit={handleSubmit}
							>
								<button
									className='bg-[#ffeb3b] hover:bg-[#c5b104] disabled:cursor-not-allowed font-semibold text-slate-700 py-2 rounded-md'
									disabled={isLoading || f_loading}
									onClick={() => updateUserSalary()}
								>
									{isLoading ? (
										<BeatLoader color='#000' size={10} />
									) : (
										'Update Hos Salary  '
									)}
								</button>
								<button
									className='bg-[#ffeb3b] hover:bg-[#c5b104] disabled:cursor-not-allowed font-semibold text-slate-700 py-2 rounded-md'
									disabled={f_loading || isLoading}
									onClick={() => updateFamilySalary()}
								>
									{f_loading ? (
										<BeatLoader color='#000' size={10} />
									) : (
										'Update Family Salary'
									)}
								</button>
							</Box>
						</Box>
					</div>
				</div>
			</DashboardLayout>
		</ThemeProvider>
	);
};

export default UpdateSalary;
