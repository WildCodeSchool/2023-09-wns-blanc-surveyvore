import { Survey } from "@/types/survey.type";
import { removeAccents } from "./format.tools";

/**
 * Function to display survey states
 * @param state
 * @returns Brouillon | Publié | En cours | Clotûré | Archivé | undefined
 */

export const displayState = (state: string): string | undefined => {
  switch (state.toLowerCase()) {
    case "draft":
      return "Brouillon";
    case "published":
      return "Publié";
    case "in-progress":
      return "En cours";
    case "closed":
      return "Clotûré";
    case "archived":
      return "Archivé";

    default:
      return undefined;
  }
};

/**
 *function to display number of questions
 * @param survey an object of type Survey
 * @returns the number of questions
 */

export const displayNumberOfQuestions = (survey: Survey): string => {
  if (survey.question !== null) {
    if (survey.question.length > 1) {
      return `${survey.question.length} questions`;
    } else if (survey.question.length === 1) {
      return "1 question";
    } else {
      return "Aucune question";
    }
  }
  return "Aucune question";
};

// function to sort surveys by selected option
/**
 *
 * @param option selected option
 * @param surveys object of type Survey
 * @returns an array of surveys sorted or not
 */
export const sortSurveys = (option: string, surveys: Survey[]): Survey[] => {
  switch (option) {
    case "Ordre alphabétique":
      return surveys.sort((a, b) =>
        removeAccents(a.title.toLowerCase()) >
        removeAccents(b.title.toLowerCase())
          ? 1
          : -1
      );
    case "Ordre anti-alphabétique":
      return surveys.sort((a, b) =>
        removeAccents(a.title.toLowerCase()) <
        removeAccents(b.title.toLowerCase())
          ? 1
          : -1
      );
    case "number of questions":
      return surveys.sort((a, b) => b.question.length - a.question.length);
    default:
      return surveys;
  }
};

