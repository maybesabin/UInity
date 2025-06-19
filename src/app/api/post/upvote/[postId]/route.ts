import connectToDb from "@/lib/db";
import { handleError } from "@/lib/error";
import { errorResponse, successResponse } from "@/lib/response";
import { verifyToken } from "@/lib/verifyToken";
import Post from "@/models/Post";
import { Types } from "mongoose";

export async function POST(req: Request, { params }: { params: Promise<{ postId: string }> }) {
    await connectToDb()
    try {
        const authHeader = req.headers.get("authorization")
        const userId = verifyToken(authHeader);

        if (!userId) return errorResponse("Unauthorized user");

        const userObjectId = new Types.ObjectId(userId);
        const { postId } = await params;
        const post = await Post.findById(postId)
        if (!post) return errorResponse("Post not found")

        const hasUpvoted = post.upvotedBy?.includes(userObjectId);

        if (hasUpvoted) {
            await Post.findByIdAndUpdate(postId, {
                $pull: { upvotedBy: userObjectId },
                $inc: { upvotes: -1 }
            })
            return successResponse("Un-upvoted post successfully")
        } else {
            await Post.findByIdAndUpdate(postId, {
                $addToSet: { upvotedBy: userObjectId },
                $inc: { upvotes: +1 }
            })
            return successResponse("Upvoted post successfully")
        }
    } catch (error) {
        handleError(error)
    }
}