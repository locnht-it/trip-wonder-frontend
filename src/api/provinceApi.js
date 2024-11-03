import axios from "axios";
import { getAuthToken } from "../components/auth/AuthContext";

const REST_API_BASE_URL = "https://tripwonder.onrender.com/api/v1";

const getHeaders = () => {
  return {
    Authorization: `Bearer ${getAuthToken()}`,
  };
};

export const listProvinces = (page, limit) => {
  return axios.get(REST_API_BASE_URL + "/province/get-all", {
    params: {
      page: page,
      limit: limit,
    },
    headers: getHeaders(),
  });
};

export const deleteProvince = (provinceId) => {
  return axios.post(
    `${REST_API_BASE_URL}/province/delete`,
    null, // Body can be null since we're only sending parameters
    {
      params: {
        id: provinceId,
      },
      headers: getHeaders(),
    }
  );
};

export const createProvince = (province) => {
  const name = encodeURIComponent(province.name); // Mã hóa tên
  return axios.post(`${REST_API_BASE_URL}/province/create?name=${name}`, null, {
    headers: getHeaders(),
  });
};

export const updateProvince = (provinceId, province) => {
  return axios.post(
    `${REST_API_BASE_URL}/province/update`,
    null, // Body can be null since we're only sending parameters
    {
      params: {
        id: provinceId,
        name: province.name,
      },
      headers: getHeaders(),
    }
  );
};

export const getNumberProvinces = () => {
  return axios.get(REST_API_BASE_URL + "/province/get-number-of-province", {
    headers: getHeaders(),
  });
};
