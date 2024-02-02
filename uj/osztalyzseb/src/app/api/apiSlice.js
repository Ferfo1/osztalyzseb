import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {

} from "../../features/authSlice";


const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost/api",
    credentials: "include",
    prepareHeaders: (headers) => {
        return headers;
    },
});

const baseQueryWithRetry = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithRetry,
    // eslint-disable-next-line no-unused-vars
    endpoints: (_builder) => ({}),
});