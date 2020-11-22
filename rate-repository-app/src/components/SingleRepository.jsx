import React from 'react';
import { View, FlatList} from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORY } from '../graphql/queries';
import ReviewItem from './ReviewItem';


const SingleRepository = () => {
  let { repositoryId } = useParams();
  console.log(repositoryId);

  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id: repositoryId },
  });

  if (loading) return <View></View>;
  if (error) return `Error! ${error}`;

  const repository = data.repository;
  const reviews = repository.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem repository={repository} />}
    />
  );
};


export default SingleRepository;