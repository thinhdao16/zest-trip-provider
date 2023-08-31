import jwt_decode from "jwt-decode";
// apiInterceptors.js
import axios from "axios";

export const BASE_URL = "https://manager-ecom-cllh63fgua-df.a.run.app";

const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("access_token");
  if (token !== null) {
    const parsedToken = JSON.parse(token);
    return parsedToken;
  }
  return null;
};

export const isTokenExpired = (tokenPayload: any) => {
  // if (!tokenPayload || !tokenPayload.exp) {
  //   return true;
  // }

  const decodedToken: any = jwt_decode(tokenPayload);
  const expirationTimeInSeconds = decodedToken.exp;
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  return expirationTimeInSeconds < currentTimeInSeconds;
};

const refreshToken = async () => {
  const refreshToken = getTokenFromLocalStorage()?.refresh_token;
  if (refreshToken) {
    try {
      const refreshResponse = await axios.post(`${BASE_URL}/auth/refresh`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          "Content-Type": "application/json",
        },
      });
      console.log(refreshResponse);
      const newAccessToken = refreshResponse.data.access_token;
      localStorage.setItem("access_token", newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error("Failed to refresh access token:", error);
      throw new Error("Failed to refresh access token");
    }
  } else {
    throw new Error("No refresh token available");
  }
};

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = getTokenFromLocalStorage()?.access_token;
    if (accessToken) {
      if (isTokenExpired(accessToken)) {
        const newAccessToken = await refreshToken();
        config.headers.Authorization = `Bearer ${newAccessToken}`;
      } else {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
