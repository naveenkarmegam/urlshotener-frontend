import axios from "axios";
import { config } from "../../../config/config";


export const login = async (value) => {
  try {
    const response = await axios.post(`${config.userApi}/login`,value);
   console.log(response)
    if (response.status===200) {
     localStorage.setItem("token",response.data.token)
    } 
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};


export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
export const logout = () => {
  localStorage.removeItem("token");
};
