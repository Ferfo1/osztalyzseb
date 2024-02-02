import { apiSlice } from "../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
          query: (email, password) => ({
                url: '/login.php',
                method: 'POST',
                body: {
                    email: email, 
                    password: password
                }
            })
        })
    }),
    overrideExisting: false, 
})

export const {useLoginMutation} = usersApiSlice;
