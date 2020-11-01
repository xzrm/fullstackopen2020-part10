import { useMutation } from '@apollo/react-hooks';
import { AUTHORIZE } from '../graphql/mutations';


export const useSignIn = () => {
    const [mutation, result] = useMutation(AUTHORIZE);

    const signIn = async ({ username, password }) => {
        return mutation({
            variables: {
              username: username,
              password: password,
            },
          });
    };

    return [signIn, result];
};
