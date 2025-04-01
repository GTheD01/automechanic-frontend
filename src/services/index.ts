import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
});

const refreshAccessToken = async () => {
  const response = await apiClient.post("/auth/jwt/refresh-token");
  return response.data;
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      try {
        await refreshAccessToken();

        return apiClient(error.config);
      } catch (err) {
        console.error("Unable to refresh token", err);
        return Promise.reject(error);
      }
    }
  }
);

export default apiClient;
