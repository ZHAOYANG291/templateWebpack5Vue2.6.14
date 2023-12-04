import  http from "../index"

export const requestData1=()=>{ http.get('requestData1')  }

export const requestData2=()=>{ http.post('requestData1',{name:"王大崔",age:18})  }