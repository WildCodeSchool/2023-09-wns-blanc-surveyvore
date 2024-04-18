import DefaultQuestions from "@/components/DefaultQuestions";
import NewQuestion from "@/components/NewQuestion";
import NewSurveyHeader from "@/components/NewSurveyHeader";
import NavLayout from "@/layouts/NavLayout";
import { Question } from "@/types/question.type";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";

// Get les questions d'un survey
// ajouter les question du survey au state "questions" pour l'affichage
// POST du formulaire "newQuestion" au submit

const GET_SURVEY_BY_LINK = gql`
  query Query($surveyLink: String!) {
    getSurveyByLink(surveyLink: $surveyLink) {
      title
      private
      description
      collectingUserData
    }
  }
`;

const GET_QUESTIONS = gql`
  query Query($surveyLink: String!) {
    getQuestions(surveyLink: $surveyLink) {
      id
      title
      description
      type {
        icon
        id
        type
      }
      answer {
        content
        id
      }
    }
  }
`;

function NewSurvey() {
  const [questions, setQuestions] = useState<Question[] | undefined>(undefined);

  const [title, setTitle] = useState("Formulaire sans titre");
  const [description, setDescription] = useState("");
  const [collectingData, setCollectingData] = useState(false);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  const router = useRouter();
  const { link } = router.query as { link: string };

  const [getSurveyByLink, { loading, error }] =
    useLazyQuery(GET_SURVEY_BY_LINK);
  const [getQuestions, { loading: loadingQuestions, error: errorQuestions }] =
    useLazyQuery(GET_QUESTIONS);

  const emptyQuestion = {
    id: "empty",
    title: "Nouvelle question",
    description: "",
    type: {
      icon: "",
      id: "",
      type: "",
    },
    answer: [],
    isOpen: true,
  };

  useEffect(() => {
    if (link) {
      getSurveyByLink({
        variables: {
          surveyLink: link,
        },
        onCompleted: (data) => {
          setTitle(data.getSurveyByLink.title);
          setDescription(data.getSurveyByLink.description);
          setCollectingData(data.getSurveyByLink.collectingUserData);
          setIsPrivate(data.getSurveyByLink.private);
        },
      });
      getQuestions({
        variables: {
          surveyLink: link,
        },
        onCompleted: (data) => {
          let newQuestions = data.getQuestions.map((question: any) => {
            return {
              isOpen: false,
              ...question,
            };
          });

          newQuestions.unshift(emptyQuestion);
          setQuestions(newQuestions);
        },
      });
    }
  }, [link]);

  const refetchQuestions = () => {
    getQuestions({
      variables: {
        surveyLink: link,
      },
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        let newQuestions = data.getQuestions.map((question: any) => {
          return {
            isOpen: false,
            ...question,
          };
        });

        newQuestions.unshift(emptyQuestion);
        setQuestions(newQuestions);
      },
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="new-survey-content">
      <NewSurveyHeader
        collectingData={collectingData}
        setCollectingData={setCollectingData}
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
        isPrivate={isPrivate}
        setIsPrivate={setIsPrivate}
      />
      {collectingData && <DefaultQuestions />}
      {loadingQuestions || !questions ? (
        <div>Loading...</div>
      ) : (
        questions.map((question) => (
          <NewQuestion
            key={question.id}
            question={question}
            setQuestions={setQuestions}
            questions={questions}
            surveyLink={link}
            refetch={refetchQuestions}
          />
        ))
      )}
    </div>
  );
}

NewSurvey.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

export default NewSurvey;

