import DefaultQuestions from "@/components/DefaultQuestions";
import NewQuestion from "@/components/NewQuestion";
import NewSurveyHeader from "@/components/NewSurveyHeader";
import NavLayout from "@/layouts/NavLayout";
import { GET_QUESTIONS } from "@/lib/queries/questions.queries";
import { Question } from "@/types/question.type";
import { gql, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";

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
    ] = useLazyQuery(GET_QUESTIONS, { fetchPolicy: "network-only" });

    // const [isRefetched, setIsRefetched] = useState(false);

    // function handleRefetch() {
    //     setIsRefetched(!isRefetched);
    // }

    const emptyQuestion = {
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
    };

    useEffect(() => {
        if (link) {
            getSurveyByLink({
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
            getQuestions({
                variables: {
                    surveyLink: link,
                },

                onCompleted: (data) => {
                    let newQuestions = data.getQuestions.map(
                        (question: any) => {
                            return {
                                isOpen: false,
                                ...question,
                            };
                        }
                    );

                    newQuestions.unshift(emptyQuestion);
                    setQuestions(newQuestions);
                },
            });
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
                questions.map((question) => (
                    <NewQuestion
                        key={question.id}
                        question={question}
                        setQuestions={setQuestions}
                        questions={questions}
                        surveyLink={link}
                        // refetch={refetchQuestions}
                        refetch={refetch}
                    />
                ))
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
