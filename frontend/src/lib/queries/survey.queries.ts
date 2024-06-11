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

export const ARCHIVE_SURVEY = gql`
  mutation Mutation($archive: Boolean!, $link: String!) {
    archiveSurvey(archive: $archive, link: $link) {
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

export const DELETE_SURVEY = gql`
  mutation Mutation($link: String!) {
    softDeleteSurvey(link: $link) {
      id
      deleteDate
    }
  }
`;

export const CREATE_SURVEY = gql`
  mutation Mutation($title: String!) {
    createSurvey(title: $title)
  }
`;

