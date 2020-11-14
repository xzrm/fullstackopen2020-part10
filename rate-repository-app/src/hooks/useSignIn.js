import { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { AUTHORIZE } from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useApolloClient } from '@apollo/client';


export const useSignIn = () => {
  const apolloClient = useApolloClient();

  const authStorage = useContext(AuthStorageContext);
  
  const [mutation, result] = useMutation(AUTHORIZE, {
    onCompleted: (data) => {
      authStorage.setAccessToken(data.authorize.accessToken);
      apolloClient.resetStore();
    },
  });

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
