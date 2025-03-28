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

export type ProfileFormProps = {
    id: string
    type: "email" | "text" | "password" | "url"
    inputType: "select" | "input" | "textarea" | "radio" | "array"
    options?: { value: string; label: string; id: string }
    label?: string
    placeholder: string
    description?: string
    name: string
    radioOptions?: { value: string; label: string; id: string }[]
    className?: string
    icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>> 
}

export type AccountFormProps = {
    id: string
    type: "text" | "date"
    inputType: "select" | "input" | "textarea" | "radio" | "array" | "date" | "date-range" | "date-preset";
    options?: { value: string; label: string; id: string }
    label?: string
    placeholder: string
    description?: string
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

// src/constants/forms.ts
export const PROFILE_FORM: ProfileFormProps[] = [
    {
        id: "firstname",
        inputType: "input",
        placeholder: "profile.firstnamePlaceholder",
        name: "firstname",
        label: "profile.firstnameLabel",
        type: "text",
    },
    {
        id: "lastname",
        inputType: "input",
        placeholder: "profile.lastnamePlaceholder",
        name: "lastname",
        label: "profile.lastnameLabel",
        type: "text",
    },
  {
    id: "username",
    inputType: "input",
    name: "username",
    label: "profile.usernameLabel",
    type: "text",
    placeholder: "profile.usernamePlaceholder",
    description: "profile.usernameDescription"
  },
  {
    id: "email",
    inputType: "input",
    name: "email",
    label: "profile.emailLabel",
    type: "email",
    placeholder: "profile.emailPlaceholder",
    description: "profile.emailDescription"
  },
  {
    id: "bio",
    inputType: "textarea",
    name: "bio",
    label: "profile.bioLabel",
    type: "text",
    placeholder: "profile.bioPlaceholder",
    description: "profile.bioDescription"
  },
  {
    id: "urls",
    inputType: "array",
    name: "urls",
    label: "profile.urlsLabel",
    type: "url",
    placeholder: "profile.urlsPlaceholder",
    description: "profile.urlsDescription"
  }
];

export const ACCOUNT_FORM: AccountFormProps[] = [
  {
    id: "name",
    inputType: "input",
    name: "name",
    label: "account.nameLabel",
    type: "text",
    placeholder: "account.namePlaceholder",
    description: "account.nameDescription"
  },
  {
    id: "dob",
    inputType: "date",
    name: "dob",
    label: "account.dobLabel",
    type: "date",
    placeholder: "account.dobPlaceholder",
    description: "account.dobDescription"
  },
  // {
  //   id: "language",
  //   inputType: "select",
  //   name: "language",
  //   label: "account.languageLabel",
  //   type: "text",
  //   placeholder: "account.languagePlaceholder",
  //   description: "account.languageDescription"
  // }
];