import axios from "axios";

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL as string) ?? "http://localhost:4000",
});

export const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  return api.post("/api/auth/register", payload);
};
