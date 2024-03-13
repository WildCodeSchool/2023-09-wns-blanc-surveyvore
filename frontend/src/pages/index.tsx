import NavLayout from "@/layouts/NavLayout";
import { ReactElement } from "react";

import { Survey } from "@/types/survey.type";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useEffect } from "react";

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
  const { data, loading, error } = useQuery(GET_SURVEY_BY_OWNER, {
    variables: { userId: "1c661984-597c-4c46-8f23-28bef526b760" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data);

  return (
    <>
      <section className="my-forms forms">
        <h2>Mes formulaires</h2>

        {data?.getSurveysByOwner.map((survey: Survey) => (
          <Link
            className="survey-card"
            href={`/surveys/${survey.link}`}
            key={survey.id}>
            {/* TODO: make a badge component with conditional rendering */}
            <div className="badge">
              <div className="dot" />
              <p>publié</p>
            </div>
            <span className="creation-date">
              {survey.creationDate.toString()}
            </span>
          </Link>
        ))}
      </section>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

