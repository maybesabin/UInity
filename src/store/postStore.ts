import { useToast } from "@/lib/toast";
import { Post } from "@/types/Post"
import axios from "axios";
import { create } from "zustand"

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

type PostStore = {
    posts: Post[];
    setPosts: (posts: Post[]) => void;
    fetchPosts: () => Promise<void>;
}

export const usePostStore = create<PostStore>((set) => ({
    posts: [],
    setPosts: (posts) => set({ posts }),
    fetchPosts: async () => {
        try {
            const res = await axios.get(`${url}/api/post`);
            console.log(res.data)
            set({ posts: res.data.posts })
        } catch (error) {
            useToast("Failed to fetch posts")
            console.log(error)
        }
    }
}))