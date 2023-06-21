import React from 'react';
import Layout from '../Layout/Layout';
import { useGetTop50FamilyAdminQuery } from '../../../features/admin/adminApi';
import { FadeLoader } from 'react-spinners';
import TopCard from '../../Admin/Dashboard/TopCard';

const TopFamilies = () => {
	const { data: topData, isLoading: top5Loading } =
		useGetTop50FamilyAdminQuery();
	const { topFamilies } = topData || {};
	return (
		<Layout>
			{top5Loading ? (
				<h1>Loading...</h1>
			) : (
				<div>
					<h2 className='my-4 text-2xl font-semibold text-center '>
						Top 50 Agent
					</h2>
					<div className='grid grid-cols-1 gap-4 md:grid-cols-4 '>
						{top5Loading ? (
							<div className='flex items-center justify-center w-full h-screen'>
								<FadeLoader color={'#fbbf24'} />
							</div>
						) : (
							topFamilies?.map((agent, i) => (
								<TopCard key={agent._id} agent={agent} index={i} />
							))
						)}
					</div>
				</div>
			)}
		</Layout>
	);
};

export default TopFamilies;
