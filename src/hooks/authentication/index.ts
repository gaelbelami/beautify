import { SignInSchema } from "@/components/forms/sign-in/schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { SignUpSchema } from "@/components/forms/sign-up/schema"
import { ForgotPasswordSchema } from "@/components/forms/forgot-password/schema"
import { useState } from "react"
import { ResetPasswordSchema } from "@/components/forms/reset-password/schema"

export const useAuthSignIn = () => {
    const { register, formState: {errors} } = useForm<z.infer<typeof SignInSchema>>({ resolver: zodResolver(SignInSchema), mode: "onBlur" })
    return { register, errors }
}

export const useAuthSignUp = () => {
    const [code, setCode] = useState<string>("123456")
    const { register, formState: { errors }, getValues }= useForm<z.infer<typeof SignUpSchema>>({ resolver: zodResolver(SignUpSchema), mode: "onBlur" })
    return { register, errors, getValues, code, setCode, }
}


export const useAuthForgotPassword = () => {
    const { register, formState: { errors }} = useForm<z.infer<typeof ForgotPasswordSchema>>({ resolver: zodResolver(ForgotPasswordSchema), mode: "onBlur" }) 
    return  { register, errors }
}


export const useAuthResetPassword = () => {
    const { register, formState: { errors }} = useForm<z.infer<typeof ResetPasswordSchema>>({ resolver: zodResolver(ResetPasswordSchema), mode: "onBlur" })
    return { register, errors }
}