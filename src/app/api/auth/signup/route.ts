import connectToDb from "@/lib/db"
import { handleError } from "@/lib/error"
import { errorResponse } from "@/lib/response"
import User from "@/models/User"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

interface SignupRequest {
    name: string;
    username: string;
    email: string;
    password: string;
    imageUrl?: string;
}

export async function POST(req: Request) {
    await connectToDb()
    const { name, username, email, password, imageUrl } = await req.json() as SignupRequest

    try {
        if (!username || !email || !password || !name) return errorResponse("Please provide all fields")

        const checkUsername = await User.findOne({ username })
        if (checkUsername) return errorResponse("User with this username already exists")

        const checkEmail = await User.findOne({ email })
        if (checkEmail) return errorResponse("User with this email already exists")

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            ...(name && { name }),
            username,
            email,
            password: hashedPassword,
            ...(imageUrl && { imageUrl })
        })

        const user = {
            _id: newUser._id,
            email: newUser.email,
            username: newUser.username,
            name: newUser.name,
            ...(newUser.imageUrl && { imageUrl: newUser.imageUrl })
        }

        await newUser.save()
        return NextResponse.json({
            message: "Account created successfully",
            data: user,
            status: 200
        })
    } catch (err) {
        return handleError(err)
    }
}