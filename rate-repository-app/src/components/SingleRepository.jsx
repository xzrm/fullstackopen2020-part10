import React from 'react';
import { FlatList} from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import ReviewItem from './ReviewItem';
import { GET_REPOSITORY } from '../graphql/queries';
import { useQuery } from '@apollo/react-hooks';

const updateQuery = (previousResult, { fetchMoreResult }) => {
  const nextResult = {
    repository: {
      ...fetchMoreResult.repository,
      reviews: {
        ...fetchMoreResult.repository.reviews,
        edges: [
          ...previousResult.repository.reviews.edges,
          ...fetchMoreResult.repository.reviews.edges,
        ],
      },
    },
  };

  return nextResult;
};

const SingleRepository = () => {
  let { repositoryId } = useParams();

  const variables = { id: repositoryId, first: 4 };

  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const repository = data ? data.repository : undefined;

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data.repository && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORY,
      variables: {
        ...variables,
        after: data.repository.reviews.pageInfo.endCursor,
      },
      updateQuery,
    });
  };

  const reviews = repository
  ? repository.reviews.edges.map(({ node }) => node)
  : [];


  
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() =>
        repository ? <RepositoryItem repository={repository} /> : null
      }
      
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};


export default SingleRepository;