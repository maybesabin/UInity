import connectToDb from "@/lib/db";
import { handleError } from "@/lib/error";
import { errorResponse, successResponse } from "@/lib/response";
import { verifyToken } from "@/lib/verifyToken";
import Post from "@/models/Post";
import User from "@/models/User";

export async function DELETE(req: Request, { params }: { params: { postId: string } }) {
    await connectToDb()
    try {
        const authHeader = req.headers.get("authorization")
        const userId = verifyToken(authHeader);

        if (!userId) return errorResponse("Unauthorized user");

        const user = await User.findById(userId)
        if (!user) return errorResponse("User not found");

        const { postId } = params;

        const post = await Post.findById(postId);
        if (!post) return errorResponse("Post not found");

        if (post.user.toString() !== userId) {
            return errorResponse("You are not authorized to delete this post")
        }

        await Post.findByIdAndDelete(postId)
        return successResponse("Post deleted successfully")
    } catch (error) {
        handleError(error)
    }
}

export async function PUT(req: Request, { params }: { params: { postId: string } }) {
    await connectToDb()
    try {
        const authHeader = req.headers.get("authorization")
        const userId = verifyToken(authHeader);

        if (!userId) return errorResponse("Unauthorized user");

        const user = await User.findById(userId)
        if (!user) return errorResponse("User not found");

        const { postId } = params;

        const post = await Post.findById(postId);
        if (!post) return errorResponse("Post not found")

        if (post.user.toString() !== userId) {
            return errorResponse("You are not authorized to delete this post")
        }

        const { title, description, code } = await req.json();
        if (!title && !description && !code) return errorResponse("Fields cannot be empty")

        await Post.findByIdAndUpdate(postId, {
            ...(title && { title }),
            ...(description && { description }),
            ...(code && { code }),
        });

        return successResponse("Post updated successfully")
    } catch (error) {
        handleError(error)
    }
}