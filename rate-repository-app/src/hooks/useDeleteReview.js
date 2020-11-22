import { useMutation } from '@apollo/react-hooks';
import { DELETE_REVIEW } from '../graphql/mutations';



export const useCreateReview = () => {
  const [mutation, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async (id) => {
    return mutation({
      variables: {
        id: id,
      },
    });
  };

  return [deleteReview, result];
};
