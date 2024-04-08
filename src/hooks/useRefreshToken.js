import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    return async () => {
        let refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
            console.log('REFRESH TOKEN is not set');
            return Promise.reject()
        }

        try {
            const response = await axios.post(
                '/authentication/refresh-token',
                { refreshToken: refreshToken },
                { withCredentials: true }
            );

            setAuth(prev => {
                return { ...prev, accessToken: response.data.accessToken }
            });
            localStorage.setItem('refreshToken', response?.data?.refreshToken);

            console.log('REFRESH SUCCESS');
            return Promise.resolve(response.data.accessToken);
        } catch (error) {
            console.log('REFRESH FAILURE');
            return Promise.reject(error)
        }
    };
};

export default useRefreshToken;
