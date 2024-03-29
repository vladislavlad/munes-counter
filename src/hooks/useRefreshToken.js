import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    return async () => {
        const response = await axios.post(
            '/authentication/refresh-token',
            { refreshToken: localStorage.getItem('refreshToken') },
            { withCredentials: true }
        );

        setAuth(prev => {
            return { ...prev, accessToken: response.data.accessToken }
        });
        localStorage.setItem('refreshToken', response?.data?.refreshToken);

        return response.data.accessToken;
    };
};

export default useRefreshToken;
