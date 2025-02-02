import axios from 'axios';

const apiCall = axios.create({
  baseURL: 'http://localhost:3000/app',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

const apiCallWithoutToken = axios.create({
    baseURL: 'http://localhost:3000/app',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});


export const sendLoginOtpApi = (data: any) => {
    return apiCallWithoutToken.post('/login_by_phone', data);
}

export const loginWithOtpApi = (data: any) => {
    return apiCallWithoutToken.post('/login_update_token', data);
}

export const get = (url: string, params?: any) => {
    return apiCall.get(url, { params });
};

export const post = (url: string, data: any) => {
    return apiCall.post(url, data);
};

export const put = (url: string, data: any) => {
    return apiCall.put(url, data);
};

export const del = (url: string) => {
    return apiCall.delete(url);
};