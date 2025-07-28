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
    type: "text" | "date" | "email" | "tel"
    inputType: "select" | "input" | "textarea" | "radio" | "array" | "date" | "date-range" | "date-preset";
    options?: { value: string; label: string }[]
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
    id: "email",
    inputType: "input",
    name: "email",
    label: "account.emailLabel",
    type: "email",
    placeholder: "account.emailPlaceholder",
    description: "account.emailDescription"
  },
  {
    id: "phone",
    inputType: "input",
    name: "phone",
    label: "account.phoneLabel",
    type: "text",
    placeholder: "account.phonePlaceholder",
    description: "account.phoneDescription"
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
  {
    id: "timezone",
    inputType: "select",
    name: "timezone",
    label: "account.timezoneLabel",
    type: "text",
    placeholder: "account.timezonePlaceholder",
    description: "account.timezoneDescription",
    options: [
      { value: "UTC", label: "account.timezones.utc" },
      { value: "America/New_York", label: "account.timezones.et" },
      { value: "America/Chicago", label: "account.timezones.ct" },
      { value: "America/Denver", label: "account.timezones.mt" },
      { value: "America/Los_Angeles", label: "account.timezones.pt" },
      { value: "Europe/London", label: "account.timezones.gmt" },
      { value: "Europe/Paris", label: "account.timezones.cet" },
      { value: "Europe/Berlin", label: "account.timezones.cetBerlin" },
      { value: "Asia/Tokyo", label: "account.timezones.jst" },
      { value: "Asia/Shanghai", label: "account.timezones.cst" },
      { value: "Asia/Kolkata", label: "account.timezones.ist" },
      { value: "Australia/Sydney", label: "account.timezones.aet" }
    ]
  },
  // Phase 2: Profile Enhancement Fields
  {
    id: "country",
    inputType: "select",
    name: "country",
    label: "account.countryLabel",
    type: "text",
    placeholder: "account.countryPlaceholder",
    description: "account.countryDescription",
    options: [
      { value: "US", label: "account.countries.us" },
      { value: "CA", label: "account.countries.ca" },
      { value: "GB", label: "account.countries.gb" },
      { value: "DE", label: "account.countries.de" },
      { value: "FR", label: "account.countries.fr" },
      { value: "NL", label: "account.countries.nl" },
      { value: "CN", label: "account.countries.cn" },
      { value: "JP", label: "account.countries.jp" },
      { value: "AU", label: "account.countries.au" },
      { value: "IN", label: "account.countries.in" }
    ]
  },
  {
    id: "jobTitle",
    inputType: "input",
    name: "jobTitle",
    label: "account.jobTitleLabel",
    type: "text",
    placeholder: "account.jobTitlePlaceholder",
    description: "account.jobTitleDescription"
  },
  {
    id: "company",
    inputType: "input",
    name: "company",
    label: "account.companyLabel",
    type: "text",
    placeholder: "account.companyPlaceholder",
    description: "account.companyDescription"
  }
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

// Phase 2: Profile Picture Upload Form (separate component)
export const PROFILE_PICTURE_FORM: AccountFormProps[] = [
  {
    id: "profilePicture",
    inputType: "input",
    name: "profilePicture",
    label: "account.profilePictureLabel",
    type: "text", // Will be handled as file input in component
    placeholder: "account.profilePicturePlaceholder",
    description: "account.profilePictureDescription"
  }
];