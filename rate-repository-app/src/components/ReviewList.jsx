import React from 'react';
import { FlatList, View } from 'react-native';
import ReviewItem from './ReviewItem';
import useUserReviews from '../hooks/useUserReviews';

const ReviewListContainer = ({ reviews, refetch }) => {

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
      keyExtractor={({ id }) => id}
    />
  );
};


const ReviewList = () => {

  const {data, refetch} = useUserReviews({"includeReviews": true});

  const reviewsNodes = data
  ? data.authorizedUser.reviews.edges
  .map(edge => edge.node)
  : [];

  return (
    <View>
      <ReviewListContainer reviews={reviewsNodes} refetch={refetch}/>
    </View>
  );
};

export default ReviewList;