import RadioGroup, { RadioElement } from "./RadioGroup/RadioGroup";
import type { QuestionType } from "@/types/question.type";

function QuestionType({
  types,
  selectedType,
  setSelectedType,
}: {
  types: QuestionType[];
  selectedType: RadioElement | undefined | QuestionType;
  setSelectedType: React.Dispatch<
    React.SetStateAction<RadioElement | undefined | QuestionType>
  >;
}) {
  const elements: RadioElement[] = types.map((type) => ({
    id: type.id,
    title: type.type,
    icon: type.icon,
    onClick: () => setSelectedType(type),
    isChecked: selectedType?.id === type.id,
  }));
  return (
    <>
      <RadioGroup elements={elements} name="question-type" />
    </>
  );
}

export default QuestionType;

