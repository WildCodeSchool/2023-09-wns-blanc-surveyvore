import DefaultQuestions from "@/components/DefaultQuestions";
import NewQuestion from "@/components/NewQuestion";
import NewSurveyHeader from "@/components/NewSurveyHeader";
import { useState } from "react";

function NewSurvey() {
  const [collectingData, setCollectingData] = useState(false);
  return (
    <div className="new-survey-content">
      <NewSurveyHeader setCollectingData={setCollectingData} />
      {collectingData && <DefaultQuestions />}
      <NewQuestion />
    </div>
  );
}

export default NewSurvey;

