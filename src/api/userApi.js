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

export const changePassword = (email, password) => {
  return axios.post(
    `${REST_API_BASE_URL}/auth/change-password?email=${encodeURIComponent(
      email
    )}&password=${encodeURIComponent(password)}`,
    null,
    { headers: getHeaders() }
  );
};

export const getAllUsers = (page, size) => {
  return axios.get(REST_API_BASE_URL + "/user/get-all-user", {
    params: {
      page: page,
      limit: size,
    },
    headers: getHeaders(),
  });
};

export const createUser = (user) => {
  return axios.post(REST_API_BASE_URL + "/user/create-staff", user, {
    headers: getHeaders(),
  });
};

export const getUserById = (id) => {
  return axios.get(REST_API_BASE_URL + "/user/get-user-by-id", {
    params: {
      userId: id,
    },
    headers: getHeaders(),
  });
};

export const changeStatusUser = (id) => {
  return axios.post(REST_API_BASE_URL + "/user/status", null, {
    params: {
      userId: id,
    },
    headers: getHeaders(),
  });
};
