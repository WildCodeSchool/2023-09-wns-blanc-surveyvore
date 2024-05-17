import { Options } from "@/types/options.type";
import { Survey } from "@/types/survey.type";
import { MutationFunction, useMutation } from "@apollo/client";
import { NextRouter } from "next/router";
import { ARCHIVE_SURVEY } from "../queries/survey.queries";

// Array of sort options for surveys. We can add as many as we want.
export const sortOptions: Options[] = [
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

export const cardMenuOptions: Options[] = [
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

