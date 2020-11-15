import React from 'react';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import SingleRepository from './SingleRepository';
import AppBar from './AppBar';
import { Route, Switch, Redirect } from 'react-router-native';
import SignIn from './SignIn';
import SignUp from './SignUp';
import CreateReview from './CreateReview';
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8'
  },
});


const MainView = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/signin" exact>
          <SignIn />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/review" exact>
          <CreateReview />
        </Route>
        <Route path="/:repositoryId" exact>
          <SingleRepository />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default MainView;