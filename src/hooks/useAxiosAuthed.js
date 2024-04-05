import { axiosAuthed } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosAuthed = () => {
    const { auth } = useAuth();
    const refresh = useRefreshToken();

    useEffect(() => {

        const requestIntercept = axiosAuthed.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${ auth?.accessToken }`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosAuthed.interceptors.response.use(
            response => response,
            async (error) => {
                const originalRequestConfig = error?.config;

                console.log('AUTH AXIOS', auth)
                console.log('IS RETRY', originalRequestConfig?.isRetry)

                if (error?.response?.status === 401 && !originalRequestConfig?.isRetry) {
                    originalRequestConfig.isRetry = true;
                    try {
                        return refresh()
                            .then(accessToken => {
                                    originalRequestConfig.headers['Authorization'] = `Bearer ${ accessToken }`;
                                    return axiosAuthed(originalRequestConfig)
                                }
                            )
                    } catch {
                        console.log('REFRESH ERROR', error)
                    }
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
