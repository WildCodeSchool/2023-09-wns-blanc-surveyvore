import { cardMenuOptions } from "@/lib/fixtures/data";
import React, { useState } from "react";
import Icon from "../Icon/Icon";
import { Survey } from "@/types/survey.type";
import { NextRouter, useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { ARCHIVE_SURVEY, DELETE_SURVEY } from "@/lib/queries/survey.queries";

function CardMenu({
  survey,
  surveys,
  setSurveys,
}: {
  survey: Survey;
  surveys: Survey[];
  setSurveys: React.Dispatch<React.SetStateAction<Survey[]>>;
}) {
  const [isCardMenuOpen, setIsCardMenuOpen] = useState(false);
  const router: NextRouter = useRouter();

  const [archiveSurvey] = useMutation(ARCHIVE_SURVEY);
  const [deleteSurvey] = useMutation(DELETE_SURVEY);

  function onClick(
    event: React.MouseEvent<HTMLButtonElement>,
    option: string,
    survey: Survey
  ) {
    event.preventDefault();
    event.stopPropagation();
    setIsCardMenuOpen(false);

    switch (option) {
      case "Modifier":
        return router.push(`/surveys/${survey.link}`);

      case "Archiver":
        return archiveSurvey({
          variables: {
            link: survey.link,
            archive: true,
          },
          onCompleted: (data) => {
            const index = surveys.findIndex(
              (survey) => survey.link === data.archiveSurvey.link
            );

            const newSurveys = [...surveys];
            newSurveys.splice(index, 1, data.archiveSurvey);

            setSurveys(newSurveys);
            console.log("index", index);
            console.log("newSurveys", newSurveys);
          },
        });

      case "Supprimer":
        return deleteSurvey({
          variables: {
            link: survey.link,
          },
          onCompleted: () =>
            setSurveys(surveys.filter((s) => s.link !== survey.link)),
        });
    }
  }

  return (
    <div className="filters-container">
      <button
        className="settings"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsCardMenuOpen(!isCardMenuOpen);
        }}>
        <Icon name="dots" height="1rem" width="1rem"></Icon>
      </button>
      {isCardMenuOpen && (
        <div className="dropdown-wrapper">
          {cardMenuOptions.map((option) => (
            <button
              key={option.id}
              className="dropdown-item"
              onClick={(e) => onClick(e, option.option, survey)}>
              <Icon name={option.icon} height="1rem" width="1rem" />
              {option.option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardMenu;

