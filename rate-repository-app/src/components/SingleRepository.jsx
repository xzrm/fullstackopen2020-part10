import React from 'react';
import { View, FlatList , StyleSheet} from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORY } from '../graphql/queries';
import Text from './Text';
import theme from '../theme';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    marginTop:10,
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  ratingContainer: {
    display: 'flex',
    flexGrow: 0,
    marginRight: 20,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    width: 45,
    height: 45,
    borderRadius: 45/2,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  createdAtText: {
    flexGrow: 1,
    paddingBottom:10,
  },
  textContainer: {
    flexGrow: 1,
  },
  nameText: {
    marginBottom: 5,
  },
});


const ReviewItem = ({ review }) => {

  const {
    text,
    rating,
    createdAt,
    user,
  } = review;

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.ratingContainer}>
          <Text 
          color="primary"
          fontWeight="bold"
          fontSize="subheading"
          >{rating}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text
            style={styles.nameText}
            fontWeight="bold"
            fontSize="subheading"
            numberOfLines={1}
          >
            {user.username}
          </Text>
          <Text style={styles.createdAtText} color="textSecondary">
            {format(Date.parse(createdAt), 'MM.dd.yyyy')}
          </Text>
          <View style={styles.textContainer}>
            <Text>{text}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};




const SingleRepository = () => {
  let { repositoryId } = useParams();

  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id: repositoryId },
  });

  if (loading) return <View></View>;
  if (error) return `Error! ${error}`;

  const repository = data.repository;
  const reviews = repository.reviews.edges.map((edge) => edge.node);
  console.log(reviews);
  console.log(data.repository);

  return (
    <FlatList
      data={reviews}
      
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem repository={repository} />}
    // ...
    />
  );
};


export default SingleRepository;