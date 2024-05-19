import { cardMenuOptions } from "@/lib/fixtures/data";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Icon from "../Icon/Icon";
import { Survey } from "@/types/survey.type";
import { NextRouter, useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { ARCHIVE_SURVEY, DELETE_SURVEY } from "@/lib/queries/survey.queries";
import useClickOutside from "@/lib/hooks/useClickOutside";

function CardMenu({
  survey,
  surveys,
  setSurveys,
}: {
  survey: Survey;
  surveys: Survey[];
  setSurveys: React.Dispatch<React.SetStateAction<Survey[]>>;
}) {
  //   ------------------------------------------------hooks-----------------------------------------------

  const [isCardMenuOpen, setIsCardMenuOpen] = useState<boolean>(false);
  const router: NextRouter = useRouter();
  const { ref } = useClickOutside(isCardMenuOpen, setIsCardMenuOpen);

  //   ------------------------------------------------queries-----------------------------------------------

  const [archiveSurvey] = useMutation(ARCHIVE_SURVEY);
  const [deleteSurvey] = useMutation(DELETE_SURVEY);

  //   ------------------------------------------------functions-----------------------------------------------

  console.log("surveys", surveys);

  const onClick = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement>,
      option: string,
      survey: Survey
    ) => {
      event.preventDefault();
      event.stopPropagation();
      setIsCardMenuOpen(false);

      const canArchive =
        survey.state.state === "closed" || survey.state.state === "archived";

      switch (option) {
        case "Modifier":
          return router.push(`/surveys/${survey.link}`);

        case "Archiver":
          return (
            canArchive &&
            archiveSurvey({
              variables: {
                link: survey.link,
                archive: survey.archived ? false : true,
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
            })
          );

        case "Supprimer":
          return deleteSurvey({
            variables: {
              link: survey.link,
            },
            onCompleted: () =>
              setSurveys(surveys.filter((s) => s.link !== survey.link)),
          });
      }
    },
    [survey, archiveSurvey, deleteSurvey, surveys, setSurveys]
  );

  //   ------------------------------------------------return-----------------------------------------------

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
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="dropdown-wrapper"
          onBlur={() => setIsCardMenuOpen(false)}>
          {cardMenuOptions.map((option) => (
            <button
              key={option.id}
              className="dropdown-item"
              type="button"
              value={option.option}
              name={option.option}
              disabled={
                option.option === "Archiver" &&
                survey.state.state !== "closed" &&
                survey.state.state !== "archived"
              }
              onClick={(e) => onClick(e, option.option, survey)}>
              <Icon name={option.icon} height="1rem" width="1rem" />
              {survey.archived && option.option === "Archiver"
                ? "Restaurer"
                : option.option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardMenu;

