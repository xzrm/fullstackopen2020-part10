import React from 'react';
import Text from './Text';

import {
  StyleSheet,
  View,
} from 'react-native';


const styles = StyleSheet.create({
  tabContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppBarTab = ({ text }) => {
  return (
    <View style={styles.tabContainer}>
      <Text color="textPrimaryContrast" fontWeight="bold"
        fontSize="heading">{text}</Text>
    </View>
  );
};

export default AppBarTab;