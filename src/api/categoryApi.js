import axios from "axios";
import { getAuthToken } from "../components/auth/AuthContext";

const REST_API_BASE_URL = "https://tripwonder.onrender.com/api/v1";

const getHeaders = () => {
  return {
    Authorization: `Bearer ${getAuthToken()}`,
  };
};

export const listCategories = (page, limit) => {
  return axios.get(REST_API_BASE_URL + "/category/get-all", {
    params: {
      page: page,
      limit: limit,
    },
    headers: getHeaders(),
  });
};

export const deleteCategory = (categoryId) => {
  return axios.delete(REST_API_BASE_URL + "/category/delete/" + categoryId, {
    headers: getHeaders(),
  });
};

export const createCategory = (category) => {
  return axios.post(REST_API_BASE_URL + "/category/save", category, {
    headers: getHeaders(),
  });
};

export const updateCategory = (categoryId, category) => {
  return axios.put(
    REST_API_BASE_URL + "/destination/update/" + categoryId,
    category,
    {
      headers: getHeaders(),
    }
  );
};
