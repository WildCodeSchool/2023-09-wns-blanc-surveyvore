import { IconName } from "@/types/iconName.type";
import RadioGroup, { RadioElement } from "./RadioGroup/RadioGroup";

type Type = {
    id: string;
    type: string;
    icon: IconName;
    slug: string;
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
        icon: type.icon,
        onClick: () => setSelectedType(type.slug),
        isChecked: selectedType === type.slug,
    }));
    return (
        <>
            <RadioGroup elements={elements} name="question-type" />
        </>
    );
}

export default QuestionType;
