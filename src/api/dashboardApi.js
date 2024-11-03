import axios from "axios";
import { getAuthToken } from "../components/auth/AuthContext";

const REST_API_BASE_URL = "https://tripwonder.onrender.com/api/v1";

const getHeaders = () => {
  return {
    Authorization: `Bearer ${getAuthToken()}`,
  };
};

export const getNumberOfCustomerForEachMonth = (month, year) => {
  return axios.get(
    REST_API_BASE_URL + "/user/get-number-of-users-by-month-year",
    {
      params: {
        month: month,
        year: year,
      },
      headers: getHeaders(),
    }
  );
};

export const getTotalRevenues = () => {
  return axios.get(REST_API_BASE_URL + "/dashboard/totalRevenues", {
    headers: getHeaders(),
  });
};

export const getTotalSuppliers = () => {
  return axios.get(REST_API_BASE_URL + "/dashboard/totalSuppliers", {
    headers: getHeaders(),
  });
};

export const getTotalTours = () => {
  return axios.get(REST_API_BASE_URL + "/dashboard/totalTours", {
    headers: getHeaders(),
  });
};

export const getTotalOrders = () => {
  return axios.get(REST_API_BASE_URL + "/dashboard/totalOrders", {
    headers: getHeaders(),
  });
};

export const getTotalGender = () => {
  return axios.get(REST_API_BASE_URL + "/dashboard/totalGender", {
    headers: getHeaders(),
  });
};

export const getTopFiveTours = () => {
  return axios.get(REST_API_BASE_URL + "/dashboard/topFiveTours", {
    headers: getHeaders(),
  });
};

export const getTopFiveOrders = () => {
  return axios.get(REST_API_BASE_URL + "/dashboard/topFiveOrder", {
    headers: getHeaders(),
  });
};
