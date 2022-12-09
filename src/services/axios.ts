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
    const { status } = response;
    if (status === 401) {
      store.dispatch(signOut({}));
    } else if (status === 403) {
      store.dispatch(openAlert({ message: 'Bạn chưa là admin', variant: 'error' }));
      store.dispatch(signOut({}));
    } else {
      store.dispatch(openAlert({ message: 'Đã có lỗi xảy ra', variant: 'error' }));
    }
  }
  return Promise.reject(error);
};

const client = axios.create({ baseURL: API_URL });
client.interceptors.request.use(beforeRequest);
client.interceptors.response.use(({ data }) => data, onError);

client.defaults.transformResponse = [...(axios.defaults.transformResponse as []), (data) => data.data];

export { client };
