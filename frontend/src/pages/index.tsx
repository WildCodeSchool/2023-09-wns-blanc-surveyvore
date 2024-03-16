import NavLayout from "@/layouts/NavLayout";
import { ReactElement, useEffect, useState } from "react";
import { Survey } from "@/types/survey.type";
import { gql, useLazyQuery } from "@apollo/client";
import Link from "next/link";
import useLoggedUser from "@/hooks/useLoggedUser";
import Icon from "@/components/Icon/Icon";
import { formatDate, removeAccents } from "@/tools/format.tools";

// get les états des formulaires pour les afficher dans les filtres
// créer un composant  filters avec tableau en prop pour display les filtres
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

export default function Home() {
  const [surveys, setSurveys] = useState([]);
  const [searchSurveysValue, setSearchSurveysValue] = useState("");
  const user = useLoggedUser();

  console.log(surveys);

  const displayState = (state: string) => {
    switch (state) {
      case "draft":
        return "Brouillon";
      case "published":
        return "Publié";
      case "in-progress":
        return "En cours";
      case "Closed":
        return "Clotûré";
      case "archived":
        return "Archivé";
    }
  };

  const [getSurveys, { data, loading, error }] =
    useLazyQuery(GET_SURVEY_BY_OWNER);

  useEffect(() => {
    if (user) {
      getSurveys({
        variables: { userId: user?.id },
        fetchPolicy: "network-only",
        onCompleted: (data) => setSurveys(data.getSurveysByOwner),
      });
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredResults = surveys.filter(
    (survey: Survey) =>
      removeAccents(survey.title.toLowerCase()).includes(
        searchSurveysValue.toLowerCase().trim()
      ) ||
      (survey.description &&
        removeAccents(survey.description.toLowerCase()).includes(
          searchSurveysValue.toLowerCase().trim()
        ))
  );

  const searchSurveys = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchSurveysValue(removeAccents(e.target.value));
  };

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
        <button className="button-md-white-outline">
          <Icon name="filter" height="1rem" width="1rem" />
          Filtrer
        </button>
        {/* <div className="filters-dropdown"></div> */}
        <button className="button-md-white-outline">
          <Icon name="sort-alt" height="1rem" width="1rem" />
          Trier
        </button>
      </section>
      <section className="my-surveys surveys">
        {filteredResults.map((survey: Survey) => (
          <Link
            className="survey-card"
            href={`/surveys/${survey.link}`}
            key={survey.id}>
            <div className="card-header">
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
              <p>
                {survey.question ? `${survey.question.length} ` : "0 "}
                questions
              </p>
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

