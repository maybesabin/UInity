import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import LoginForm from "./login-form"

const LoginDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    Sign In
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Login</DialogTitle>
                <DialogDescription>
                    Login to create and share your components
                </DialogDescription>
                <LoginForm />
            </DialogContent>
        </Dialog>
    )
}

export default LoginDialog