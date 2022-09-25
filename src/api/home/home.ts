import request from '@/api/index'

/**
 * @description home
 * @param  
 * @returns 
 */
export function GetHomeList() {
    return request({
        url: 'home/list',
    })
}
