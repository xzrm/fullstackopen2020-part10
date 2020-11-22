import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import Text from './Text';
import theme from '../theme';
import { format } from 'date-fns';
import {
  useHistory,
  useLocation
} from "react-router-dom";
import { useCreateReview } from '../hooks/useDeleteReview';


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    marginTop: 10,
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
    borderRadius: 45 / 2,
    justifyContent: 'center',
    alignItems: 'center',

  },
  createdAtText: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  textContainer: {
    flexGrow: 1,
  },
  nameText: {
    marginBottom: 5,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20
  },
  buttonDelete: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: theme.colors.textError,
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20
  }
});


const ReviewItem = ({ review, refetch }) => {
  let history = useHistory();
  let location = useLocation();

  const [deleteReview] = useCreateReview();

  const {
    id,
    text,
    rating,
    createdAt,
    user,
    repository
  } = review;

  const displayButton = location.pathname === `/myreviews` ? true : false;

  const createAlert = () =>
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => onPressDeleteItem() }
      ],
      { cancelable: false }
    );

  const onPressUpdateHistory = () => {
    history.push(`/${repository.id}`);
  };


  const onPressDeleteItem = async () => {
    await deleteReview(id);
    refetch();
  };


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
            {user ? user.username : repository.ownerName + "/" + repository.name}
          </Text>
          <Text style={styles.createdAtText} color="textSecondary">
            {format(Date.parse(createdAt), 'MM.dd.yyyy')}
          </Text>
          <View style={styles.textContainer}>
            <Text>{text}</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={displayButton ? styles.button : { display: 'none' }}
          onPress={onPressUpdateHistory}>
          <Text
            color='textPrimaryContrast'
            fontWeight="bold"> View repository </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={displayButton ? styles.buttonDelete : { display: 'none' }}
          onPress={createAlert}>
          <Text
            color='textPrimaryContrast'
            fontWeight="bold"> Delete review</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReviewItem;