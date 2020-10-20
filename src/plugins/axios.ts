import Vue, { VueConstructor } from 'vue';
import axios from 'axios';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const axiosInstance = axios.create(config);

axiosInstance.interceptors.request.use(
  (axiosConfig) => axiosConfig,
  (error) => Promise.reject(error),

);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),

);

// export type PluginFunction<T> = (Vue: typeof _Vue, options?: T) => void;
// eslint-disable-next-line no-shadow
export function AxiosPlugin<AxiosPlugOptions>(
  vm: VueConstructor,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options?: AxiosPluginOptions,
): void {
  // eslint-disable-next-line no-param-reassign
  vm.axios = axiosInstance;
  window.axios = axiosInstance;
  Object.defineProperties(vm.prototype, {
    axios: {
      get() {
        return axiosInstance;
      },
    },
    $axios: {
      get() {
        return axiosInstance;
      },
    },
  });
}

export class AxiosPluginOptions {
  // add stuff
}

Vue.use(AxiosPlugin);

export default AxiosPlugin;
