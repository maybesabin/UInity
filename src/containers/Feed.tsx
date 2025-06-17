"use client"

import { usePostStore } from "@/store/postStore"
import { Post } from "@/types/Post"
import Image from "next/image"
import { useEffect } from "react"
import placeholder from "../assets/placeholder.png"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FaCode, FaEye } from "react-icons/fa"
const Feed = () => {
    dayjs.extend(relativeTime)
    const { fetchPosts, posts } = usePostStore()
    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <div className="flex items-center justify-center w-full py-4">
            <div className="lg:w-[85rem] w-full lg:px-4 px-6 flex flex-col items-center gap-6">
                {posts.map((post: Post, idx: number) => (
                    <div
                        className="lg:w-1/2 w-full border rounded-lg p-4"
                        key={idx}
                    >
                        {/* User Info */}
                        <div className="flex items-center gap-2">
                            <div className="rounded-full size-9 border p-1.5 border-neutral-600">
                                <Image
                                    className="object-cover w-full h-full"
                                    height={600}
                                    width={600}
                                    src={placeholder}
                                    alt={"Placeholder image"}
                                />
                            </div>
                            <div className="flex flex-col items-start">
                                <h3 className="font-medium md:text-sm text-xs first-letter:capitalize">
                                    {post.user.name}
                                </h3>
                                <h5 className="text-xs text-neutral-400">
                                    @{post.user.username} •&nbsp;
                                    <span>
                                        {dayjs(post.createdAt).fromNow()}
                                    </span>
                                </h5>
                            </div>
                        </div>

                        {/* Post Title */}
                        <h2 className="font-semibold lg:text-xl md:text-lg text-base mt-2 first-letter:capitalize">
                            {post.title}
                        </h2>

                        {/* Post Description */}
                        <p className="md:text-sm text-xs text-neutral-400">
                            {post.description}
                        </p>

                        {/* Code */}
                        <Tabs defaultValue="preview" className="w-full mt-4 bg-black border rounded-md p-2">
                            <TabsList className="w-full">
                                <TabsTrigger value="preview" className="flex items-center gap-2">
                                    <FaEye />
                                    <span>Preview</span>
                                </TabsTrigger>
                                <TabsTrigger value="code" className="flex items-center gap-2">
                                    <FaCode />
                                    <span>Code</span>
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="preview">
                                {post.code}
                            </TabsContent>
                            <TabsContent value="code">
                                {post.code}
                            </TabsContent>
                        </Tabs>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Feed