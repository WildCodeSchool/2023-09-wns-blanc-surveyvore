import RadioGroup, { RadioElement } from "./RadioGroup/RadioGroup";

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
    const elements: RadioElement[] = types.map((type) => ({
        id: type.id,
        title: type.type,
        icon: "plus",
        onClick: () => setSelectedType(type.id),
        isChecked: selectedType === type.id,
    }));
    return (
        <>
            <RadioGroup elements={elements} name="question-type" />
        </>
    );
}

export default QuestionType;
