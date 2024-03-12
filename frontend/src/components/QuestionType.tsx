import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

type Type = {
  id: string;
  type: string;
};

function QuestionType({
  types,
  selectedType,
  setSelectedType,
}: {
  types: Type[];
  selectedType: string;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <>
      <div className="question-type">
        {types.map((type) => (
          <Button
            key={type.id}
            type="button"
            text={type.type}
            className="button-lg-grey-outline"
            handleClick={() => {
              setSelectedType(type.id);
            }}
          />
        ))}
      </div>
      {/* créer un composant et implanter la logique conditionnelle pour l'affichage des différents types de questions */}
      {selectedType === "Choix multiples" && <p>choix multiples</p>}
      {selectedType === "Choix unique" && <p>choix unique</p>}
      {selectedType === "Case à cocher" && <p>case à cocher</p>}
      {selectedType === "Date / période" && <p>date / période</p>}
    </>
  );
}

export default QuestionType;

