import connectToDb from "@/lib/db";
import { handleError } from "@/lib/error";
import { errorResponse } from "@/lib/response";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { userId: string } }) {
    await connectToDb()
    try {
        const { userId } = params;

        const user = await User.findById(userId).select("-password")
        if (!user) return errorResponse("User not found");

        return NextResponse.json({
            message: "User fetched successfully",
            user
        })

    } catch (error) {
        handleError(error)
    }
}