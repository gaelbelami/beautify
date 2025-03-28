/**
 * Constants module for Beautify project
 *
 * @module constants
 *
 * @typedef {Object} BeautifyConstantsProps - Properties interface for Edulaps constants
 * @property {string} projectName - Name of the project
 *
 * @constant {BeautifyConstantsProps} BEAUTIFY_CONSTANTS - Main constants object containing all configuration values
 */

import {
  ACCOUNT_FORM,
  AccountFormProps,
  AuthFormProps,
  FORGOT_PASSWORD_FORM,
  PROFILE_FORM,
  ProfileFormProps,
  RESET_PASSWORD_FORM,
  SIGN_IN_FORM,
  SIGN_UP_FORM,
} from "./forms";

type BeautifyConstanstProps = {
  // Other constants
  projectName: string;

  // Authentification forms
  signInForm: AuthFormProps[];
  signUpForm: AuthFormProps[];
  forgotPasswordForm: AuthFormProps[];
  resetPasswordForm: AuthFormProps[];
  userProfileForm: ProfileFormProps[];
  userAccountForm: AccountFormProps[];
};

export const BEAUTIFY_CONSTANTS: BeautifyConstanstProps = {
  // Other constants
  projectName: "Beautify",

  // Authentication forms
  signInForm: SIGN_IN_FORM,
  signUpForm: SIGN_UP_FORM,
  forgotPasswordForm: FORGOT_PASSWORD_FORM,
  resetPasswordForm: RESET_PASSWORD_FORM,
  userProfileForm: PROFILE_FORM,
  userAccountForm: ACCOUNT_FORM,
};
