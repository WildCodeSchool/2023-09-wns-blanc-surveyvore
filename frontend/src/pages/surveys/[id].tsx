import DefaultQuestions from "@/components/DefaultQuestions";
import NewQuestion from "@/components/NewQuestion";
import NewSurveyHeader from "@/components/NewSurveyHeader";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

// Get les questions d'un survey
// ajouter les question du survey au state "questions" pour l'affichage
// POST du formulaire "newQuestion" au submit

const GET_SURVEY_BY_ID = gql`
  query Query($surveyId: String!) {
    getSurveyById(surveyId: $surveyId) {
      title
      private
      description
      collectingUserData
    }
  }
`;

function NewSurvey() {
  const [open, setOpen] = useState(true);
  const [questions, setQuestions] = useState([
    {
      isOpen: true,
      title: "Question sans titre",
      description: "Description de ma question",
      type: "Texte libre",
    },
  ]);

  const [title, setTitle] = useState("Formulaire sans titre");
  const [description, setDescription] = useState("");
  const [collectingData, setCollectingData] = useState(false);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  const router = useRouter();
  const { id } = router.query as { id: string };

  console.log(id);

  // TODO: l'id est undefines au début et génère une erreur de fetch
  const { loading, error } = useQuery(GET_SURVEY_BY_ID, {
    variables: {
      surveyId: id,
    },
    onCompleted: (data) => {
      setTitle(data.getSurveyById.title);
      setDescription(data.getSurveyById.description);
      setCollectingData(data.getSurveyById.collectingUserData);
      setIsPrivate(data.getSurveyById.private);
    },
  });

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
      {questions.map((question, index) => (
        <NewQuestion
          key={index}
          open={open}
          setOpen={setOpen}
          question={question}
          setQuestions={setQuestions}
          questions={questions}
          index={index}
          surveyId={id}
        />
      ))}
    </div>
  );
}

export default NewSurvey;

