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

    console.log(questions);
    const handleChange = (value: string) => {
        setQuestions((currentQuestions) => {
            return currentQuestions.map((question) => {
                if (question.id === currentQuestion?.id) {
                    // Cloner la question actuelle et ses réponses pour éviter des modifications directes
                    const updatedQuestion = { ...question };
                    const updatedAnswers = updatedQuestion.answer
                        ? [...updatedQuestion.answer]
                        : [];

                    if (updatedAnswers.length > 0) {
                        // Modifier le contenu de la première réponse de manière immuable
                        updatedAnswers[0] = {
                            ...updatedAnswers[0],
                            content: value,
                        };
                        updatedQuestion.answer = [updatedAnswers[0]];
                    } else {
                        // Ajouter une nouvelle réponse si aucune réponse n'existe
                        const newAnswer = { id: "", content: value };
                        updatedQuestion.answer = [newAnswer];
                    }

                    return updatedQuestion;
                }
                return question;
            });
        });
    };
    return (
        <div className="date-options-container">
            <div className="label">Type de sélection</div>
            <div className="input-radio input-radio--sm">
                <label htmlFor="date">
                    <input
                        type="radio"
                        id="date"
                        name="date"
                        value="date"
                        checked={
                            questionOptions.length > 0
                                ? questionOptions[0].content === "date"
                                : true
                        }
                        onChange={() => handleChange("date")}
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
                        checked={
                            questionOptions.length > 0 &&
                            questionOptions[0].content === "period"
                        }
                        onChange={() => handleChange("period")}
                    />
                    <div className="radio"></div>
                    Période
                </label>
            </div>
        </div>
    );
}
