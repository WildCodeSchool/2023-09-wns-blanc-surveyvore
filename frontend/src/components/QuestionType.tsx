import RadioGroup, { RadioElement } from "./RadioGroup/RadioGroup";
import type { QuestionType } from "@/types/question.type";

function QuestionType({
    types,
    selectedType,
    setSelectedType,
    questionId,
}: {
    types: QuestionType[];
    selectedType: RadioElement | undefined | QuestionType;
    setSelectedType: React.Dispatch<
        React.SetStateAction<RadioElement | undefined | QuestionType>
    >;
    questionId: string;
}) {
    const getTypeName = (type: QuestionType) => {
        switch (type.type) {
            case "text":
                return "Texte libre";
            case "checkboxes":
                return "Choix multiple";
            case "radio":
                return "Choix unique";
            case "checkbox":
                return "Case à cocher";
            case "date":
                return "Date / période";
            default:
                return type.type;
        }
    };

    const elements: RadioElement[] = types.map((type) => ({
        id: type.id,
        title: getTypeName(type),
        icon: type.icon,
        onClick: () => setSelectedType(type),
        isChecked: selectedType?.id === type.id,
    }));

    return (
        <div className="">
            <RadioGroup
                elements={elements}
                name={`question-type-${questionId}`}
            />
        </div>
    );
}

export default QuestionType;
