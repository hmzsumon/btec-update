import { apiSlice } from '../api/apiSlice';

export const adminApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// Get company info
		getCompanyAdmin: builder.query({
			query: () => '/admin/company',
			providesTags: ['Company'],
		}),

		// get table info
		getTableAdmin: builder.query({
			query: () => '/tables',
			providesTags: ['Table'],
		}),

		// get salary info
		getSalaryAdmin: builder.query({
			query: () => '/salary',
			providesTags: ['Salary'],
		}),

		// get agent list
		getAgentAdmin: builder.query({
			query: () => '/admin/agents',
			providesTags: ['Agent'],
		}),

		// get family salary info by id
		getFamilySalaryAdmin: builder.query({
			query: (id) => `/family/salary/${id}`,
			providesTags: ['FamilySalary'],
		}),

		// get top 5 agent
		getTopAgentAdmin: builder.query({
			query: () => '/top5',
			providesTags: ['TopAgent'],
		}),

		// get top 10 host
		getTopHostAdmin: builder.query({
			query: () => '/top10',
			providesTags: ['TopHost'],
		}),

		// reset password admin
		resetPasswordAdmin: builder.mutation({
			query: (data) => ({
				url: '/reset-password',
				method: 'PUT',
				body: data,
			}),
		}),

		// get all host
		getAllHostAdmin: builder.query({
			query: () => '/hosts',
			providesTags: ['AllHost'],
		}),

		// get coins
		getCoinsAdmin: builder.query({
			query: () => '/mysql-coins',
			providesTags: ['Coins'],
		}),

		// update user salary
		updateUserSalary: builder.mutation({
			query: () => ({
				url: '/host/salary',
				method: 'PUT',
			}),
		}),

		// update family salary
		updateFamilySalary: builder.mutation({
			query: () => ({
				url: '/update/family/salary',
				method: 'PUT',
			}),
		}),

		// top 50 host
		getTop50HostAdmin: builder.query({
			query: () => '/top-hosts',
			providesTags: ['Top50Host'],
		}),

		// top 50 families
		getTop50FamilyAdmin: builder.query({
			query: () => '/top-family',
			providesTags: ['Top50Family'],
		}),
	}),
});

export const {
	useGetCompanyAdminQuery,
	useGetTableAdminQuery,
	useGetSalaryAdminQuery,
	useGetAgentAdminQuery,
	useGetFamilySalaryAdminQuery,
	useGetTopAgentAdminQuery,
	useGetTopHostAdminQuery,
	useResetPasswordAdminMutation,
	useGetAllHostAdminQuery,
	useGetCoinsAdminQuery,
	useGetTop50HostAdminQuery,
	useGetTop50FamilyAdminQuery,
	useUpdateUserSalaryMutation,
	useUpdateFamilySalaryMutation,
} = adminApi;
