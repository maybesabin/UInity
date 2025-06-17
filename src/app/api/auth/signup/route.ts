import connectToDb from "@/lib/db"
import { handleError } from "@/lib/error"
import { errorResponse, successResponse } from "@/lib/response"
import User from "@/models/User"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
    await connectToDb()
    const { username, email, password } = await req.json()

    try {
        if (!username || !email || !password) return errorResponse("Please provide all fields")

        const checkUsername = await User.findOne({ username })
        if (checkUsername) return errorResponse("User with this username already exists")

        const checkEmail = await User.findOne({ email })
        if (checkEmail) return errorResponse("User with this email already exists")

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        await newUser.save()
        return successResponse("Account created successfully")
    } catch (err) {
        return handleError(err)
    }

}