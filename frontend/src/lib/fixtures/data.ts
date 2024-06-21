import { Option } from "@/types/options.type";

// Array of sort options for surveys. We can add as many as we want.
export const sortOptions: Option[] = [
  {
    id: 1,
    option: "Ordre alphabétique",
    icon: "sort-alpha-up",
  },
  {
    id: 2,
    option: "Ordre anti-alphabétique",
    icon: "sort-alpha-down",
  },
  {
    id: 3,
    option: "Nombre de questions",
    icon: "list-check",
  },
];

// Array of card menu options to modify, archive or delete a survey

export const cardMenuOptions: Option[] = [
  {
    id: 1,
    option: "Modifier",
    icon: "pen-clip",
  },
  {
    id: 2,
    option: "Archiver",
    icon: "folder-download",
  },
  {
    id: 3,
    option: "Supprimer",
    icon: "trash",
  },
];

// Array of validation messages for password
export const passwordValidationMessages = [
  {
    validationName: "hasLowerCase",
    isValid: false,
    message: "Le mot de passe doit contenir au moins une lettre minuscule.",
  },
  {
    validationName: "hasUpperCase",
    isValid: false,
    message: "Le mot de passe doit contenir au moins une lettre majuscule.",
  },
  {
    validationName: "hasNumber",
    isValid: false,
    message: "Le mot de passe doit contenir au moins un chiffre.",
  },
  {
    validationName: "hasSpecialChar",
    isValid: false,
    message:
      "Le mot de passe doit contenir au moins un caractère spécial (@, $, !, %, *, #, ?, &).",
  },
  {
    validationName: "minLength",
    isValid: false,
    message: "Le mot de passe doit contenir au moins 6 caractères.",
  },
];

