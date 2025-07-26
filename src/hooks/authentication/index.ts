import { SignInSchema } from "@/components/forms/sign-in/schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { SignUpSchema } from "@/components/forms/sign-up/schema"
import { ForgotPasswordSchema } from "@/components/forms/forgot-password/schema"
import { ResetPasswordSchema } from "@/components/forms/reset-password/schema"

export const useAuthSignIn = () => {
    const { register, formState: {errors}, handleSubmit, getValues } = useForm<z.infer<typeof SignInSchema>>({ resolver: zodResolver(SignInSchema), mode: "onBlur" })
    return { register, errors, handleSubmit, getValues }
}

export const useAuthSignUp = () => {
    const { register, formState: { errors }, getValues, handleSubmit } = useForm<z.infer<typeof SignUpSchema>>({ resolver: zodResolver(SignUpSchema), mode: "onBlur" })
    return { register, errors, getValues, handleSubmit }
}


export const useAuthForgotPassword = () => {
    const { register, formState: { errors }} = useForm<z.infer<typeof ForgotPasswordSchema>>({ resolver: zodResolver(ForgotPasswordSchema), mode: "onBlur" }) 
    return  { register, errors }
}


export const useAuthResetPassword = () => {
    const { register, formState: { errors }} = useForm<z.infer<typeof ResetPasswordSchema>>({ resolver: zodResolver(ResetPasswordSchema), mode: "onBlur" })
    return { register, errors }
}