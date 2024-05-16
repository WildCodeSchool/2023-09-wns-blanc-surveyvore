import Input from "./Input";
import Toggle from "./Toggle";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import RadioGroup, { RadioElement } from "./RadioGroup/RadioGroup";

// TODO: gérer les états de loading pendant la mutation et les er  reurs

const EDIT_SURVEY = gql`
    mutation Mutation($survey: EditSurveyInputType!, $editSurveyLink: String!) {
        editSurvey(survey: $survey, link: $editSurveyLink) {
            title
            description
            collectingUserData
            private
            link
        }
    }
`;

function NewSurveyHeader({
    setCollectingData,
    collectingData,
    title,
    setTitle,
    description,
    setDescription,
    isPrivate,
    setIsPrivate,
}: {
    setCollectingData: React.Dispatch<React.SetStateAction<boolean>>;
    collectingData: boolean;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    isPrivate: boolean;
    setIsPrivate: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const router = useRouter();
    const { link } = router.query;

    const privacyChoices: RadioElement[] = [
        {
            id: "public",
            title: "Public",
            icon: "unlock",
            description: "Il sera accessible à tout le monde.",
            onClick: () => setIsPrivate(false),
            isChecked: !isPrivate,
        },
        {
            id: "private",
            title: "Privé",
            icon: "lock",
            description:
                "Il ne sera visible que par les personnes que vous invitez.",
            onClick: () => setIsPrivate(true),
            isChecked: isPrivate,
        },
    ];

    const [editSurvey] = useMutation(EDIT_SURVEY, {
        variables: {
            editSurveyLink: link,
            survey: {
                title: title ? title : "Formulaire sans titre",
                description: description ? description : "",
                collectingUserData: collectingData,
                private: isPrivate,
            },
        },
    });

    const onToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCollectingData(e.target.checked);
        editSurvey({
            variables: {
                editSurveyLink: link,
                survey: {
                    title,
                    description: description ? description : "",
                    collectingUserData: e.target.checked,
                    private: isPrivate,
                },
            },
        });
    };

    const onPrivateClick = (isPrivate: boolean) => {
        editSurvey({
            variables: {
                editSurveyLink: link,
                survey: {
                    title: title ? title : "Formulaire sans titre",
                    description: description ? description : "",
                    collectingUserData: collectingData,
                    private: isPrivate,
                },
            },
        });
    };

    return (
        <section className="new-survey-header-section survey-section">
            <Input
                focus
                type="text"
                inputName="survey-title"
                placeholder="Titre du formulaire"
                value={title}
                setValue={setTitle}
                inputClassName="survey-input-title"
                onBlur={() => editSurvey()}
            />
            <div className="private-public-buttons">
                <RadioGroup elements={privacyChoices} name="survey-privacy" />
            </div>

            <Input
                textarea
                inputName="survey-description"
                labelName="Description (facultatif)"
                placeholder="Description de mon formulaire"
                value={description}
                setValue={setDescription}
                onBlur={() => editSurvey()}
            />
            <div className="input-switch input-switch--sm">
                <Toggle
                    checked={collectingData}
                    inputName="collecting-data"
                    labelName="Collecter les données de l'utilisateur·rice"
                    onChange={onToggleChange}
                />
            </div>
        </section>
    );
}

export default NewSurveyHeader;
