import axios, { AxiosError, type AxiosRequestConfig } from "axios";

export const AXIOS_INSTANCE = axios.create({
  baseURL: "https://app.ftoyd.com/fronttemp-service/",
  withCredentials: false,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});


export const requestInstance = async <T>(
  config: AxiosRequestConfig
): Promise<T> => {
  const source = axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};

export type ErrorType<Error> = AxiosError<Error>;