import AnswerCheckboxQuestion from "@/components/Answer/AnswerCheckboxQuestion";
import AnswerDateQuestion from "@/components/Answer/AnswerDateQuestion";
import AnswerDefaultQuestion from "@/components/Answer/AnswerDefaultQuestion";
import AnswerRadioQuestion from "@/components/Answer/AnswerRadioQuestion";
import AnswerTextQuestion from "@/components/Answer/AnswerTextQuestion";
import Icon from "@/components/Icon/Icon";
import NavLayout from "@/layouts/NavLayout";
import { Question } from "@/types/question.type";
import { QuestionForAnswerPage } from "@/types/questionForAnswerPage.type";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { FormEvent, ReactElement, useEffect, useState } from "react";
import Swal from "sweetalert2";

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
  const [questions, setQuestions] = useState<QuestionForAnswerPage[] | undefined>(undefined);
  const [defaultQuestions, setDefaultQuestions] = useState<QuestionForAnswerPage[] | undefined>(undefined);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  const [answers, setAnswers] = useState({});

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
            const question = { ...data.getSurveyByLink.question[i] };
            question["isError"] = false;
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
          <div className="checkboxes-container">
            {question.answer && question.answer.map((answerOption) => <AnswerCheckboxQuestion key={answerOption.id} answerOption={answerOption} questionId={question.id} />)}
          </div>
        )
      case "radio":
        return (
          <div className="radios-container">
            {question.answer && question.answer.map((answerOption) => <AnswerRadioQuestion key={answerOption.id} answerOption={answerOption} questionId={question.id} />)}
          </div>
        )
      case "date":
        return (
          <AnswerDateQuestion key={question.id} question={question} />
        )
      default:
        break;
    }
  }

  const getNumberOfQuestions = (): number => {
    let questionsTotalNumber: number = 0;
    let questionsNonDefaultNumber: number = 0;
    let questionsDefaulNumber: number = 0;
    if (questions) questionsNonDefaultNumber = questions.length;
    if (defaultQuestions) questionsDefaulNumber = defaultQuestions.length;
    questionsTotalNumber = questionsNonDefaultNumber + questionsDefaulNumber;
    return questionsTotalNumber
  }

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const answersInForm: { [key: string]: string } = {};
    const unansweredQuestions: Array<string> = [];
    for (const key of formData.keys()) {
      if (formData.get(key)) {
        answersInForm[key] = JSON.stringify(formData.getAll(key));
      } else {
        unansweredQuestions.push(key);
      }
    }
    console.log(unansweredQuestions)
    if (getNumberOfQuestions() === Object.keys(answersInForm).length) {
      console.log("every answer completed");
    } else {
      console.log(`${Object.keys(answersInForm).length}/${getNumberOfQuestions()} answers completed`);
      Toast.fire({
        icon: "error",
        title: "Les champs ne sont pas tous remplis"
      });
      unansweredQuestions.forEach((question) => {
        console.log({ questions })
        if (questions) {
          for (let i = 0; i < questions.length; i++) {
            if (questions[i].id === question) {
              questions[i].isError = true;
            }
          }
        }
      })
    }
  }

  return (
    <>
      <form id="answer-form" onSubmit={onSubmit}>
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
                      <AnswerDefaultQuestion defaultQuestion={defaultQuestion} setAnswers={setAnswers} answers={answers} isError={defaultQuestion.isError} />
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
          <button className="button-send-answer button-md-primary-solid"><Icon name="paper-plane-top" />Envoyer la réponse</button>
        </div>
      </form>
    </>
  );
}

AnswerSurvey.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

export default AnswerSurvey;