import AnswerCheckboxQuestion from "@/components/Answer/AnswerCheckboxQuestion";
import AnswerCheckboxesQuestion from "@/components/Answer/todelete_AnswerCheckboxesQuestion";
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
    archived
    creationDate
    description
    endDate
    id
    link
    private
    publicationDate
    question {
      answer {
        content
        id
      }
      title
      type {
        id
        type
      }
      description
      defaultQuestion
      id
    }
    startDate
    state {
      state
      id
    }
    title
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
          let nonDefaultQuestions = [];
          let defaultQuestions = [];
          for (let i = 0; i < data.getSurveyByLink.question.length; i++) {
            const question = data.getSurveyByLink.question[i];
            if (question.defaultQuestion) {
              defaultQuestions.push(question);
            } else {
              nonDefaultQuestions.push(question);
            }
          }
          setDefaultQuestions(defaultQuestions);
          setQuestions(nonDefaultQuestions);
        },
      });
    }
  }, [getSurveyByLink, link]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const switchAnswer = (question: Question) => {
    switch (question.type.type) {
      case "text":
        return (
          <AnswerTextQuestion key={question.id} question={question} />
        )
      case "checkboxes":
      case "checkbox":
        return (
          question.answer && question.answer.map((answerOption) => <AnswerCheckboxQuestion key={answerOption.id} answerOption={answerOption} />
          )
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
  }

  return (
    <>
      <div className="answer-survey-container">
        <div className="answer-survey-data-container">
          <div className="answer-survey-title-container">
            <h1 className="answer-survey-title">{title}</h1>
            {isPrivate && <Icon name="lock" height="1.5rem" width="1.5rem" />}
          </div>
          <p className="answer-survey-description">{description}</p>
        </div>
        {defaultQuestions && defaultQuestions.length > 0 && (
          <div className="answer-survey-default-questions-container">
            {defaultQuestions.map((defaultQuestion) => {
              if (defaultQuestion.id) {
                return (
                  <div key={defaultQuestion.id}>
                    <AnswerDefaultQuestion defaultQuestion={defaultQuestion} />
                  </div>
                )
              }
            })
            }
          </div>
        )
        }
        {questions && questions.length > 0 && (
          <div className="answer-survey-questions-container">
            {questions.map((question) => {
              return <div className="answer-container" key={question.id}>
                <p className="answer-title">{question.title}</p>
                {question.description && <p className="answer-description">{question.description}</p>}
                {switchAnswer(question)}
              </div>
            })}
          </div>
        )}
      </div>
    </>
  );
}

AnswerSurvey.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

export default AnswerSurvey;