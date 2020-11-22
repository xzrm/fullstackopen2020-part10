import React from 'react';
import { View, FlatList} from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import ReviewItem from './ReviewItem';
import useSingleRepository from '../hooks/useSingleRepository';


const SingleRepository = () => {
  let { repositoryId } = useParams();

  const { loading, repository,  fetchMore} =
    useSingleRepository({ id: repositoryId, first: 4 });


  if (loading) return <View></View>;

  const reviews = repository.reviews.edges.map((edge) => edge.node);

  const onEndReach = () => {
    fetchMore();
    console.log("fetching more reviews");
    console.log(repository);
  };

  
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem repository={repository} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};


export default SingleRepository;