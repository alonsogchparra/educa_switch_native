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

  render() {

    const { navigation } = this.props;

    return (
      <View style={{ flex: 1}}>
        <HomeHeader navigation={navigation} />
      </View>
    );
  }
}

export default Home;
