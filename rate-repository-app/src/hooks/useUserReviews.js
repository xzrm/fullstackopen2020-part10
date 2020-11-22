import { useQuery } from '@apollo/react-hooks';
import { AUTHORIZED_USER } from '../graphql/queries';

const useUserReviews = (variables) => {
  const { loading, error, data, refetch } = useQuery(AUTHORIZED_USER, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  return {
    data: data ? data: undefined,
    refetch: refetch,
    loading,
    error
  };
};

export default useUserReviews;