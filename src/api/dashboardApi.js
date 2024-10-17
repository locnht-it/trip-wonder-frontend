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
