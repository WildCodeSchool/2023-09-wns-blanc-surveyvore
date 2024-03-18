import NavLayout from "@/layouts/NavLayout";
import { ReactElement, useEffect, useState } from "react";
import { Survey } from "@/types/survey.type";
import { gql, useLazyQuery } from "@apollo/client";
import Link from "next/link";
import useLoggedUser from "@/hooks/useLoggedUser";
import Icon from "@/components/Icon/Icon";
import { formatDate, removeAccents } from "@/tools/format.tools";
import { SurveyState } from "@/types/surveyState.type";

// faire une requête dynamique en fonction du state qui est passé au clic sur un filtre pour filtrer les formulaires

// trier en fonction des dates

// créer un composant tag pour afficher le nombre de questions

const GET_SURVEY_BY_OWNER = gql`
  query GetSurveysByOwner($userId: String!) {
    getSurveysByOwner(userId: $userId) {
      id
      title
      description
      link
      archived
      private
      collectingUserData
      startDate
      endDate
      deleteDate
      creationDate
      publicationDate
      archiveDate
      state {
        color
        state
      }
      question {
        title
        answer {
          content
        }
      }
    }
  }
`;

const GET_SURVEY_STATES = gql`
  query Query {
    getSurveyStates {
      color
      id
      state
    }
  }
`;

export default function Home() {
  const [surveys, setSurveys] = useState([]);
  const [surveyStates, setSurveyStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [searchSurveysValue, setSearchSurveysValue] = useState("");
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);
  const user = useLoggedUser();

  const [getSurveys, { loading, error }] = useLazyQuery(GET_SURVEY_BY_OWNER);

  const [getStates] = useLazyQuery(GET_SURVEY_STATES);

  const displayState = (state: string) => {
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
    }
  };

  const displayNumberOfQuestions = (survey: Survey) => {
    console.log(survey.question);

    if (survey.question.length > 0) {
      return `${survey.question.length} questions`;
    } else {
      return "0 questions";
    }
  };

  console.log(surveys);

  useEffect(() => {
    if (user) {
      getSurveys({
        variables: { userId: user?.id },
        fetchPolicy: "network-only",
        onCompleted: (data) => setSurveys(data.getSurveysByOwner),
      });

      getStates({
        fetchPolicy: "network-only",
        onCompleted: (data) => setSurveyStates(data.getSurveyStates),
      });
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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

  console.log(selectedState);

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
        <button
          className="button-md-white-outline"
          onClick={() => setAreFiltersOpen(!areFiltersOpen)}>
          <Icon name="filter" height="1rem" width="1rem" />
          Filtrer
        </button>
        {areFiltersOpen && (
          <div className="dropdown-wrapper">
            {surveyStates.map((state: SurveyState) => (
              <button
                onClick={() => {
                  setSelectedState(
                    state.state === selectedState ? "" : state.state
                  );
                  // setAreFiltersOpen(false);
                }}
                className="dropdown-item">
                <div
                  key={state.id}
                  className={`badge-lg-pale-${state.color}-square`}>
                  <span className="dot" /> <p>{displayState(state.state)}</p>
                </div>
                {selectedState === state.state && (
                  <Icon
                    name="check-circle"
                    width="1rem"
                    height="1rem"
                    color="purple"
                  />
                )}
              </button>
            ))}
          </div>
        )}

        <button className="button-md-white-outline">
          <Icon name="sort-alt" height="1rem" width="1rem" />
          Trier
        </button>
      </section>
      <section className="my-surveys surveys">
        {filteredSurveys.map((survey: Survey) => (
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
              <button className="settings " type="button">
                <Icon name="dots" height="1rem" width="1rem"></Icon>
              </button>
            </div>

            <h3 className="title text-lg text--medium">{survey.title}</h3>
            <p className="description text-sm">{survey.description}</p>

            <div className="badge-sm-colored-primary-round">
              <p>{displayNumberOfQuestions(survey)}</p>
            </div>

            <p className="creation-date text-sm">
              {formatDate(survey.creationDate)}
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

