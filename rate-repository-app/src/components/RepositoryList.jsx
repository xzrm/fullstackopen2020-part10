import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import RNPickerSelect from 'react-native-picker-select';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});




const ItemSeparator = () => <View style={styles.separator} />;


const RepositoryListHeader = ({
  orderSetter,
  searchQuerySetter,
  searchQuery }) => {

  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={(query) => searchQuerySetter(query)}
        value={searchQuery}
      />
      <RNPickerSelect
        onValueChange={(value) => orderSetter(value)}
        items={[
          {
            label: 'Latest repositories',
            value: 'latest'
          },
          {
            label: 'Highest rated repositories',
            value: 'highest rated'
          },
          {
            label: 'Lowest rated repositories',
            value: 'lowest rated'
          },
        ]}
      />
    </View>
  );
};




export class RepositoryListContainer extends React.Component {


  renderItem = ({ item }) => (
    <RepositoryItem repository={item} />
  );



  renderHeader = () => {
    const props = this.props;
    return (
      <RepositoryListHeader
        orderSetter={props.orderSetter}
        searchQuerySetter={props.searchQuerySetter}
        searchQuery={props.searchQuery}
      />
    );
  };

  render() {
    const repositoryNodes = this.props.repositories
      ? this.props.repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        keyExtractor={({ id }) => id}
        renderItem={this.renderItem}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [value] = useDebounce(searchQuery, 1000);

  var sortingArgs;

  switch (orderBy) {
    case 'latest':
      sortingArgs = {
        orderBy: "CREATED_AT",
        orderDirection: "DESC"
      };
      break;
    case 'highest rated':
      sortingArgs = {
        orderBy: "RATING_AVERAGE",
        orderDirection: "ASC"
      };
      break;
    case 'lowest rated':
      sortingArgs = {
        orderBy: "RATING_AVERAGE",
        orderDirection: "DESC"
      };
      break;
    default:
      sortingArgs = {
        orderBy: "CREATED_AT",
        orderDirection: "DESC"
      };
  }

  sortingArgs.searchKeyword = value;
  sortingArgs.first = 8;

  const { repositories, fetchMore } = useRepositories(sortingArgs);

  const onEndReach = () => {
    fetchMore();
    console.log("fetching more repositories");
  };

  return <RepositoryListContainer
    repositories={repositories}
    orderSetter={setOrderBy}
    searchQuerySetter={setSearchQuery}
    searchQuery={searchQuery}
    onEndReach={onEndReach}
    />;
};

export default RepositoryList;