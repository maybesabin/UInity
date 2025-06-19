import { User } from "@/types/User";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const loginUser = async (data: { email: string, password: string }) => {
    const res = await axios.post(`${url}/api/auth/login`, data);
    return res.data
}

export const signupUser = async (data: Partial<User>) => {
    const res = await axios.post(`${url}/api/auth/signup`, data);
    console.log(res.data)
    return res.data
}