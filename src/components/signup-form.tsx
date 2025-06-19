"use client"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { handleAxiosError } from "@/lib/handleAxiosError"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { signupUser } from "@/lib/api/auth"
import { User } from "@/types/User"

const SignupForm = () => {

    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false
    })
    const [data, setData] = useState<Partial<User>>({
        email: '',
        password: '',
        confirmPassword: '',
        imageUrl: '',
        name: '',
        username: ''
    })

    const mutation = useMutation({
        mutationFn: () => signupUser(data),
        onSuccess: () => {
            toast.success("Successfully created account")
            setData({
                email: '',
                username: '',
                name: '',
                password: '',
                confirmPassword: ''
            });
        },
        onError: (error: unknown) => {
            handleAxiosError(error)
            console.log("Signup error: ", error)
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!data.email || !data.username || !data.confirmPassword || !data.name) {
            return toast.error("Please provide all fields")
        }

        if (data.password !== data.confirmPassword) {
            return toast.error("Passwords do not match")
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
                <Label htmlFor="name">
                    Name *
                </Label>
                <Input
                    name="name"
                    required
                    value={data.name}
                    onChange={handleInputChange}
                    id="name"
                    type="text"
                    placeholder="John Doe"
                />
            </div>
            <div className="grid flex-1 gap-2">
                <Label htmlFor="username">
                    Username *
                </Label>
                <Input
                    name="username"
                    required
                    value={data.username}
                    onChange={handleInputChange}
                    id="username"
                    type="text"
                    placeholder="johndoe21"
                />
            </div>
            <div className="grid flex-1 gap-2">
                <Label htmlFor="imageUrl">
                    Image
                </Label>
                <Input
                    name="imageUrl"
                    value={data.imageUrl}
                    onChange={handleInputChange}
                    id="imageUrl"
                    type="text"
                    placeholder="Enter your image url"
                />
            </div>
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
                    placeholder="johndoe@example.com"
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
                    type={showPassword.password ? "text" : "password"}
                    placeholder="**********"
                />
                {showPassword.password ?
                    <FaEye onClick={() => setShowPassword(prev => ({ ...prev, password: !showPassword.password }))} className="absolute top-8 right-3" /> :
                    <FaEyeSlash onClick={() => setShowPassword(prev => ({ ...prev, password: !showPassword.password }))} className="absolute top-8 right-3" />
                }
            </div>
            <div className="grid flex-1 gap-2 relative">
                <Label htmlFor="confirmPassword">
                    Confirm Password *
                </Label>
                <Input
                    required
                    name="confirmPassword"
                    value={data.confirmPassword}
                    onChange={handleInputChange}
                    id="confirmPassword"
                    type={showPassword.confirmPassword ? "text" : "password"}
                    placeholder="**********"
                />
                {showPassword.confirmPassword ?
                    <FaEye onClick={() => setShowPassword(prev => ({ ...prev, confirmPassword: !showPassword.confirmPassword }))} className="absolute top-8 right-3" /> :
                    <FaEyeSlash onClick={() => setShowPassword(prev => ({ ...prev, confirmPassword: !showPassword.confirmPassword }))} className="absolute top-8 right-3" />
                }
            </div>
            <Button
                disabled={mutation.isPending || data.password !== data.confirmPassword}
            >
                {mutation.isPending ? "Signing in..." : "Signup"}
            </Button>
        </form>
    )
}

export default SignupForm