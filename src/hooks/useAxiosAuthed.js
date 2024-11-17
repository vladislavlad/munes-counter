import { axiosAuthed } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosAuthed = () => {
    const { auth } = useAuth();
    const refresh = useRefreshToken();

    useEffect(() => {

        const requestIntercept = axiosAuthed.interceptors.request.use(
            requestConfig => {
                if (!requestConfig.headers['Authorization']) {
                    requestConfig.headers['Authorization'] = `Bearer ${ auth?.accessToken }`;
                }
                return requestConfig;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosAuthed.interceptors.response.use(
            response => response,
            async (error) => {
                const originalRequestConfig = error?.config;

                console.log('Request error. Current auth: ', auth)
                console.log('Request error. Is retry: ', originalRequestConfig?.isRetry)

                if (error?.response?.status === 401 && !originalRequestConfig?.isRetry) {
                    originalRequestConfig.isRetry = true;

                    return refresh()
                        .then(accessToken => {
                            originalRequestConfig.headers['Authorization'] = `Bearer ${ accessToken }`;
                            return axiosAuthed(originalRequestConfig)
                        })
                }
                return Promise.reject();
            }
        );

        return () => {
            axiosAuthed.interceptors.request.use(requestIntercept);
            axiosAuthed.interceptors.response.use(responseIntercept);
        }
    }, [auth, refresh])

    return axiosAuthed;
}

export default useAxiosAuthed;
