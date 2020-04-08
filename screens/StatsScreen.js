import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Card} from 'native-base';

export default class StatsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      info: '',
      dataSource: [],
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('info', ''),
    };
  };

  getUserFromApi = async () => {
    const abc = this.props.navigation.getParam('info', '');

    try {
      const response = await fetch(
        'https://api.covid19india.org/state_district_wise.json',
      );
      const responseJson = await response.json();

      this.setState({
        isLoading: false,
        info: abc,
        dataSource: responseJson[abc].districtData,
      });
    } catch (error) {
      return console.log(error);
    }
  };

  componentDidMount() {
    this.getUserFromApi();
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.progress}>
          <ActivityIndicator size="large" color="black" />
        </View>
      );
    }
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginHorizontal: 10,
            marginTop: 15,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, marginRight: 100}}>District</Text>
          <Text style={{fontSize: 20}}>Confirmed</Text>
        </View>
        <View style={{marginTop: 10, marginHorizontal: 3}}>
          <FlatList
            contentContainerStyle={{paddingBottom: 80}}
            data={Object.keys(this.state.dataSource)}
            renderItem={({item}) => (
              <Card style={styles.listItem}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <View style={{flex: 1, marginLeft: 10}}>
                    <Text style={{fontSize: 15}}>{item}</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      marginRight: -20,
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontSize: 10, color: '#ff3333'}}>
                      {this.state.dataSource[item].delta.confirmed != 0 ? (
                        <Text>
                          +{this.state.dataSource[item].delta.confirmed}
                        </Text>
                      ) : (
                        <Text>{}</Text>
                      )}
                    </Text>
                    <Text style={{fontSize: 15}}>
                      {this.state.dataSource[item].confirmed}
                    </Text>
                  </View>
                </View>
              </Card>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  progress: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    padding: 20,
    borderRadius: 10,
  },
});
