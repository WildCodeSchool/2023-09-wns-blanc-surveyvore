import NavLayout from "@/layouts/NavLayout";
import { ReactElement, useEffect, useState } from "react";
import { Survey } from "@/types/survey.type";
import { useLazyQuery, useQuery } from "@apollo/client";
import Link from "next/link";
import Icon from "@/components/Icon/Icon";
import { formatDate, removeAccents } from "@/lib/tools/format.tools";
import { SurveyState } from "@/types/surveyState.type";
import {
  GET_SURVEY_BY_OWNER,
  GET_SURVEY_STATES,
} from "@/lib/queries/survey.queries";
import {
  displayNumberOfQuestions,
  displayState,
  sortSurveys,
} from "@/lib/tools/survey.tools";
import { sortOptions } from "@/lib/fixtures/data";
import CardMenu from "@/components/CardMenu/CardMenu";
import DropdownItem from "@/components/DropdownItem/DropdownItem";

export default function Home() {
  // ----------------------------------States----------------------------------

  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [surveyStates, setSurveyStates] = useState<SurveyState[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedSortOption, setSelectedSortOption] = useState<string>("");
  const [searchSurveysValue, setSearchSurveysValue] = useState<string>("");

  // ----------------------------------Queries----------------------------------
  const getStates = useQuery(GET_SURVEY_STATES, {
    onCompleted: (data) => setSurveyStates(data.getSurveyStates),
  });

  const [getSurveys, { loading, error }] = useLazyQuery(GET_SURVEY_BY_OWNER);

  useEffect(() => {
    getSurveys({
      fetchPolicy: "network-only",
      onCompleted: (data) => setSurveys(data.getSurveysByOwner),
    });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // ----------------------------------Functions----------------------------------

  const filteredSurveys = surveys
    .filter(
      (survey: Survey) =>
        removeAccents(survey.title.toLowerCase()).includes(
          searchSurveysValue
        ) ||
        (survey.description &&
          removeAccents(survey.description.toLowerCase()).includes(
            searchSurveysValue
          ))
    )
    .filter((survey: Survey) =>
      selectedState ? survey.state.state === selectedState : true
    );
  const searchSurveys = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchSurveysValue(
      removeAccents(e.target.value).toLocaleLowerCase().trim()
    );
  };

  const SortedSurveys = sortSurveys(selectedSortOption, filteredSurveys);

  /**
  |--------------------------------------------------
  |                     Return
  |--------------------------------------------------
  */

  return (
    <div className="home-page">
      <section className="my-surveys-header">
        <h2 className="text--medium">Mes formulaires</h2>
        <label
          className="search-surveys-label input-field"
          htmlFor="search-surveys">
          <div className="input">
            <Icon name="search" height="1rem" width="1rem" />
            <input
              type="search"
              name="search-surveys"
              id="search-surveys"
              placeholder="Rechercher..."
              onChange={(e) => searchSurveys(e)}
            />
          </div>
        </label>
        <DropdownItem
          options={surveyStates}
          icon="filter"
          selectedOption={selectedState}
          setSelectedOption={setSelectedState}
        />

        <DropdownItem
          options={sortOptions}
          icon="sort-alt"
          selectedOption={selectedSortOption}
          setSelectedOption={setSelectedSortOption}
        />
      </section>
      <section className="my-surveys surveys">
        {SortedSurveys.map(
          (survey: Survey) =>
            !survey.deleteDate && (
              <Link
                className="survey-card"
                href={`/surveys/${survey.link}`}
                key={survey.id}>
                <div className={`card-header ${survey.private && "private"}`}>
                  {survey.private && (
                    <Icon name="lock" height="1rem" width="1rem" />
                  )}
                  <div className={`badge-md-pale-${survey.state.color}-square`}>
                    <span className="dot" />
                    <p>{displayState(survey.state.state)}</p>
                  </div>

                  <CardMenu
                    survey={survey}
                    surveys={surveys}
                    setSurveys={setSurveys}
                  />
                </div>

                <h3 className="title text-lg text--medium">{survey.title}</h3>
                <p className="description text-sm">{survey.description}</p>

                <div className="badge-sm-colored-primary-round">
                  <p>{displayNumberOfQuestions(survey)}</p>
                </div>

                <p className="creation-date text-sm">
                  {formatDate(Number(survey.creationDate))}
                </p>
              </Link>
            )
        )}
      </section>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

