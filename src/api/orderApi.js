import axios from "axios";
import { getAuthToken } from "../components/auth/AuthContext";

const REST_API_BASE_URL = "https://tripwonder.onrender.com/api/v1";

const getHeaders = () => {
  return {
    Authorization: `Bearer ${getAuthToken()}`,
  };
};

export const getAllOrders = (page, size) => {
  return axios.get(REST_API_BASE_URL + "/order/getAllOrder", {
    params: {
      Page: page,
      PageSize: size,
    },
    headers: getHeaders(),
  });
};

export const getOrderDetail = (orderId) => {
  return axios.get(`${REST_API_BASE_URL}/order/getOrderDetail/${orderId}`, {
    headers: getHeaders(),
  });
};
