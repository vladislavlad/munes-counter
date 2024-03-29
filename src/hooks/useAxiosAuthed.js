import { axiosAuthed } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosAuthed = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        const requestIntercept = axiosAuthed.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosAuthed.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosAuthed(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosAuthed.interceptors.request.eject(requestIntercept);
            axiosAuthed.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return axiosAuthed;
}

export default useAxiosAuthed;
