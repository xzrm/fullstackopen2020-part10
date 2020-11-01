import { gql } from '@apollo/client';

// export const AUTHORIZE = gql`
//   mutation authorize($username: String!, $password: String!) {
//     authorize(username: $username, password: $password)  {
//       value
//     }
//   }
// `;

// export const AUTHORIZE = gql`
//   mutation authorize($username: String!, $password: String!) {
//     authorize(credentials:
//          {username: $username, password: $password})  {
//             accessToken
//     }
//   }
// `;

export const AUTHORIZE = gql`
mutation authorize($username: String!, $password: String!) {
    authorize(credentials: {username: $username, password: $password}) {
      accessToken
    }
  }
`;