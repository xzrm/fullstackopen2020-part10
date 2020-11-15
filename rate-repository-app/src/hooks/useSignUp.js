
import { useMutation } from '@apollo/react-hooks';
import { CREATE_USER } from '../graphql/mutations';


export const useSignUp = () => { 
  const [mutation, result] = useMutation(CREATE_USER);

  const signUp = async ({ username, password }) => {
    return mutation({
      variables: {
        username: username,
        password: password,
      },
    });
  };

  return [signUp, result];
};