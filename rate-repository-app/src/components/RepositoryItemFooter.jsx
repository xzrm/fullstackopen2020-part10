import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-around',
    padding: 5,
    
  },
  item: {
    flexDirection: 'column',
  }
});

const kFormatter = (number) => {
  return number >= 1000
    ? (number / 1000).toFixed(1) + 'k'
    : number;
};

const RepositoryItemFooter = ({ forksCount, stargazersCount,
  reviewCount, ratingAverage }) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.item}>
          <Text fontWeight="bold">{kFormatter(stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.item}>
          <Text fontWeight="bold">{kFormatter(forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.item}>
          <Text fontWeight="bold">{reviewCount}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.item}>
          <Text fontWeight="bold">{ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItemFooter;