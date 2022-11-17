import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { API_URL } from 'env';
import { openAlert } from 'reducers/notificationSlice';
import { ProfileState, signOut } from 'reducers/profileSlice';
import { store } from 'reducers/store';

const beforeRequest = (config: AxiosRequestConfig) => {
  const { isLoggedIn, accessToken }: ProfileState = store.getState().profile;
  if (isLoggedIn) {
    Object.assign(config.headers as any, {
      Authorization: `Bearer ${accessToken}`,
    });
  }
  try {
    if (config.data instanceof FormData) {
      Object.assign(config.headers as any, { 'Content-Type': 'multipart/form-data' });
    }
  } catch {}
  return config;
};

const onError = async (error: AxiosError) => {
  const { response } = error;
  if (response) {
    const { status, data } = response;
    if (status === 401) {
      store.dispatch(signOut({}));
    } else {
      const message = (data as any).message ?? 'Đã có lỗi xảy ra';
      store.dispatch(openAlert({ message, variant: 'error' }));
    }
  }
  return Promise.reject(error);
};

const client = axios.create({ baseURL: API_URL });
client.interceptors.request.use(beforeRequest);
client.interceptors.response.use(({ data }) => data, onError);

client.defaults.transformResponse = [...(axios.defaults.transformResponse as []), (data) => data];

export { client };
