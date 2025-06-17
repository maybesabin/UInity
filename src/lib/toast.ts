import { toast } from "sonner";

export const useToast = (message: string) => {
    return toast(message)
}