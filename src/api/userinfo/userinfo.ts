import request from '@/api/index'

/**
 * @description 查询
 * @param  
 * @returns 
 */
export function GetUserinfoList(params: any) {
  return request({
    url: 'Userinfo/list',
    params
  })
}
/**
 * @description 查询
 * @param  
 * @returns 
 */
export function GetUserinfosearse(params: any) {
  return request({
    url: 'Userinfo/searse',
    params
  })
}

/**
 * @description 新增
 * @data   
 * @returns 
 */
export function PostUserinfoAdd(data: any) {
  return request({
    url: 'Userinfo/add',
    method: 'POST',
    data
  })
}

/**
* @description 删除
* @data   
* @returns 
*/
export function POSTUserinfoRemove(data: any) {
  return request({
    url: 'Userinfo/delete',
    method: 'POST',
    data
  })
}


/**
* @description 修改
* @data   
* @returns 
*/
export function POSTUserinfoUpdata(data: any) {
  return request({
    url: 'Userinfo/updata',
    method: 'POST',
    data
  })
}
