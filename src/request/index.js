import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:9000/', // 设置默认的请求地址
  timeout: 5000, // 设置默认的超时时间
});

// 添加请求拦截器  （注意，不一定非要添加这种拦截器，具体怎么二次封装 就要看业务需求了）
axiosInstance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，例如添加请求头、处理请求参数等
    return config;
  },
  (error) => {
    // 请求错误时做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    // 对响应数据做些什么，例如统一处理错误状态码、数据转换等
    return response.data;
  },
  (error) => {
    // 响应错误时做些什么
    return Promise.reject(error);
  }
);

export default axiosInstance;
