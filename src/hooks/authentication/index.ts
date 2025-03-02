import { SignInSchema } from "@/components/forms/sign-in/schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

export const useAuthSignIn = () => {
    const {
        register,
        formState: {errors}
    } = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        mode: "onBlur"
    })

    return {
        register, errors
    }
}