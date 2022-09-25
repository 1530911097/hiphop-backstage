import request from '@/api/index'

//新增数据
export function  Postteacher(data :any){
   return request({
     url:'teacher/add',
     method:'POST',
     data
   })
}
//获取
export function  Getteacher(params :any){
    return request({
      url:'teacher/list',
      params
    })
 }


 //删除
 export function  Postdelebe(data:any){
    return request({
      url:'teacher/remove',
      method:'POST',
      data
    })
 }

 //查询
 export function  Postteacherlist(params:any){
  return request({
    url:'teacher/searse',
    params
  })
}

 
  //修改数据
  export function  Postupdata(data:any){
    return request({
      url:'teacher/updata',
      method:'POST',
      data
    })
 }
