import { SiZcool } from "react-icons/si"
import { Button } from "./ui/button"
import { LuLogOut, LuPlus } from "react-icons/lu"
import placeholder from "../assets/placeholder.png"
import Image from "next/image"
import { useAuthStore } from "@/store/useAuthStore"
import LoginDialog from "./login-dialog"
import SignupDialog from "./signup-dialog"

const Navbar = () => {
    const { isLoggedIn, logout, user } = useAuthStore()
    return (
        <header className="w-full fixed top-0 left-0 z-50 bg-background border-b-2">
            <div className="flex items-center justify-center w-full">
                <div className="lg:w-[85rem] w-full lg:px-4 px-6 flex items-center justify-between py-4">
                    <div className="flex items-center gap-2">
                        <SiZcool className="size-7" />
                        <h1 className="text-3xl">
                            <span className="font-semibold">UI</span>nity
                        </h1>
                    </div>

                    <div className="flex items-center gap-2">
                        {!isLoggedIn ?
                            <>
                                <SignupDialog />
                                <LoginDialog />
                            </>
                            :
                            <>
                                <Button
                                    variant={"secondary"}
                                    className="flex items-center gap-2"
                                >
                                    <LuPlus />
                                    <span className="md:flex hidden">Share component</span>
                                </Button>
                                <Image
                                    className="object-cover size-8 rounded-full"
                                    height={600}
                                    width={600}
                                    src={user?.imageUrl || placeholder}
                                    alt={"Placeholder image"}
                                />
                                <Button
                                    onClick={logout}
                                    variant={"secondary"}
                                    className="flex items-center gap-2"
                                >
                                    <LuLogOut />
                                    Logout
                                </Button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar