import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
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
    language={item.language}
    forksCount={item.forksCount}
    stargazersCount={item.stargazersCount}
    reviewCount={item.reviewCount}
    ratingAverage={item.ratingAverage}
    ownerAvatarUrl={item.ownerAvatarUrl}
  />
);

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {

  // eslint-disable-next-line no-unused-vars
  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

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