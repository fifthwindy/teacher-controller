//统一api管理
import instance from "./axios";
const userLogin=(data)=>{
    //返回Promise对象
    return instance.request({
        url:'api/mobile/elogin', //url=baseUrl+url,
        method:'post',
        data,
        headers:{

        }
    })
}

const adminLogin=(data)=>{
    return instance.request({
        url:'',
        method:'',
        data
    })
}
//学校管理
const addSchool=(data)=>{
    return instance.request({
        url:'api/school/add',
        method:'post',
        data
    })
}
const deleteSchool=(params)=>{
    return instance.request({
        url:'api/school/delete',
        params
    })
}
const getSchools=()=>{
    return instance.request({
      url:'api/school/all',
      
      
  })
  }
  const getSchool=()=>{
    return instance.request({
      url:'api/school/one',
      
      
  })
  }
  const editSchool=(data)=>{
    return instance.request({
      url:'api/school/edit',
      method :'post',
     data
  })
  } 
  const checkSchool=(data)=>{
    return instance.request({
      url:'api/school/checkname',
      
     data
  })
  }
  //部门管理
  const addDepartment=(data)=>{
    return instance.request({
        url:'api/department/add',
        method:'post',
        data
    })
}
const deleteDepartment=(params)=>{
    return instance.request({
        url:'api/department/delete',
        params
    })
}
const getDepartments=()=>{
    return instance.request({
      url:'api/department/all',
      
      
  })
  }
  const getDepartment=()=>{
    return instance.request({
      url:'api/department/one',
      
      
  })
  }
  const editDepartment=(data)=>{
    return instance.request({
      url:'api/department/edit',
      method :'post',
     data
  })
  } 
  const checkDepartment=(data)=>{
    return instance.request({
      url:'api/department/check/{departName}',
      
     data
  })
  }
  //教师管理
  const addTeacher=(data)=>{
    return instance.request({
        url:'api/teacher/add',
        method:'post',
        data
    })
}
const deleteTeacher=(params)=>{
    return instance.request({
        url:'api/teacher/delete',
        params
    })
}
const getTeachers=()=>{
    return instance.request({
      url:'api/teacher/all',
      
      
  })
  }
  const getTeacher=()=>{
    return instance.request({
      url:'api/teacher/one',
      
      
  })
  }
  const editTeacher=(data)=>{
    return instance.request({
      url:'api/teacher/edit',
      method :'post',
     data
  })
  } 
  const addPaper=(data)=>{
    return instance.request({
      url:'api/paper/add',
      method :'post',
     data
  })
  } 
  const getPaper=(userID)=>{
    return instance.request({
      url:'api/paper/getPapers/'+userID,
      
     userID
  })
  } 
  const editPaper=(data)=>{
    return instance.request({
      url:'api/paper/edit',
      
     data
  })
  } 
  const deletePaper=(params)=>{
    return instance.request({
        url:'api/paper/delete',
        params
    })
}
  
  
const adminLogin1=function(data){
    return instance.request({
    url:'', 
    method:'post',
    data
})
}
// const getalldormitory = (data) => {
//     return instance.request({
//         url: 'api/dormitory/all',
//         data
//     })
// }
// //对应delete
// const deleteDormitory = (params) => {
//     return instance.request({
//         url: 'api/dormitory/delete',
//         params
//     })
// }
// //对应add
// const addDormitory = (data) => {
//     return instance.request({
//         url: 'api/dormitory/add',//看api文档
//         method: 'post',
//         data
//     })
// }
// //对应edit
// const editDormitory = (data) => {
//     return instance.request({
//         url: 'api/dormitory/edit',//改 
//         method: 'post',
//         data
//     })
// }
// //可有可无,没用到
// const getonedormitory = (data) => {
//     return instance.request({
//         url: 'api/dormitory/one',//改

//         data
//     })
// }
export {
    userLogin,
    adminLogin,
    getDepartment,getSchool,getTeacher,
    getSchools,getDepartments,getTeachers,
    editDepartment,editSchool,editTeacher,
    deleteDepartment,deleteSchool,deleteTeacher,
    addDepartment,addSchool,addTeacher,
    checkDepartment,checkSchool,
    getPaper,addPaper

} 