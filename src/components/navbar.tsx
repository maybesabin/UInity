import { SiZcool } from "react-icons/si"
import { Button } from "./ui/button"
import { LuPlus } from "react-icons/lu"
import placeholder from "../assets/placeholder.png"
import Image from "next/image"

const navbar = () => {
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
                        <Button
                            variant={"secondary"}
                            className="flex items-center gap-2"
                        >
                            <LuPlus />
                            <span>Share component</span>
                        </Button>
                        <div className="rounded-full size-9 border p-1.5 border-neutral-600">
                            <Image
                                className="object-cover w-full h-full"
                                height={600}
                                width={600}
                                src={placeholder}
                                alt={"Placeholder image"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default navbar