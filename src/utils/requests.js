import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
})

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.data.status !== 200) {
      ElMessage.error(response.data.msg || '服务异常')
      return Promise.reject(response.data)
    }
    return response.data
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response) {
      if (error.response.status === 401) {
        router.push('/login')
      }
      ElMessage.error(error.response.data?.msg || '服务异常')
    }
    // 无响应的情况（断网、超时）
    else if (error.request) {
      ElMessage.error('网络异常，请检查连接')
    }
    // 其他错误（比如配置错误）
    else {
      ElMessage.error('请求配置错误')
    }
    return Promise.reject(error)
  }
)

export default instance
