import axios from "axios";
import { getAuthToken } from "../components/auth/AuthContext";

const REST_API_BASE_URL = "https://tripwonder.onrender.com/api/v1";

const getHeaders = () => {
  return {
    Authorization: `Bearer ${getAuthToken()}`,
  };
};

export const editProfile = (profile) => {
  return axios.post(REST_API_BASE_URL + "/user/edit-profile", profile, {
    headers: getHeaders(),
  });
};
