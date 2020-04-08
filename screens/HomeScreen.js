import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Card} from 'native-base';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      total: [],
      minigraph: [],
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: () => (
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
          Convid_19 India
        </Text>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Help');
          }}>
          <Image
            source={require('../src/info.png')}
            style={{height: 25, width: 25, marginRight: 30}}
            color="white"
          />
        </TouchableOpacity>
      ),
    };
  };

  getUserFromApi = async () => {
    try {
      const response = await fetch('https://api.covid19india.org/data.json');
      const responseJson = await response.json();

      this.setState({
        isLoading: false,
        dataSource: responseJson.statewise.splice(1),
        total: responseJson.statewise[0],
        minigraph: responseJson.cases_time_series.map(({totalconfirmed}) =>
          Number(totalconfirmed),
        ),
      });
    } catch (error) {
      return console.log(error);
    }
  };

  isDisplay = (key) => {
    if (key) {
      return (
        <Text style={{fontSize: 10, color: '#ff3333'}}>
          +{item.deltaconfirmed}{' '}
        </Text>
      );
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
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text style={{fontSize: 10, alignSelf: 'flex-end', marginRight: 5}}>
          Last Updated :{this.state.total.lastupdatedtime}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: '',
            padding: 10,
            borderColor: 'black',
            borderWidth: 1,
            marginHorizontal: 5,
            marginVertical: 5,
            borderRadius: 10,
          }}>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: '#ff3333', fontSize: 16}}>Confirmed</Text>
            <Text style={{color: '#ff3333', fontSize: 15}}>
              [+{this.state.total.deltaconfirmed}]
            </Text>
            <Text style={{color: '#cc0000', fontSize: 18}}>
              {this.state.total.confirmed}
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: '#6666ff', fontSize: 16}}>Active</Text>
            <Text style={{color: 'white', fontSize: 15}}>0</Text>
            <Text style={{color: '#0066cc', fontSize: 18}}>
              {this.state.total.active}
            </Text>
          </View>

          <View style={{alignItems: 'center'}}>
            <Text style={{color: '#00cc66', fontSize: 16}}>Recovered</Text>
            <Text style={{color: '#00cc66', fontSize: 15}}>
              [+{this.state.total.deltarecovered}]
            </Text>
            <Text style={{color: '#2eb82e', fontSize: 18}}>
              {this.state.total.recovered}
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: '#cccccc', fontSize: 16}}>Deaths</Text>
            <Text style={{color: '#cccccc', fontSize: 15}}>
              [+{this.state.total.deltadeaths}]
            </Text>
            <Text style={{color: '#737373', fontSize: 18}}>
              {this.state.total.deaths}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: 5,
            marginHorizontal: 5,
          }}>
          <Text style={{fontSize: 17}}>State</Text>
          <Text style={{fontSize: 17, marginLeft: 10}}>Confirmed</Text>
          <Text style={{fontSize: 17}}>Active</Text>
          <Text style={{fontSize: 17, marginLeft: -10, marginRight: 3}}>
            Deaths
          </Text>
        </View>

        <View style={{marginTop: 10, marginHorizontal: 3}}>
          <FlatList
            contentContainerStyle={{paddingBottom: 150}}
            data={this.state.dataSource}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Stats', {
                    info: item.state,
                  });
                }}>
                <Card style={styles.listItem}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View style={{flex: 1}}>
                      <Text
                        style={{
                          fontSize: 15,
                        }}>
                        {item.state}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        marginLeft: -40,
                        paddingRight: 4,
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      <Text style={{fontSize: 10, color: '#ff3333'}}>
                        {item.deltaconfirmed != 0 ? (
                          <Text>+{item.deltaconfirmed}</Text>
                        ) : (
                          <Text>{'      '}</Text>
                        )}
                        {'  '}
                      </Text>

                      <Text style={{fontSize: 15}}>
                        {item.confirmed != 0 ? (
                          <Text>{item.confirmed}</Text>
                        ) : (
                          <Text>-</Text>
                        )}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        marginRight: -20,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                        }}>
                        {item.active != 0 ? (
                          <Text>{item.active}</Text>
                        ) : (
                          <Text>-</Text>
                        )}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        marginLeft: -20,
                        flexDirection: 'row',
                        marginRight: -7,
                        justifyContent: 'center',
                      }}>
                      <Text style={{fontSize: 10, color: '#ff3333'}}>
                        {item.deltadeaths != 0 ? (
                          <Text>+{item.deltadeaths}</Text>
                        ) : (
                          <Text>{'      '}</Text>
                        )}
                        {'  '}
                      </Text>

                      <Text style={{fontSize: 15}}>
                        {item.deaths != 0 ? (
                          <Text>{item.deaths}</Text>
                        ) : (
                          <Text>-</Text>
                        )}
                      </Text>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => item.state}
            ListFooterComponent={() => (
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{fontSize: 9, alignSelf: 'center'}}>
                  Made by Vatsal Soni:
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(
                      'https://github.com/Vatsalsoni13/Convid_19-India-Tracker',
                    );
                  }}>
                  <Text style={{fontSize: 9}}>
                    https://github.com/Vatsalsoni13/Convid_19-India-Tracker
                  </Text>
                </TouchableOpacity>
              </View>
            )}
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
