import NavLayout from "@/layouts/NavLayout";
import { ReactElement, useEffect, useState } from "react";
import { Survey } from "@/types/survey.type";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import Link from "next/link";
import Icon from "@/components/Icon/Icon";
import { formatDate, removeAccents } from "@/tools/format.tools";
import { SurveyState } from "@/types/surveyState.type";
import { IconName } from "@/types/iconName.type";

// Si on fait une requête dynamique ça recharge la page à chaque fois que l'on clique sur un filtre et c'est pas ouf --> filtres en front
// j'ai utiliser le contexte du user plutot que de passer l'id en paramètre du getSurveysByOwner

const GET_SURVEY_BY_OWNER = gql`
  query GetSurveysByOwner {
    getSurveysByOwner {
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

type SortOption = {
  option: string;
  icon: IconName;
};

export default function Home() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [surveyStates, setSurveyStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [searchSurveysValue, setSearchSurveysValue] = useState("");
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);
  const [areSortedOptionsOpen, setAreSortedOptionsOpen] = useState(false);

  const [getSurveys, { loading, error }] = useLazyQuery(GET_SURVEY_BY_OWNER);

  const getStates = useQuery(GET_SURVEY_STATES, {
    onCompleted: (data) => setSurveyStates(data.getSurveyStates),
  });

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

  const sortOptions: SortOption[] = [
    {
      option: "Ordre alphabétique",
      icon: "sort-alpha-up",
    },
    {
      option: "Ordre anti-alphabétique",
      icon: "sort-alpha-down",
    },
    {
      option: "number of questions",
      icon: "list-check",
    },
  ];

  const sortSurveys = (option: string, surveys: Survey[]) => {
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

  const displayNumberOfQuestions = (survey: Survey) => {
    if (survey.question.length > 0) {
      return `${survey.question.length} questions`;
    } else {
      return "0 questions";
    }
  };

  console.log(surveys);

  useEffect(() => {
    getSurveys({
      fetchPolicy: "network-only",
      onCompleted: (data) => setSurveys(data.getSurveysByOwner),
    });
  }, []);

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

  const SortedSurveys = sortSurveys(selectedSortOption, filteredSurveys);

  console.log("filter", areFiltersOpen, "sort", areSortedOptionsOpen);

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
        <div className="filters-container">
          <button
            className="button-md-white-outline"
            onClick={() => {
              setAreFiltersOpen(!areFiltersOpen);
              setAreSortedOptionsOpen(false);
            }}>
            <Icon name="filter" height="1rem" width="1rem" />
            Filtrer
          </button>
          {areFiltersOpen && (
            <div className="dropdown-wrapper">
              {surveyStates.map((state: SurveyState) => (
                <button
                  key={state.id}
                  onClick={() => {
                    setSelectedState(
                      state.state === selectedState ? "" : state.state
                    );
                    setAreFiltersOpen(false);
                  }}
                  className="dropdown-item">
                  <div className={`badge-lg-pale-${state.color}-square`}>
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
        </div>
        <div className="filters-container">
          <button
            className="button-md-white-outline"
            onClick={() => {
              setAreSortedOptionsOpen(!areSortedOptionsOpen);
              setAreFiltersOpen(false);
            }}>
            <Icon name="sort-alt" height="1rem" width="1rem" />
            Trier
          </button>
          {areSortedOptionsOpen && (
            <div className="dropdown-wrapper">
              {sortOptions.map((option) => (
                <button
                  onClick={() => {
                    setSelectedSortOption(option.option);
                  }}
                  className="dropdown-item">
                  <div className="option">
                    <Icon name={option.icon} height="1rem" width="1rem" />
                    <p>{option.option}</p>
                  </div>
                  {selectedSortOption === option.option && (
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
        </div>
      </section>
      <section className="my-surveys surveys">
        {SortedSurveys.map((survey: Survey) => (
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

