import AnswerCheckboxQuestion from "@/components/Answer/AnswerCheckboxQuestion";
import AnswerCheckboxesQuestion from "@/components/Answer/AnswerCheckboxesQuestion";
import AnswerDateQuestion from "@/components/Answer/AnswerDateQuestion";
import AnswerDefaultQuestion from "@/components/Answer/AnswerDefaultQuestion";
import AnswerRadioQuestion from "@/components/Answer/AnswerRadioQuestion";
import AnswerTextQuestion from "@/components/Answer/AnswerTextQuestion";
import Icon from "@/components/Icon/Icon";
import NavLayout from "@/layouts/NavLayout";
import { Question } from "@/types/question.type";
import { QuestionForAnswerPage } from "@/types/questionForAnswerPage.type";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
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
        sort
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

const POST_ANSWER = gql`
  mutation CreateAnswer(
    $user: String!
    $answer: String!
    $question: String!
    $content: String!
  ) {
    createAnswer(
      user: $user
      answer: $answer
      question: $question
      content: $content
    ) {
      question {
        id
      }
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
  const [checkboxQuestion, setCheckboxQuestion] = useState<string[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  const [answers, setAnswers] = useState({});

  const router = useRouter();
  const { link } = router.query as { link: string };

  let userAnswering: string = "";
  const token = localStorage.getItem("token");
  if (token) userAnswering = token;

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
          let checkboxQuestion = [];
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
            if (question.type.type === "checkbox") {
              checkboxQuestion.push(question.id);
            }
          }
          setDefaultQuestions(defaultQuestions);
          setQuestions(nonDefaultQuestions);
          setCheckboxQuestion(checkboxQuestion);
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
          return (
            <div className="checkboxes-container">
              {question.answer &&
                question.answer.map((answerOption) => (
                  <AnswerCheckboxesQuestion
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
        case "checkbox":
          return (
            <div className="checkbox-container">
              <AnswerCheckboxQuestion
                key={question.id}
                question={question}
                questions={questionList}
                setQuestions={
                  setQuestions as React.Dispatch<
                    React.SetStateAction<QuestionForAnswerPage[]>
                  >
                }
              />
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

  const [postAnswer] = useMutation(POST_ANSWER);

  const onSubmit = useCallback(
    async (event: FormEvent) => {
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

      // Collect all radio groups and checkbxo group
      inputs.forEach((input) => {
        if (input.type === "radio") {
          radioGroups.add(input.name);
        }
        if (input.type === "checkbox") {
          for (let i = 0; i < checkboxQuestion.length; i++) {
            if (checkboxQuestion[i] !== input.name) {
              checkboxGroups.add(input.name);
            } else {
              answersInForm[input.name] = JSON.stringify(["no_answer"]);
            }
          }
        }
      });

      // Check formData for all keys and radio groups and checkboxes groups
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
        for (let [key, value] of Object.entries(answersInForm)) {
          if (value && JSON.parse(value).length === 0) {
            console.error("Answer is empty");
          } else {
            const answersInValue = JSON.parse(value);
            for (let i = 0; i < answersInValue.length; i++) {
              const answer = answersInValue[i];
              if (
                key.startsWith("input-date_") ||
                key.startsWith("question_")
              ) {
                key = key.split("_")[1];
              }
              const regexUUID =
                /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
              let answerToSend: string = "";
              let contentToSend: string = "";
              if (answer.match(regexUUID)) {
                answerToSend = answer;
              } else {
                contentToSend = answer;
              }
              console.log(token, answer, key);
              try {
                await postAnswer({
                  variables: {
                    user: token,
                    answer: answerToSend,
                    question: key,
                    content: contentToSend,
                  },
                });
              } catch (error) {
                console.error("Error posting answer:", error);
              }
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
                    {question.type.type !== "checkbox" && (
                      <p className="answer-title">{question.title}</p>
                    )}
                    {question.type.type !== "checkbox" &&
                      question.description && (
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
