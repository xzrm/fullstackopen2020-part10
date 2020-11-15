import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from './Text';
import RepositoryItemFooter from './RepositoryItemFooter';
import RepositoryItemHeader from './RepositoryItemHeader';
import {
  useHistory,
  useLocation
} from "react-router-dom";
import theme from '../theme';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,

  }
});



const RepositoryItem = ({ repository}) => {

  let history = useHistory();
  let location = useLocation();

  const {
    id,
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
    url,
  } = repository;



  const displayButton = location.pathname === `/${id}` ? true : false;


  const onPressUpdateHistory = () => {
    history.push(`/${id}`);
  };

  const onPressGotoLink = () => {
    Linking.openURL(url);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={onPressUpdateHistory}
      >
        <View style={styles.container}>
          <RepositoryItemHeader
            fullName={fullName}
            description={description}
            ownerAvatarUrl={ownerAvatarUrl}
            language={language}
          />
          <RepositoryItemFooter
            forksCount={forksCount}
            stargazersCount={stargazersCount}
            reviewCount={reviewCount}
            ratingAverage={ratingAverage}
          />

          <TouchableOpacity
            style={displayButton ? styles.button : { display: 'none' }}
            onPress={onPressGotoLink}>
            <Text
              color='textPrimaryContrast'
              fontWeight="bold"> Open in GitHub </Text>
          </TouchableOpacity>
        </View>

      </TouchableOpacity>

    </View>
  );
};




export default RepositoryItem;