import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { getToken } from '@/utils/user'
import { ElMessage } from "element-plus";
const instance = axios.create({
  baseURL: 'http://124.223.81.104:3000',
  // baseURL: 'http://192.168.3.133:3000',
  timeout: 2500
})

//请求前拦截器
instance.interceptors.request.use(function (config: AxiosRequestConfig) {
  const token = getToken()
  if (token) {
    config.headers = {
      Authorization: 'Bearer ' + token,
    }
  }
  return config
}),

  //请求后响应拦截
  instance.interceptors.response.use(function (res: AxiosResponse) {
    return res
  }, (error) => {
    console.log(error.response.data.code);
    if (error.response.data.code == 10101 || error.response.data.code == 10102) {
      window.location.replace('/#/login')
      ElMessage.error("登录过期");
    } else {
      ElMessage.error(error.response.data.message);
    }
  });


const request = async <T = any>(
  config: AxiosRequestConfig
): Promise<any> => {
  const { data } = await instance.request(config)
  return data
}

export default request