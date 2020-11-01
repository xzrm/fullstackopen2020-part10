import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { Link } from "react-router-native";

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.item}>
          <Link to="/" component={TouchableOpacity} activeOpacity={0.8}>
            <AppBarTab text={"Repository"} />
          </Link>
        </View>
        <View style={styles.item}>
          <Link to="/signin" component={TouchableOpacity} activeOpacity={0.8}>
            <AppBarTab text={"Sign in"} />
          </Link>
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;