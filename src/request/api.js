import request from './http.js'

export function login(data) {
  return request({
    url: '/client/v1/auth/login',
    method: 'post',
    params: data
  })
}
