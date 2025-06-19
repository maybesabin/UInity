"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import Navbar from "@/components/navbar"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState, useEffect } from "react"
import { useAuthStore } from "@/store/useAuthStore"
import { fetchUserProfile } from "@/lib/api/user"

export default function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())
    const initializeAuth = useAuthStore(state => state.initializeAuth)
    const { isLoggedIn } = useAuthStore()

    useEffect(() => {
        initializeAuth()
    }, [initializeAuth])

    useEffect(() => {
        if (isLoggedIn) {
            fetchUserProfile()
        }
    }, [isLoggedIn])

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
                key={"theme-provider"}
            >
                <Toaster />
                <div className="mb-20"><Navbar /></div>
                {children}
            </ThemeProvider>
        </QueryClientProvider>
    )
}