import { Answer, Question } from "@/types/question.type";

export default function DateOptions({
    questions,
    setQuestions,
    questionId,
}: {
    questions: Question[];
    setQuestions: (questions: Question[]) => void;
    questionId: string;
}) {
    const currentQuestion: Question | null =
        questions.find((question) => question.id === questionId) || null;

    const questionOptions: Answer[] = currentQuestion?.answer || [];

    const currentOption =
        questionOptions.length > 0 ? questionOptions[0].content : null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedQuestions = questions.map((question: Question) => {
            if (question.id === currentQuestion?.id) {
                return {
                    ...question,
                    answer: [{ id: "", content: e.target.value }],
                };
            }
            return question;
        });

        setQuestions(updatedQuestions);
    };

    return (
        <div className="date-options-container">
            <p className="label">Type de sélection</p>
            <div className="input-radio input-radio--sm">
                <label htmlFor="date">
                    <input
                        type="radio"
                        id="date"
                        name="date"
                        value="date"
                        checked={currentOption === "date"}
                        onChange={handleChange}
                    />
                    <div className="radio"></div>
                    Jour unique
                </label>
            </div>
            <div className="input-radio input-radio--sm">
                <label htmlFor="period">
                    <input
                        type="radio"
                        id="period"
                        name="date"
                        value="period"
                        checked={currentOption === "period"}
                        onChange={handleChange}
                    />
                    <div className="radio"></div>
                    Période
                </label>
            </div>
        </div>
    );
}
