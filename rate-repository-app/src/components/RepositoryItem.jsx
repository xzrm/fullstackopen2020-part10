import React from 'react';
import { View, StyleSheet } from 'react-native';

import RepositoryItemFooter from './RepositoryItemFooter';
import RepositoryItemHeader from './RepositoryItemHeader';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: 'white',
    padding: 10
  },
});

const RepositoryItem = (props) => {
  return (
    <View style={styles.container}>
      <RepositoryItemHeader
        fullName={props.fullName}
        description={props.description}
        ownerAvatarUrl={props.ownerAvatarUrl}
        language={props.language}
      />
      {/* <Text>{props.language}</Text> */}
      <RepositoryItemFooter
        forksCount={props.forksCount}
        stargazersCount={props.stargazersCount}
        reviewCount={props.reviewCount}
        ratingAverage={props.ratingAverage}
      />
    </View>
  );
};


export default RepositoryItem;