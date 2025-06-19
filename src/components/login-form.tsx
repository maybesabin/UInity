"use client"

import { useAuthStore } from "@/store/useAuthStore"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"

import { toast } from "sonner"
import { handleAxiosError } from "@/lib/handleAxiosError"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { loginUser } from "@/lib/api/auth"
import { fetchUserProfile } from "@/lib/api/user"

const LoginForm = () => {

    const { login } = useAuthStore()
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const mutation = useMutation({
        mutationFn: () => loginUser({ email: data.email, password: data.password }),
        onSuccess: (data) => {
            login(data.token);
            toast.success("Logged in successfully")
            setData({
                email: '',
                password: ''
            })
            fetchUserProfile()
        },
        onError: (error: unknown) => {
            handleAxiosError(error)
            console.log("Login error: ", error)
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!data.email || !data.password) {
            return toast.error("Please provide all fields")
        }
        mutation.mutate()
        mutation.reset()
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="grid items-center gap-4">
            <div className="grid flex-1 gap-2">
                <Label htmlFor="email">
                    Email *
                </Label>
                <Input
                    name="email"
                    required
                    value={data.email}
                    onChange={handleInputChange}
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                />
            </div>
            <div className="grid flex-1 gap-2 relative">
                <Label htmlFor="password">
                    Password *
                </Label>
                <Input
                    name="password"
                    required
                    value={data.password}
                    onChange={handleInputChange}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="**********"
                />
                {showPassword ?
                    <FaEye onClick={() => setShowPassword(!showPassword)} className="absolute top-8 right-3" /> :
                    <FaEyeSlash onClick={() => setShowPassword(!showPassword)} className="absolute top-8 right-3" />
                }
            </div>
            <Button
                disabled={mutation.isPending}
            >
                {mutation.isPending ? "Logging in..." : "Login"}
            </Button>
        </form>
    )
}

export default LoginForm