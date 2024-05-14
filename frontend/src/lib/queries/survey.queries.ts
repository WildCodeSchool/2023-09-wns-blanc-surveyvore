import { gql } from "@apollo/client";

export const GET_SURVEY_BY_OWNER = gql`
  query GetSurveysByOwner {
    getSurveysByOwner {
      id
      title
      description
      link
      archived
      private
      collectingUserData
      startDate
      endDate
      deleteDate
      creationDate
      publicationDate
      archiveDate
      state {
        color
        state
      }
      question {
        title
        answer {
          content
        }
      }
    }
  }
`;

export const GET_SURVEY_STATES = gql`
  query Query {
    getSurveyStates {
      color
      id
      state
    }
  }
`;

