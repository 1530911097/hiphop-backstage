import request from '@/api/index'


/**
 * @description 登录
 * @param data 
 * @returns 
 */
export function Postlogin(data: any) {
    return request({
        url: '/users/login',
        method: 'POST',
        data
    })
}


/**
 * @description 注册
 * @param data 
 * @returns 
 */
export function Postregister(data: any) {
    return request({
        url: '/users/register',
        method:'POST',
        data
    })
}



/**
 * @description 修改用户信息
 * @param data 
 * @returns 
 */
 export function Postputinfo(data: any) {
    return request({
        url: '/users/putinfo',
        method: 'POST',
        data
    })
}


export function Getinfo() {
    return request({
        url: '/users/info'
    })
}
/**
 * @description 修改密码
 * @param data 
 * @returns 
 */
export function Postrepair(data: any) {
    return request({
        url: '/users/patch',
        method: 'POST',
        data
    })
}