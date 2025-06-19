import jwt from "jsonwebtoken";

interface JwtPayload {
    id?: string;
    _id?: string;
}

export function verifyToken(authHeader: string | null) {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error("No or invalid authorization header");
    }

    const token = authHeader.split(" ")[1];
    if (!token) throw new Error("No token provided");

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not defined");

    const decoded = jwt.verify(token, secret);
    return (decoded as JwtPayload).id || (decoded as JwtPayload)._id;
}
