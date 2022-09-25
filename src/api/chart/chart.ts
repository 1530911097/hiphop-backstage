import request from '@/api/index'

/**
 * @description 查询
 * @param  
 * @returns 
 */
export function GetChartlist(params: any) {
  return request({
    url: 'chart/list',
    params
  })
}
/**
 * @description 查询
 * @param  
 * @returns 
 */
export function GetChartfosearse(params: any) {
  return request({
    url: 'chart/searse',
    params
  })
}

/**
 * @description 新增
 * @data   
 * @returns 
 */
export function PostChartAdd(data: any) {
  return request({
    url: 'chart/add',
    method: 'POST',
    data
  })
}

/**
* @description 删除
* @data   
* @returns 
*/
export function POSTCharRemove(data: any) {
  return request({
    url: 'chart/delete',
    method: 'POST',
    data
  })
}


/**
* @description 修改
* @data   
* @returns 
*/
export function POSTChartUpdata(data: any) {
  return request({
    url: 'chart/updata',
    method: 'POST',
    data
  })
}
