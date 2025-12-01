import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse, type AxiosError } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError<{ message?: string }>): Promise<AxiosError> => {
    if (error.response) {
      const { status, data } = error.response;

      const statusHandlers = new Map<number, () => void>([
        [401, () => void 0],
        [404, () => void 0]
      ]);

      const handler = statusHandlers.get(status) || (status >= 500 ? () => void 0 : null);
      if (handler) {
        handler();
      }

      error.message = data?.message || error.message || 'Request failed';
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

