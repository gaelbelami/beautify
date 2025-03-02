"use client"
import { IconGlobe, IconProps, Icon } from "@tabler/icons-react"
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { Mail, KeyRound, LucideProps } from "lucide-react"; // Import icons as values

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