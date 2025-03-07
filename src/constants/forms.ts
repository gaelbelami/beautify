"use client"
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react"; // Import icons as values

export type AuthFormProps = {
    id: string
    type: "email" | "text" | "password"
    inputType: "select" | "input" | "textarea" | "radio"
    options?: { value: string; label: string; id: string }
    label?: string
    placeholder: string
    name: string
    radioOptions?: { value: string; label: string; id: string }[]
    className?: string
    icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}

export const SIGN_IN_FORM: AuthFormProps[] = [
  {
    id: "1",
    inputType: "input",
    placeholder: "auth.signin.emailPlaceholder",
    name: "email",
    type: "email",
    label: "auth.signin.emailLabel",
    // icon: Mail
  },
  {
    id: "2",
    inputType: "input",
    placeholder: "auth.signin.passwordPlaceholder",
    name: "password",
    type: "password",
    label: "auth.signin.passwordLabel",
    // icon: KeyRound,
  },
];


export const SIGN_UP_FORM: AuthFormProps[] = [
    {
        id: "1",
        inputType: "input",
        placeholder: "auth.signup.firstnamePlaceholder",
        name: "firstname",
        type: "text",
    },
    {
        id: "2",
        inputType: "input",
        placeholder: "auth.signup.lastnamePlaceholder",
        name: "lastname",
        type: "text",
    },
    {
        id: "3",
        inputType: "input",
        placeholder: "auth.signup.emailPlaceholder",
        name: "email",
        type: "email",
    },
    {
        id: "4",
        inputType: "input",
        placeholder: "auth.signup.passwordPlaceholder",
        name: "password",
        type: "password",
    },
    {
    id: "confirmPassword",
    inputType: "input",
    type: "password",
    placeholder: "auth.signup.confirmPasswordPlaceholder",
    name: "confirmPassword"
    // icon: <KeyRound className="w-5 h-5 text-primary" />,
  },
    
] 


export const   FORGOT_PASSWORD_FORM: AuthFormProps[] = [
    {
        id: "1",
        inputType: "input",
        placeholder: "auth.forgotpassword.emailPlaceholder",
        name: "email",
        type: "email",
    },
]

export const RESET_PASSWORD_FORM: AuthFormProps[] = [
    {
        id: "1",
        inputType: "input",
        placeholder: "auth.resetpassword.emailPlaceholder",
        name: "email",
        type: "email", 
    },
    {
        id: "2",
        inputType: "input",
        placeholder: "auth.resetpassword.newPasswordPlaceholder",
        name: "password",
        type: "password",
    },
    {
        id: "3",
        inputType: "input",
        placeholder: "auth.resetpassword.confirmPasswordPlaceholder",
        name: "confirmPassword",
        type: "password",
    },
]