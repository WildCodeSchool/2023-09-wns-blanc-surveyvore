import {
  displayNumberOfQuestions,
  displayState,
} from "@/lib/tools/survey.tools";
import { IconName } from "@/types/iconName.type";
import { title } from "process";

describe("displayState Fn", () => {
  it("should return the right translated state", () => {
    expect(displayState("in-progress")).toBe("En cours");
    expect(displayState("draft")).toBe("Brouillon");
    expect(displayState("published")).toBe("Publié");
    expect(displayState("archived")).toBe("Archivé");
    expect(displayState("closed")).toBe("Clotûré");
  });

  it("should be undefined if the state does not exist", () => {
    expect(displayState("well_defined")).toBeUndefined();
    expect(displayState("")).toBeUndefined();
  });

  it("should be case insensitive", () => {
    expect(displayState("IN-PROGRESS")).toBe("En cours");
    expect(displayState("PUBLISHED")).toBe("Publié");
  });
});

describe("displayNumberOfQuestions Fn", () => {
  it("should return the right number of questions", () => {
    const survey = {
      id: 1,
      title: "Test Survey",
      link: "https://survey.link",
      archived: false,
      private: false,
      collectingUserData: false,
      creationDate: new Date(),
      state: { id: 1, state: "in-progress", color: "#000000" },
      question: [
        {
          id: "qksfgqkjf",
          title: "Question 1",
          type: {
            id: "dkfhqkf",
            type: "text",
            icon: "search" as IconName,
          },
          description: "Description 1",
          isOpen: true,
          answer: undefined,
        },
        {
          id: "kfhqsfh",
          title: "Question 2",
          type: {
            id: "hkfgqkfsh",
            type: "text",
            icon: "trash" as IconName,
          },
          description: "Description 2",
          isOpen: true,
          answer: undefined,
        },
      ],
    };

    const survey_test_2 = {
      id: 1,
      title: "Test Survey",
      link: "https://survey.link",
      archived: false,
      private: false,
      collectingUserData: false,
      creationDate: new Date(),
      state: { id: 1, state: "in-progress", color: "#000000" },
      question: [],
    };

    expect(displayNumberOfQuestions(survey)).toBe("2 questions");
    expect(displayNumberOfQuestions(survey_test_2)).toBe("Aucune question");
  });
});
