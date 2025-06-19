import connectToDb from "@/lib/db";
import { handleError } from "@/lib/error";
import { errorResponse } from "@/lib/response";
import { verifyToken } from "@/lib/verifyToken";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        await connectToDb()
        const authHeader = req.headers.get("authorization")
        const userId = verifyToken(authHeader)

        if (!userId) return errorResponse("Unauthorized user");

        const user = await User.findById(userId).select("-password")
        if (!user) return errorResponse("User not found");

        return NextResponse.json({
            message: "Profile fetched successfully",
            user,
            status: 200
        })

    } catch (error) {
        handleError(error)
    }
}