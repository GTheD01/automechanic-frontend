import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
});

const refreshAccessToken = async () => {
  const response = await apiClient.post("/auth/jwt/refresh-token");
  return response.data;
};

let isRefreshing = false;

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401 && !isRefreshing) {
      isRefreshing = true;
      try {
        await refreshAccessToken();

        return apiClient(error.config);
      } catch (err) {
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }
  }
);

export default apiClient;
