import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchUserProfile = async () => {
    const token = localStorage.getItem("token")
    const res = await axios.get(`${url}/api/user/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    useAuthStore.getState().setUser(res.data.user)
}