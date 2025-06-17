import connectToDb from "@/lib/db";
import { handleError } from "@/lib/error";
import { errorResponse, successResponse } from "@/lib/response";
import { verifyToken } from "@/lib/verifyToken";
import Post from "@/models/Post";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await connectToDb()
    try {
        const authHeader = req.headers.get("authorization");
        const userId = verifyToken(authHeader);

        const { title, description, code } = await req.json();

        if (!title || !code) return errorResponse("Please provide all fields");
        if (!userId) return errorResponse("Unauthorized user");

        const user = await User.findById(userId);
        if (!user) return errorResponse("User not found");

        const newPost = new Post({
            title,
            description,
            code,
            user,
        });

        await newPost.save();
        return successResponse("Post created successfully");
    } catch (err) {
        return handleError(err);
    }
}

export async function GET() {
    await connectToDb()
    try {
        const posts = await Post.find().populate({ path: "user", select: "-password -posts" }).select("-password -posts")
        return NextResponse.json({
            message: "Posts fetched successfully",
            posts
        })
    } catch (error) {
        handleError(error)
    }
}
