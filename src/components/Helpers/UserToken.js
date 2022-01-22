import React,{useState,useEffect} from 'react';
import jwt_decode from "jwt-decode";
import axiosInstance from "./Axios";


export const TokenData = () =>{
    const [resources,setResource]=useState([]);
    if (localStorage.token) {
      const access_token = localStorage.token;
      var decoded = jwt_decode(access_token);
      const roleId = decoded.roleId;
      axiosInstance.get(`/dashboard/role/${roleId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `token ${access_token}`
        }
      })
        .then(res => {
          setResource(res.data.roleData.resources);
         
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return [resources]
}
