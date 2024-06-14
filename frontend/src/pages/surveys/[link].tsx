import DefaultQuestions from "@/components/DefaultQuestions";
import NewQuestion from "@/components/NewQuestion";
import NewSurveyHeader from "@/components/NewSurveyHeader";
import NavLayout from "@/layouts/NavLayout";
import { EDIT_QUESTION, GET_QUESTIONS } from "@/lib/queries/questions.queries";
import { Question } from "@/types/question.type";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { Reorder } from "framer-motion";

const GET_SURVEY_BY_LINK = gql`
    query Query($surveyLink: String!) {
        getSurveyByLink(surveyLink: $surveyLink) {
            title
            private
            description
            collectingUserData
        }
    }
`;

function NewSurvey() {
    const [questions, setQuestions] = useState<Question[] | undefined>(
        undefined
    );

    const [emptyQuestion, setEmptyQuestion] = useState<Question[]>([
        {
            id: "empty",
            title: "Nouvelle question",
            description: "",
            type: {
                icon: "",
                id: "",
                type: "",
            },
            answer: [],
            isOpen: true,
        },
    ]);

    const [title, setTitle] = useState("Formulaire sans titre");
    const [description, setDescription] = useState("");
    const [collectingData, setCollectingData] = useState(false);
    const [isPrivate, setIsPrivate] = useState<boolean>(false);

    const router = useRouter();
    const { link } = router.query as { link: string };

    const [getSurveyByLink, { loading, error }] =
        useLazyQuery(GET_SURVEY_BY_LINK);

    const [
        getQuestions,
        { loading: loadingQuestions, error: errorQuestions, refetch },
    ] = useLazyQuery(GET_QUESTIONS, {
        fetchPolicy: "network-only",
        variables: {
            surveyLink: link,
        },
        onCompleted: (data) => {
            setEmptyQuestion([
                {
                    id: "empty",
                    title: "Nouvelle question",
                    description: "",
                    type: {
                        icon: "",
                        id: "",
                        type: "",
                    },
                    answer: [],
                    isOpen: true,
                },
            ]);
            let newQuestions = data.getQuestions.map((question: any) => ({
                isOpen: false,
                ...question,
            }));
            setQuestions(newQuestions);
        },
    });

    const [editQuestion] = useMutation(EDIT_QUESTION);
    const totalQuestions = questions ? questions.length : 0;

    async function handleQuestionsReorder(questions: Question[]) {
        setQuestions(questions);
        await Promise.all(
            questions.map((question, index) => {
                return editQuestion({
                    variables: {
                        id: question.id,
                        question: {
                            sort: index + 1,
                        },
                    },
                });
            })
        );
    }

    useEffect(() => {
        if (link) {
            getSurveyByLink({
                fetchPolicy: "network-only",
                variables: {
                    surveyLink: link,
                },

                onCompleted: (data) => {
                    setTitle(data.getSurveyByLink.title);
                    setDescription(data.getSurveyByLink.description);
                    setCollectingData(data.getSurveyByLink.collectingUserData);
                    setIsPrivate(data.getSurveyByLink.private);
                },
            });
            getQuestions();
        }
    }, [link]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (errorQuestions) {
        return <div>Error: {errorQuestions.message}</div>;
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
            {loadingQuestions || !questions ? (
                <div>Loading...</div>
            ) : (
                <>
                    <NewQuestion
                        question={emptyQuestion[0]}
                        setQuestions={setEmptyQuestion}
                        questions={emptyQuestion}
                        surveyLink={link}
                        getQuestions={getQuestions}
                        index={totalQuestions + 1}
                    />
                    <Reorder.Group
                        axis="y"
                        values={questions}
                        onReorder={handleQuestionsReorder}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 10,
                        }}
                    >
                        {questions.map((question, index) => {
                            return (
                                <Reorder.Item
                                    key={question.id}
                                    value={question}
                                >
                                    <NewQuestion
                                        question={question}
                                        setQuestions={setQuestions}
                                        questions={questions}
                                        surveyLink={link}
                                        getQuestions={getQuestions}
                                        index={index}
                                    />
                                </Reorder.Item>
                            );
                        })}
                    </Reorder.Group>
                </>
            )}
        </div>
    );
}

NewSurvey.getLayout = function getLayout(page: ReactElement) {
    return (
        <NavLayout badge backToForms publish signOut>
            {page}
        </NavLayout>
    );
};

export default NewSurvey;
