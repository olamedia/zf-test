import { AxiosInstance } from 'axios';

declare module 'vue/types/vue' {
  interface Vue{
    axios: AxiosInstance;
    $axios: AxiosInstance;
  }
  interface VueConstructor{
    axios: AxiosInstance;
  }
}

declare global {
  interface Window {
    axios: AxiosInstance;
  }
}
