import { gql } from '@apollo/client';


export const GET_REPOSITORIES = gql`
query {
  repositories{
    edges{
      node{
        id
        fullName
        description
        language
        forksCount
        ratingAverage
        reviewCount
        stargazersCount
        ownerAvatarUrl
        url
      }
    }
  }
}
`;

export const AUTHORIZED_USER = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;


export const GET_REPOSITORY = gql`
  query repository($id: ID!){
    repository(id: $id ) {
      id
      fullName
      description
      language
      forksCount
      ratingAverage
      reviewCount
      stargazersCount
      ownerAvatarUrl
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

