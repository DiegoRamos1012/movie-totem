import axios from "axios";

export const registerUser = async (payload: {
    name: string;
    email: string;
    password: string;
}) => {
    return axios.post("/api/auth/register", payload)
}