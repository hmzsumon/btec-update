import React from 'react';
import Layout from '../Layout/Layout';
import { useGetTopHostAdminQuery } from '../../../features/admin/adminApi';
import { FadeLoader } from 'react-spinners';
import TopHost from '../../Admin/Dashboard/TopHost';

const TopHosts = () => {
	const { data: top10, isLoading: top10Loading } = useGetTopHostAdminQuery();
	const { top10Host } = top10 || {};
	return (
		<Layout>
			{top10Loading ? (
				<h1>Loading...</h1>
			) : (
				<div>
					<h2 className='my-4 text-2xl font-semibold text-center '>
						Top 50 Hosts
					</h2>
					<div className='grid grid-cols-1 gap-4 md:grid-cols-4 '>
						{top10Loading ? (
							<div className='flex items-center justify-center w-full h-screen'>
								<FadeLoader color={'#fbbf24'} />
							</div>
						) : (
							top10Host?.map((host, i) => (
								<TopHost key={host._id} host={host} index={i} />
							))
						)}
					</div>
				</div>
			)}
		</Layout>
	);
};

export default TopHosts;
