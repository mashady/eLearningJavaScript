import { showError , clearError } from "../utils/errorHandeling.js";

function validateField(
    fieldValue,
    fieldId,
    errorId,
    validationFn,
    errorMessage
  ) {
    if (!fieldValue || (validationFn && !validationFn(fieldValue))) {
      showError(fieldId, errorMessage);
      return false;
    } else {
      clearError(fieldId);
      return true;
    }
  }

export { validateField };