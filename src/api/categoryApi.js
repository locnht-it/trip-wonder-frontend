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
  return axios.post(
    `${REST_API_BASE_URL}/category/delete`,
    null, // Body can be null since we're only sending parameters
    {
      params: {
        id: categoryId,
      },
      headers: getHeaders(),
    }
  );
};

export const createCategory = (category) => {
  const name = encodeURIComponent(category.name); // Mã hóa tên
  return axios.post(`${REST_API_BASE_URL}/category/create?name=${name}`, null, {
    headers: getHeaders(),
  });
};

export const updateCategory = (categoryId, category) => {
  return axios.post(
    `${REST_API_BASE_URL}/category/update`,
    null, // Body can be null since we're only sending parameters
    {
      params: {
        id: categoryId,
        name: category.name,
      },
      headers: getHeaders(),
    }
  );
};

export const getNumberCategories = () => {
  return axios.get(REST_API_BASE_URL + "/category/get-number-of-category", {
    headers: getHeaders(),
  });
};
