import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  Searchbar,
  Card,
  Avatar,
  Paragraph,
  Dialog,
  Portal,
} from "react-native-paper";
import HomeHeader from '../headers/HomeHeader';

export class Home extends Component {

  state = {
    loading: false,
    data: [],
    dataCopy: [],
    page: 1,
    seed: 1,
    error: null,
    refreshing: false,
    visible: false,
    itemBackup: null
  }

  componentDidMount() {
    this.requestUsers()
  }

  // Request User. Get info from randomuser.me
  requestUsers = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=50`;
    this.setState({ loading: true });

    fetch(url)
    .then((res) => res.json())
    .then((res) => {
      this.setState({
        data: page === 1 ? res.results : [...this.state.data, ...res.results],
        dataCopy: page === 1 ? res.results : [...this.state.data, ...res.results],
        error: res.error || null,
        loading: false,
        refreshing: false,
      });
    })
    .catch((error) => {
      this.setState({ error, loading: false });
    })
  }

  handleRefresh = () => {
    this.setState({
      page: 1,
      seed: this.state.seed + 1,
      refreshing: true,
    },
    () => {
      this.requestUsers();
      }
    );
  };

  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1,
    },
    () => {
      this.requestUsers();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  }

  searchUser = (value) => {
    this.setState({ refreshing: false });
    const filteredUsers = this.state.dataCopy.filter((user) => {
      let userLowerCase = (
        user.name.first +
        " " +
        user.name.last
      ).toLowerCase();

      let searchTermLowerCase = value.toLowerCase();

      return userLowerCase.indexOf(searchTermLowerCase) > -1;
    });
    this.setState({ data: filteredUsers });
  };

  hideDialog = () => this.setState({ visible: false });

  showDialog = (item) => {
    this.setState({ visible: true, itemBackup: item });
  }

  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.showDialog(item)}
    >
      <Card.Title
        title= {item.name.first + ' ' + item.name.last}
        subtitle={item.login.username}
        left={(props) => <Avatar.Image size={50} source={{uri: item.picture.thumbnail}} />}
      />

    </TouchableOpacity>
  );

  render() {

    const { navigation } = this.props;
    const { itemBackup, visible} = this.state;

    return (
      <View style={{ flex: 1}}>
        <HomeHeader navigation={navigation} />
        <SafeAreaView />
        <Searchbar
          placeholder="Search"
          onChangeText={(value) => this.searchUser(value)}
        />

        <Portal>
          <Dialog
            visible={visible}
            onDismiss={this.hideDialog}
          >
          <Dialog.Content>
            <Paragraph>{itemBackup !== null ? itemBackup.name.first + ' ' + itemBackup.name.last : null}</Paragraph>
          </Dialog.Content>
          </Dialog>
        </Portal>

        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.login.uuid}
          ItemSeparatorComponent={this.renderSeparator}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={() => this.handleLoadMore}
          onEndReachedThreshold={50}
          ListEmptyComponent={() => (
            <View>
              <Text>No Contacts Found</Text>
            </View>
          )}
        />

      </View>
    );
  }
}

export default Home;
