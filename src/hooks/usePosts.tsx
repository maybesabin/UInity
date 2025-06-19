import { Post } from "@/types/Post"
import axios from "axios";
import { useQuery } from "@tanstack/react-query"

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

const fetchPosts = async (): Promise<Post[]> => {
    const res = await axios.get(`${url}/api/post`);
    return res.data.posts;
}

export const usePosts = () => {
    return useQuery<Post[]>({
        queryKey: ["posts"],
        queryFn: fetchPosts
    });
}