import { useState } from "react";
import Input from "./Input";
import Toggle from "./Toggle";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Button from "./Button";

// TODO: gérer les états de loading pendant la mutation et les erreurs

const EDIT_SURVEY = gql`
    mutation Mutation($survey: EditSurveyInputType!, $editSurveyId: String!) {
        editSurvey(survey: $survey, id: $editSurveyId) {
            title
            description
            collectingUserData
            private
            id
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
    const { id } = router.query;

    const privateOrPublic = [
        {
            icon: "/unlock.svg",
            text: "Public",
            alt: "padlock unlocked wich represents public form",
            additionalText: "Il sera accessible à tout le monde.",
            isPrivate: false,
        },
        {
            icon: "/lock.svg",
            text: "Privé",
            alt: "padlock locked wich represents private form",
            additionalText:
                "Il ne sera visible que par les personnes que vous invitez.",
            isPrivate: true,
        },
    ];

    const [editSurvey] = useMutation(EDIT_SURVEY, {
        variables: {
            editSurveyId: id,
            survey: {
                title: title,
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
                editSurveyId: id,
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
                editSurveyId: id,
                survey: {
                    title,
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
                placeholder="Formulaire sans titre"
                labelClassName="input-field"
                inputClassName="input"
                value={title}
                setValue={setTitle}
                onBlur={() => editSurvey()}
            />
            {/* TODO: add public and privte buttons */}
            <div className="private-public-buttons">
                {privateOrPublic.map((button, index) => (
                    <Button
                        key={index}
                        alt={button.alt}
                        icon={button.icon}
                        text={button.text}
                        type="button"
                        additionalText={button.additionalText}
                        className="button-xl-grey-outline"
                        handleClick={() => {
                            setIsPrivate(button.isPrivate),
                                onPrivateClick(button.isPrivate);
                        }}
                    />
                ))}
            </div>

            <Input
                textarea
                inputName="survey-description"
                labelClassName="input-field"
                labelName="Description (facultatif)"
                placeholder="Description de mon formulaire"
                inputClassName="textarea"
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
