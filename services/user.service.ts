import { getUsers, createUser } from "../constants/urls";
import axiosInstance from "./axios.instance";

export const getUserDetails = async () => {
  try {
    const res = await axiosInstance.get(getUsers);
    return res;
  } catch (e) {
    console.log(e)
  }
}

export const createNewUser = async (details) => {
  try {
    const res = await axiosInstance.post(createUser, {data: details} );
    return res;
  } catch (e) {
    console.log(e)
  }
}
