import request from '@/api/index'


/**
 * @description 查询
 * @param  
 * @returns 
 */
export function  GetStudentList(params: any){
  return request({
    url:'student/list',
    params
  })
}



/**
 * @description 新增
 * @data   
 * @returns 
 */
export function  PostStudentAdd(data :any){
   return request({
     url:'student/add',
     method:'POST',
     data
   })
}
 //查询
 export function  PostStudentlist(params:any){
  return request({
    url:'student/newlist',
    params
  })
}

 /**
 * @description 删除
 * @data   
 * @returns 
 */
 export function  POSTStudentRemove(data:any){
    return request({
      url:'student/remove',
      method:'POST',
      data
    })
 }


  /**
 * @description 修改
 * @data   
 * @returns 
 */
  export function  POSTStudentUpdata(data:any){
    return request({
      url:'student/updata',
      method:'POST',
      data
    })
 }
