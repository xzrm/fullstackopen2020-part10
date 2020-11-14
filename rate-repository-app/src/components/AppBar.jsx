import React, {useContext} from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { Link } from "react-router-native";
import { AUTHORIZED_USER } from '../graphql/queries';
import { useQuery } from '@apollo/react-hooks';

import AuthStorageContext from '../contexts/AuthStorageContext';
import { useApolloClient } from '@apollo/client';


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    padding: 20,
    flexDirection: 'row',
    alignContent: 'flex-start'

  },
  item: {
    paddingRight: 20,
  }
});



const AppBar = () => {

  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);
  
  // eslint-disable-next-line no-unused-vars
  const { loading, error, data } = useQuery(AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
  });

  const signOut = () => {
      authStorage.removeAccessToken();
      apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.item}>
          <Link to="/" component={TouchableOpacity} activeOpacity={0.8}>
            <AppBarTab text={"Repository"} />
          </Link>
        </View>
        {loading
          ? <View></View>
          : data.authorizedUser === null
            ? <View style={styles.item}>
              <Link to="/signin" component={TouchableOpacity} activeOpacity={0.8}>
                <AppBarTab text={"Sign in"} />
              </Link>
            </View>
            : <View style={styles.item}>
              <TouchableOpacity style={styles.button} onPress={signOut}>
                <AppBarTab text={"Sign out"} />
              </TouchableOpacity>
            </View>
        }

      </ScrollView>
    </View>
  );
};

export default AppBar;

