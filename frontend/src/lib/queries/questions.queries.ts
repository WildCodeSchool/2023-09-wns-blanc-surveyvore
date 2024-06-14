import { gql } from "@apollo/client";

export const GET_TYPES = gql`
    query GetAllTypes {
        getAllTypes {
            id
            type
            icon
        }
    }
`;

export const CREATE_QUESTION = gql`
    mutation CreateQuestion($question: CreateQuestionInputType!) {
        createQuestion(question: $question) {
            id
            type {
                type
            }
        }
    }
`;

export const EDIT_QUESTION = gql`
    mutation EditQuestion($question: EditQuestionInputType!, $id: String!) {
        editQuestion(question: $question, id: $id) {
            id
            type {
                type
            }
        }
    }
`;

export const DELETE_QUESTION = gql`
    mutation DeleteQuestion($id: String!) {
        deleteQuestion(id: $id)
    }
`;

export const ADD_QUESTION_ANSWER = gql`
    mutation CreateQuestionAnswer(
        $questionAnswer: CreateQuestionAnswerInputType!
    ) {
        createQuestionAnswer(questionAnswer: $questionAnswer) {
            content
        }
    }
`;

export const EDIT_QUESTION_ANSWER = gql`
    mutation EditQuestionAnswer(
        $id: String!
        $questionAnswer: EditQuestionAnswerInputType!
    ) {
        editQuestionAnswer(id: $id, questionAnswer: $questionAnswer) {
            content
        }
    }
`;

export const GET_QUESTIONS = gql`
    query GetQuestions($surveyLink: String!) {
        getQuestions(surveyLink: $surveyLink) {
            id
            title
            description
            sort
            type {
                icon
                id
                type
            }
            answer {
                content
                id
            }
        }
    }
`;
