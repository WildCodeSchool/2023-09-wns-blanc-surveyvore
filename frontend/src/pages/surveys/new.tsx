import DefaultQuestions from "@/components/DefaultQuestions";
import NewQuestion from "@/components/NewQuestion";
import NewSurveyHeader from "@/components/NewSurveyHeader";
import { useState } from "react";

// Get les questions d'un survey
// ajouter les question du survey au state "questions" pour l'affichage
// POST du formulaire "newQuestion" au submit

function NewSurvey() {
  const [collectingData, setCollectingData] = useState(false);
  const [open, setOpen] = useState(true);

  const [questions, setQuestions] = useState([
    {
      isOpen: true,
      title: "Question sans titre",
      description: "Description de ma question",
      type: "Texte libre",
    },
  ]);

  console.log("questions", questions);

  return (
    <div className="new-survey-content">
      <NewSurveyHeader
        collectingData={collectingData}
        setCollectingData={setCollectingData}
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
        />
      ))}
    </div>
  );
}

export default NewSurvey;

