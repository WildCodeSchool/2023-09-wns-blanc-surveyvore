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
import {
  FormEvent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
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
  const [questions, setQuestions] = useState<
    QuestionForAnswerPage[] | undefined
  >(undefined);
  const [defaultQuestions, setDefaultQuestions] = useState<
    QuestionForAnswerPage[] | undefined
  >(undefined);

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
            const question = {
              ...data.getSurveyByLink.question[i],
              isError: false,
            };
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

  const switchAnswer = useCallback(
    (
      question: QuestionForAnswerPage,
      questionList: QuestionForAnswerPage[]
    ) => {
      switch (question.type.type) {
        case "text":
          return (
            <AnswerTextQuestion
              key={question.id}
              question={question}
              questions={questionList}
              setQuestions={
                setQuestions as React.Dispatch<
                  React.SetStateAction<QuestionForAnswerPage[]>
                >
              }
            />
          );
        case "checkboxes":
        case "checkbox":
          return (
            <div className="checkboxes-container">
              {question.answer &&
                question.answer.map((answerOption) => (
                  <AnswerCheckboxQuestion
                    key={answerOption.id}
                    answerOption={answerOption}
                    questionId={question.id}
                    questions={questionList}
                    setQuestions={
                      setQuestions as React.Dispatch<
                        React.SetStateAction<QuestionForAnswerPage[]>
                      >
                    }
                  />
                ))}
            </div>
          );
        case "radio":
          return (
            <div className="radios-container">
              {question.answer &&
                question.answer.map((answerOption) => (
                  <AnswerRadioQuestion
                    key={answerOption.id}
                    answerOption={answerOption}
                    questionId={question.id}
                    questions={questionList}
                    setQuestions={
                      setQuestions as React.Dispatch<
                        React.SetStateAction<QuestionForAnswerPage[]>
                      >
                    }
                  />
                ))}
            </div>
          );
        case "date":
          return (
            <AnswerDateQuestion
              key={question.id}
              question={question}
              questions={questionList}
              setQuestions={
                setQuestions as React.Dispatch<
                  React.SetStateAction<QuestionForAnswerPage[]>
                >
              }
            />
          );
        default:
          break;
      }
    },
    []
  );

  const getNumberOfQuestions = useCallback((): number => {
    let questionsTotalNumber: number = 0;
    let questionsNonDefaultNumber: number = 0;
    let questionsDefaulNumber: number = 0;
    if (questions) questionsNonDefaultNumber = questions.length;
    if (defaultQuestions) questionsDefaulNumber = defaultQuestions.length;
    questionsTotalNumber = questionsNonDefaultNumber + questionsDefaulNumber;
    return questionsTotalNumber;
  }, [defaultQuestions, questions]);

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const onSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      const formData = new FormData(event.target as HTMLFormElement);
      const answersInForm: { [key: string]: string } = {};
      const unansweredQuestions: Array<string> = [];

      const formElement = event.target as HTMLFormElement;
      // Get all input elements
      const inputs = formElement.querySelectorAll("input");

      // Keep track of radio button and checkbox groups
      const radioGroups = new Set<string>();
      const checkboxGroups = new Set<string>();

      // Collect all radio groups
      inputs.forEach((input) => {
        if (input.type === "radio") {
          radioGroups.add(input.name);
        }
        if (input.type === "checkbox") {
          checkboxGroups.add(input.name);
        }
      });

      // Check formData for all keys and radio groups
      for (const key of formData.keys()) {
        if (formData.get(key)) {
          answersInForm[key] = JSON.stringify(formData.getAll(key));
          radioGroups.delete(key); // Remove from radio groups if answered
          checkboxGroups.delete(key); // Remove from checkbox groups if answered
        } else {
          unansweredQuestions.push(key);
        }
      }

      // Check any remaining radio groups
      radioGroups.forEach((group) => {
        const radios = formElement.querySelectorAll(`input[name="${group}"]`);
        let isChecked = false;
        radios.forEach((radio) => {
          if ((radio as HTMLInputElement).checked) {
            isChecked = true;
          }
        });
        if (!isChecked) {
          unansweredQuestions.push(group);
        }
      });

      // Check any remaining checkbox groups
      checkboxGroups.forEach((group) => {
        const checkboxes = formElement.querySelectorAll(
          `input[name="${group}"]`
        );
        let isChecked = false;
        checkboxes.forEach((checkbox) => {
          if ((checkbox as HTMLInputElement).checked) {
            isChecked = true;
          }
        });
        if (!isChecked) {
          unansweredQuestions.push(group);
        }
      });

      // check if all questions are answered
      if (getNumberOfQuestions() === Object.keys(answersInForm).length) {
        console.log("every answer completed");
        for (const [key, value] of Object.entries(answersInForm)) {
          console.log(`${key}: ${value}`);
          if (value && JSON.parse(value).length === 0) {
            console.error("Answer is empty");
          } else {
            const answersInValue = JSON.parse(value);
            for (let i = 0; i < answersInValue.length; i++) {
              const answer = answersInValue[i];
            }
          }
        }
      } else {
        console.log(
          `${
            Object.keys(answersInForm).length
          }/${getNumberOfQuestions()} answers completed`
        );
        Toast.fire({
          icon: "error",
          title: "Les champs ne sont pas tous remplis",
        });

        unansweredQuestions.forEach((question) => {
          let questionId: string = question;
          let questionsCopy = [...(questions as QuestionForAnswerPage[])];
          let defaultQuestionsCopy = [
            ...(defaultQuestions as QuestionForAnswerPage[]),
          ];
          if (questionsCopy) {
            if (question.startsWith("input-date_"))
              questionId = question.split("_")[1];
            for (let i = 0; i < questionsCopy.length; i++) {
              if (questionsCopy[i].id === questionId) {
                questionsCopy[i]["isError"] = true;
                setQuestions(questionsCopy);
              }
            }
          }
          if (defaultQuestionsCopy) {
            if (question.startsWith("question_"))
              questionId = question.split("_")[1];
            for (let i = 0; i < defaultQuestionsCopy.length; i++) {
              if (defaultQuestionsCopy[i].id === questionId) {
                defaultQuestionsCopy[i].isError = true;
                setDefaultQuestions(defaultQuestionsCopy);
              }
            }
          }
        });
      }
    },
    [questions, defaultQuestions, getNumberOfQuestions]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
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
                      <AnswerDefaultQuestion
                        defaultQuestion={defaultQuestion}
                        setAnswers={setAnswers}
                        answers={answers}
                        isError={defaultQuestion.isError}
                        defaultQuestions={defaultQuestions}
                        setDefaultQuestions={setDefaultQuestions}
                      />
                    </div>
                  );
                }
              })}
            </div>
          )}
          {questions && questions.length > 0 && (
            <div className="answer-survey-questions-container">
              {questions.map((question) => {
                return (
                  <div
                    id={question.id}
                    className={`answer-container ${
                      question.isError ? "is-error" : ""
                    }`}
                    key={question.id}
                  >
                    <p className="answer-title">{question.title}</p>
                    {question.description && (
                      <p className="answer-description">
                        {question.description}
                      </p>
                    )}
                    {switchAnswer(question, questions)}
                  </div>
                );
              })}
            </div>
          )}
          <button className="button-send-answer button-md-primary-solid">
            <Icon name="paper-plane-top" />
            Envoyer la réponse
          </button>
        </div>
      </form>
    </>
  );
}

AnswerSurvey.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

export default AnswerSurvey;
