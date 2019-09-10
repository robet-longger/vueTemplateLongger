import axios from 'axios'
import { Message } from 'element-ui'
// import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
// import router from '@/router/index.js'

import { showLoading, hideLoading } from '@/utils/loading';

const service = axios.create({
  baseURL: '/api', // url = base url + request url
  withCredentials: false, // 请求头是否携带cookies（设置为true会发生跨越）
  timeout: 5000 // request timeout
})

// 请求拦截
service.interceptors.request.use(
  config => {
    showLoading()
    const token = getToken()
    config.headers['Authorization'] = token
    return config
    // if (token) {
    //   config.headers['Authorization-Token'] = token
    //   return config
    // } else {
    //   router.replace({
    //     path: '/login' // 到登录页重新获取token
    //   })
    // }

  },
  error => {
    // do something with request error
    hideLoading();
    console.log(error) // for debug
    return Promise.reject('error')
  }
)

//响应拦截
service.interceptors.response.use(
  response => {
    hideLoading();
    if (response.data.code === 0) {
      return response
    } else {
      Message({
        message: response.data.msg,
        type: 'error',
        duration: 3 * 1000
      })
    }
  },
  (error) => {
    console.log(error.response.status);
    var curMsg = ''
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          curMsg = '错误请求'
          break;
        case 400:
          curMsg = '错误请求'
          break;
        case 401:
          curMsg = '未授权，请重新登录'
          setTimeout(() => {
            removeToken()
            location.reload()
            // store.dispatch('user/resetToken').then(() => {
            //   location.reload()
            // })
          }, 1000);

          break;
        case 403:
          curMsg = '拒绝访问'
          break;
        case 404:
          curMsg = '请求错误，未找到该资源'
          break;
        case 405:
          curMsg = '请求方法未允许'
          break;
        case 408:
          curMsg = '请求超时'
          break;
      }
    }
    hideLoading();
    Message({
      message: curMsg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
