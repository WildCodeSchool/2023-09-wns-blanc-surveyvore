import React from "react";

export type PasswordValidationProps = {
  validationName: string;
  isValid: boolean;
  message: string;
};

export function validatePassword(
  password: string,
  setPasswordValidation: React.Dispatch<
    React.SetStateAction<PasswordValidationProps[]>
  >,
  passwordValidation: PasswordValidationProps[]
): boolean {
  const validations = [
    {
      name: "minLength",
      condition: password.length >= 6,
    },
    {
      name: "hasUpperCase",
      condition: /[A-Z]/.test(password),
    },
    {
      name: "hasLowerCase",
      condition: /[a-z]/.test(password),
    },
    {
      name: "hasNumber",
      condition: /[0-9]/.test(password),
    },
    {
      name: "hasSpecialChar",
      condition: /[@$!%*#?&]/.test(password),
    },
  ];

  const updatedValidations = passwordValidation.map((validation) => {
    const matchingValidation = validations.find(
      (v) => v.name === validation.validationName
    );
    return matchingValidation
      ? { ...validation, isValid: matchingValidation.condition }
      : validation;
  });

  setPasswordValidation(updatedValidations);

  return updatedValidations.every((validation) => validation.isValid);
}

