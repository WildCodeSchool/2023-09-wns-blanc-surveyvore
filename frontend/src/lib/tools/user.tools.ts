import React from "react";

export function validatePassword(
  password: string,
  setMessages: React.Dispatch<React.SetStateAction<any>>
): boolean {
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[@$!%*#?&]/.test(password);
  const isValid = hasLowercase && hasUppercase && hasNumber && hasSymbol;

  if (!hasLowercase) {
    setMessages((previousMessages: any) => ({
      ...previousMessages,
      warning: "Le mot de passe doit contenir au moins une lettre minuscule.",
    }));
    return false;
  }
  if (!hasUppercase) {
    setMessages((previousMessages: any) => ({
      ...previousMessages,
      warning: "Le mot de passe doit contenir au moins une lettre majuscule.",
    }));
    return false;
  }
  if (!hasNumber) {
    setMessages((previousMessages: any) => ({
      ...previousMessages,
      warning: "Le mot de passe doit contenir au moins un chiffre.",
    }));
    return false;
  }
  if (!hasSymbol) {
    setMessages((previousMessages: any) => ({
      ...previousMessages,
      warning:
        "Le mot de passe doit contenir au moins un caractère spécial (@, $, !, %, *, #, ?, &).",
    }));
    return false;
  }
  if (password.length < 6) {
    setMessages((previousMessages: any) => ({
      ...previousMessages,
      warning: "Le mot de passe doit contenir au moins 6 caractères.",
    }));
    return false;
  }

  setMessages({});
  return isValid;
}

