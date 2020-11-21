import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({orderBy, orderDirection, searchKeyword}) => {
  const { data, ...result } = useQuery(GET_REPOSITORIES,
    {
      variables: {
        "orderBy": orderBy,
        "orderDirection": orderDirection,
        "searchKeyword": searchKeyword
      },
      fetchPolicy: 'cache-and-network',    
    });

  return {
    repositories: data
      ? data.repositories
      : undefined,
    ...result
  };
};

export default useRepositories;