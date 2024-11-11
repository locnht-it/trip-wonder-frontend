import axios from "axios";
import { getAuthToken } from "../components/auth/AuthContext";

const REST_API_BASE_URL = "https://tripwonder.onrender.com/api/v1";

const getHeaders = () => {
  return {
    Authorization: `Bearer ${getAuthToken()}`,
  };
};

export const listTours = (page, size) => {
  return axios.get(REST_API_BASE_URL + "/packageOff/get/admin", {
    params: {
      page: page,
      size: size,
    },
    headers: getHeaders(),
  });
};

export const createTour = (tour) => {
  return axios.post(REST_API_BASE_URL + "/packageOff/create", tour, {
    headers: getHeaders(),
  });
};

export const getTourById = (id) => {
  return axios.get(REST_API_BASE_URL + "/packageOff/get-package-tour-by-id", {
    params: {
      packageOfficialId: id,
    },
    headers: getHeaders(),
  });
};

export const getDetailLocationTourById = (id) => {
  return axios.get(`${REST_API_BASE_URL}/packageOff/get-detail-tour/${id}`, {
    headers: getHeaders(),
  });
};

export const changeStatusTour = (tourId) => {
  return axios.post(
    `${REST_API_BASE_URL}/packageOff/change-status/${tourId}`,
    null,
    {
      headers: getHeaders(),
    }
  );
};
