import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import useLogout from '../../customHooks/useLogout';

const apiCall = axios.create({
    baseURL: 'http://localhost:3000/app',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
})

export const useApi = (url: string, callOnMount: boolean = false, { method = 'GET', params, data, ...restConfig }: AxiosRequestConfig = {}) => {

    const [responseData, setResponseData] = useState<any>(null);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const logout = useLogout();

    const fetchData = async () => {
        setLoading(true);
        try {
            const response: AxiosResponse = await apiCall({
                url,
                method,
                data,
                params,
                ...restConfig
            });
            setResponseData(response.data);
            setError('');
        } catch (error: AxiosError | any) {
            if (error?.response?.status === 401) {
                logout();
              }
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(callOnMount) {
            fetchData();
        }
    }, [url, method, JSON.stringify(params), JSON.stringify(data)])

    return { data: responseData, error, loading, refetch: fetchData };
}