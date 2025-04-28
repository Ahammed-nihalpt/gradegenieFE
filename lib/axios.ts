import axios from "axios";
import { getSession } from "next-auth/react"; // Import getSession

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session?.user.accessToken) {
      config.headers.authorization = `${session?.user.accessToken}`;
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

export default api;
