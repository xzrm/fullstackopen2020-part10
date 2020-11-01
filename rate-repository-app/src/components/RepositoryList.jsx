import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
// import useRepositories from '../hooks/useRepositories';
import Text from './Text';
import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const renderItem = ({ item }) => (
  <RepositoryItem fullName={item.fullName}
    description={item.description == null ? "" : item.description}
    // language={item.language}
    // forksCount={item.forksCount}
    // stargazersCount={item.stargazersCount}
    reviewCount={item.reviewCount}
    ratingAverage={item.ratingAverage}
  // ownerAvatarUrl={item.ownerAvatarUrl}
  />
);

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {

  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  if(!loading){
    console.log(data);
  }

  const repositoryNodes = data == undefined
    ? []
    : data.repositories.edges.map(edge => edge.node);

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
    />
  );
};

export default RepositoryList;