import AnswerCheckboxQuestion from "@/components/Answer/AnswerCheckboxQuestion";
import AnswerCheckboxesQuestion from "@/components/Answer/AnswerCheckboxesQuestion";
import AnswerDateQuestion from "@/components/Answer/AnswerDateQuestion";
import AnswerDefaultQuestion from "@/components/Answer/AnswerDefaultQuestion";
import AnswerRadioQuestion from "@/components/Answer/AnswerRadioQuestion";
import AnswerTextQuestion from "@/components/Answer/AnswerTextQuestion";
import Icon from "@/components/Icon/Icon";
import NavLayout from "@/layouts/NavLayout";
import { Question } from "@/types/question.type";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";

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
      defaultQuestion
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

function AnswerSurvey() {
  const [questions, setQuestions] = useState<Question[] | undefined>(undefined);
  const [defaultQuestions, setDefaultQuestions] = useState<Question[] | undefined>(undefined);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  const router = useRouter();
  const { link } = router.query as { link: string };

  const [getSurveyByLink, { loading, error }] =
    useLazyQuery(GET_SURVEY_BY_LINK);
  const [getQuestions, { loading: loadingQuestions, error: errorQuestions }] =
    useLazyQuery(GET_QUESTIONS);

  useEffect(() => {
    if (link) {
      getSurveyByLink({
        variables: {
          surveyLink: link,
        },
        onCompleted: (data) => {
          setTitle(data.getSurveyByLink.title);
          setDescription(data.getSurveyByLink.description);
          setIsPrivate(data.getSurveyByLink.private);
        },
      });
      getQuestions({
        variables: {
          surveyLink: link,
        },
        onCompleted: (data) => {
          let nonDefaultQuestions = [];
          let defaultQuestions = [];
          for (let i = 0; i < data.getQuestions.length; i++) {
            if (data.getQuestions[i].defaultQuestion) {
              defaultQuestions.push(data.getQuestions[i]);
            } else {
              nonDefaultQuestions.push(data.getQuestions[i]);
            }
          }
          setDefaultQuestions(defaultQuestions);
          setQuestions(nonDefaultQuestions);
        },
      });
    }
  }, [getQuestions, getSurveyByLink, link]);

  if (loading || loadingQuestions) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (errorQuestions) {
    return <div>Error: {errorQuestions.message}</div>
  }

  return (
    <>
      <div className="answer-survey-container">
        <div className="answer-survey-data-container">
          <div className="answer-survey-title-container">
            <h1 className="answer-survey-title">{title}</h1>
            {isPrivate && <Icon name="lock" height="1rem" width="1rem" />}
          </div>
          <p className="answer-survey-description">{description}</p>
        </div>
        <div className="answer-survey-default-questions-container">
          {defaultQuestions && defaultQuestions.length > 0 && (
            defaultQuestions.map((defaultQuestion) => {
              if (defaultQuestion.id) {
                return (
                  <AnswerDefaultQuestion key={defaultQuestion.id} defaultQuestion={defaultQuestion} />
                )
              }
            })
          )}
        </div>
        <div className="answer-survey-questions-container">
          {questions && questions.length > 0 && (
            questions.map((question) => {
              switch (question.type.type) {
                case "text":
                  return (
                    <AnswerTextQuestion key={question.id} question={question} />
                  )
                case "checkboxes":
                  return (
                    <AnswerCheckboxesQuestion key={question.id} question={question} />
                  )
                case "checkbox":
                  return (
                    <AnswerCheckboxQuestion key={question.id} question={question} />
                  )
                case "radio":
                  return (
                    <AnswerRadioQuestion key={question.id} question={question} />
                  )
                case "date":
                  return (
                    <AnswerDateQuestion key={question.id} question={question} />
                  )
                default:
                  break;
              }
            })
          )
          }
        </div>
      </div>
    </>
  );
}

AnswerSurvey.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

export default AnswerSurvey;