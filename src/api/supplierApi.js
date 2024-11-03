import axios from "axios";
import { getAuthToken } from "../components/auth/AuthContext";

const REST_API_BASE_URL = "https://tripwonder.onrender.com/api/v1";

const getHeaders = () => {
  return {
    Authorization: `Bearer ${getAuthToken()}`,
  };
};

export const listSuppliers = (page, pageSize) => {
  return axios.get(REST_API_BASE_URL + "/supplier/get", {
    params: {
      page: page,
      pageSize: pageSize,
    },
    headers: getHeaders(),
  });
};

export const getSupplierById = (id) => {
  return axios.get(REST_API_BASE_URL + "/supplier/get", {
    params: {
      id: id,
    },
    headers: getHeaders(),
  });
};

export const deleteSupplier = (id) => {
  return axios.delete(REST_API_BASE_URL + "/supplier/delete", {
    params: {
      id: id,
    },
    headers: getHeaders(),
  });
};

export const createSupplier = (supplier) => {
  return axios.post(REST_API_BASE_URL + "/supplier/create", supplier, {
    headers: getHeaders(),
  });
};

export const updateSupplier = (supplier) => {
  return axios.put(REST_API_BASE_URL + "/supplier/update", supplier, {
    headers: getHeaders(),
  });
};
