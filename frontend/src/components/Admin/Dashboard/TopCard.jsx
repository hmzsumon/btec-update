import React from 'react';

const TopCard = ({ agent, index }) => {
	return (
		<div className='p-2 border border-blue-700 rounded-md bg-slate-700'>
			<h3 className='text-xs italic font-semibold text-center'>
				Top {index + 1} Agent
			</h3>
			<div className='my-2 space-y-2 leading-tight text-gray-300 '>
				<div className='flex items-center justify-between'>
					<p className='text-xs italic font-semibold'>Name: {agent?.name}</p>
					<p className='text-xs italic font-semibold'>
						BTEC ID: {agent?.user_id}
					</p>
				</div>
				<div className='flex items-center justify-between'>
					<p className='text-xs italic font-semibold'>
						Total Coins: {Number(agent?.receive_coins).toLocaleString()}
					</p>
				</div>
			</div>
		</div>
	);
};

export default TopCard;
