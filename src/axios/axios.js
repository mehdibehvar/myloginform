import axios from "axios"

export const  fetchToken= async (username,password)=>{
return axios.post("http://localhost:3001/login",{username,password})
.then(response=>response.data)
}
export const fetchUserData=async (token)=>{
 return  axios.get('http://localhost:3001/users/me',{
   headers: {
    authorization: token
    }
  }).then(response=>response.data)
}