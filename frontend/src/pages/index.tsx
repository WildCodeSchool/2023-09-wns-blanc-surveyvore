import NavLayout from "@/layouts/NavLayout";
import { ReactElement, useEffect, useState } from "react";
import { Survey } from "@/types/survey.type";
import { gql, useLazyQuery } from "@apollo/client";
import Link from "next/link";
import useLoggedUser from "@/hooks/useLoggedUser";
import Icon from "@/components/Icon/Icon";
import { format } from "date-fns";

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
    }
  }
`;

export default function Home() {
  const [surveys, setSurveys] = useState([]);
  const [searchSurveysValue, setSearchSurveysValue] = useState("");
  const user = useLoggedUser();

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

  const formatDate = (date: Date) => {
    return format(new Date(date), "dd/MM/yyyy");
  };

  const removeAccents = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

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
    setSearchSurveysValue(e.target.value);
  };

  return (
    <div className="home-page">
      <h2 className="text--medium">Mes formulaires</h2>
      <label className="search-surveys-label" htmlFor="search-surveys">
        <Icon name="search" height="1rem" width="1rem" />
        <input
          type="search"
          name="search-surveys"
          id="search-surveys"
          placeholder="Rechercher..."
          onChange={(e) => searchSurveys(e)}
        />
      </label>
      <section className="my-forms forms">
        {filteredResults.map((survey: Survey) => (
          <Link
            className="survey-card"
            href={`/surveys/${survey.link}`}
            key={survey.id}>
            {/* TODO: make a badge component with conditional rendering */}
            <div className="card-header">
              <div className="badge">
                <div className="dot" />
                <p className="text-xs text--medium">publié</p>
              </div>
              <button className="settings" type="button">
                <Icon name="dots" height="1rem" width="1rem"></Icon>
              </button>
            </div>

            <h3 className="title text-lg text--medium">{survey.title}</h3>
            <p className="description text-sm">{survey.description}</p>

            <span className="creation-date text-sm">
              {formatDate(survey.creationDate)}
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

