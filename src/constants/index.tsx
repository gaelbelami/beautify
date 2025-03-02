/**
 * Constants module for Edulaps project
 *
 * @module constants
 *
 * @typedef {Object} BeautifyConstantsProps - Properties interface for Edulaps constants
 * @property {string} projectName - Name of the project
 *
 * @constant {BeautifyConstantsProps} BEAUTIFY_CONSTANTS - Main constants object containing all configuration values
 */

import { AuthFormProps, SIGN_IN_FORM } from "./forms";

type BeautifyConstanstProps = {
  // Authentification forms
  signInForm: AuthFormProps[];
};

export const BEAUTIFY_CONSTANTS: BeautifyConstanstProps = {
  // Authentication forms
  signInForm: SIGN_IN_FORM,
};
