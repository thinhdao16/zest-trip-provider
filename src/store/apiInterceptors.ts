import jwt_decode from "jwt-decode";
// apiInterceptors.js
import axios from "axios";

export const BASE_URL = "https://manager-ecom-cllh63fgua-df.a.run.app";

const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("access_token");
  return token;
};
const getRefeshTokenFromLocalStorage = () => {
  const token = localStorage.getItem("refresh_token");
  // if (token !== null) {
  //   const parsedToken = JSON.parse(token);
  //   return parsedToken;
  // }
  return token;
};

export const isTokenExpired = (tokenPayload: any) => {
  const decodedToken: any = jwt_decode(tokenPayload);
  const expirationTimeInSeconds = decodedToken.exp;
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  return expirationTimeInSeconds < currentTimeInSeconds;
};

const refreshToken = async () => {
  const refreshToken = getRefeshTokenFromLocalStorage();
  if (refreshToken) {
    try {
      const refreshResponse = await axios.post(`${BASE_URL}/auth/refresh`,null, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          // "Content-Type": "application/json",
        },
      });
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
    const accessToken = getTokenFromLocalStorage();
    console.log(accessToken)
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
