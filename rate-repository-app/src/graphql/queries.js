import { gql } from '@apollo/client';



export const GET_REPOSITORIES = gql`
query repositories(
  $orderBy: AllRepositoriesOrderBy
  $orderDirection: OrderDirection
  $searchKeyword: String
  $first: Int
  $after: String
) {
  repositories(
    orderBy: $orderBy
    orderDirection: $orderDirection
    searchKeyword: $searchKeyword
    first: $first
    after: $after
  ) {
    edges {
      node {
        id
        fullName
        description
        language
        forksCount
        ratingAverage
        reviewCount
        stargazersCount
        ownerAvatarUrl
        createdAt
        url
      }
      cursor
    }
    pageInfo {
      endCursor
      startCursor
      totalCount
      hasNextPage
    }
  }
}
`;

export const AUTHORIZED_USER = gql`
query getAuthorizedUser($includeReviews: Boolean = false) {
  authorizedUser {
    id
    username
    reviews @include(if: $includeReviews) {
      edges {
        node {
          id
          text
          rating
          createdAt
          repository {
            name
            ownerName
            id
          }
        }
        cursor
      }
      pageInfo {
        totalCount
      }
    }
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

