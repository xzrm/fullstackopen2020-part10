import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    padding: 5,
  },
  avatar: {
    width: 45,
    height: 45,
    margin: 10,
  },
  avatarContainer: {
    flexGrow: 0,
  },
  infoContainer: {
    flexGrow: 1,
    flexShrink:1,
  },
  languageContainer: {
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    padding: 5,
    marginTop:5,
    marginBottom: 5,
    borderRadius: 5,
  }
});

const RepositoryItemHeader = (props) => {

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar}
          source={{ uri: props.ownerAvatarUrl, }} />
      </View>
      <View style={styles.infoContainer}>
        <Text fontWeight="bold" fontSize="subheading">{props.fullName}</Text>
        <Text color="textSecondary">{props.description}</Text>
        <View style={styles.languageContainer}>
          <Text color='textPrimaryContrast'>{props.language}</Text>
        </View>
      </View>
    </View>
  );

};

export default RepositoryItemHeader;