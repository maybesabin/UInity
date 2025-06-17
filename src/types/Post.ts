import { User } from "./User";

export type Post = {
    _id: string;
    title: string;
    code: string;
    description: string;
    user: User;
    createdAt: string;
}