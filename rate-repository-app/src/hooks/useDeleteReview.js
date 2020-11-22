import { useMutation, refetch } from '@apollo/react-hooks';
import { DELETE_REVIEW } from '../graphql/mutations';
import { AUTHORIZED_USER } from '../graphql/queries';


export const useCreateReview = () => {
  const [mutation, result] = useMutation(DELETE_REVIEW
    , {
  }
  );

  const deleteReview = async (id) => {
    console.log("id ", id);
    return mutation({
      variables: {
        id: id,
      },
    });
  };

  return [deleteReview, result];
};
