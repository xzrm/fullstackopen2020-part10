import { useMutation } from '@apollo/react-hooks';
import { CREATE_REVIEW } from '../graphql/mutations';


export const useCreateReview = () => {
  const [mutation, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({
    repositoryOwnerName,
    repositoryName,
    rating,
    review
  }) => {
    return mutation({
        variables: {
          repositoryName: repositoryName,
          ownerName: repositoryOwnerName,
          rating: parseInt(rating),
          text: review
      },
    });
  };

  return [createReview, result];
};