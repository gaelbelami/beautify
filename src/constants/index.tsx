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
  AuthFormProps,
  FORGOT_PASSWORD_FORM,
  RESET_PASSWORD_FORM,
  SIGN_IN_FORM,
  SIGN_UP_FORM,
} from "./forms";

type BeautifyConstanstProps = {
  // Authentification forms
  signInForm: AuthFormProps[];
  signUpForm: AuthFormProps[];
  forgotPasswordForm: AuthFormProps[];
  resetPasswordForm: AuthFormProps[];
};

export const BEAUTIFY_CONSTANTS: BeautifyConstanstProps = {
  // Authentication forms
  signInForm: SIGN_IN_FORM,
  signUpForm: SIGN_UP_FORM,
  forgotPasswordForm: FORGOT_PASSWORD_FORM,
  resetPasswordForm: RESET_PASSWORD_FORM,
};
