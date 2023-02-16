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

export const createNewUser = async (details, fileDetails) => {
  try {
    const res = await axiosInstance.post(createUser, {data: JSON.stringify(details), "files.attachment": fileDetails });
    return res;
  } catch (e) {
    console.log(e)
  }
}
