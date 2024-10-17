import axios from "axios";
import { getAuthToken } from "../components/auth/AuthContext";

const REST_API_BASE_URL = "http://localhost:8080/api/v1";

const getHeaders = () => {
  return {
    Authorization: `Bearer ${getAuthToken()}`,
  };
};
