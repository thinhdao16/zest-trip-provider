// apiInterceptors.js
import axios from "axios";

const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem("access_token");
    if (token !== null) {
      const parsedToken = JSON.parse(token); // Parse the JSON token
      return parsedToken;
    }
    return null; // Handle the case when token is not found or null
  };
export const isTokenExpired = (tokenPayload:any) => {
  if (!tokenPayload || !tokenPayload.exp) {
    return true; // If payload or expiration time is missing, consider token expired
  }
  
  const expirationTimeInSeconds = tokenPayload.exp;
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  
  return expirationTimeInSeconds < currentTimeInSeconds;
};

export const refreshAccessToken = async () => {
  // Tương tự như bạn đã làm trong mã của bạn
};

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = getTokenFromLocalStorage()?.access_token;
    // Check if token is expired
    if (isTokenExpired(accessToken)) {
      return refreshAccessToken()
        .then((newAccessToken) => {
          // Update the request's authorization header with new token
          config.headers.Authorization = `Bearer ${newAccessToken}`;
          return config;
        })
        .catch((error) => {
          // Handle refresh token error
          throw error;
        });
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
