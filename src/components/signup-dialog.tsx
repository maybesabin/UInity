import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import SignupForm from "./signup-form"

const SignupDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"secondary"}>
                    Sign Up
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Sign Up</DialogTitle>
                <DialogDescription>
                    Sign up to create your account
                </DialogDescription>
                <SignupForm />
            </DialogContent>
        </Dialog>
    )
}

export default SignupDialog