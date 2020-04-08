import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
export default class InfoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      graph: [],
    };
  }

  getUserFromApi = async () => {
    try {
      const response = await fetch('https://api.covid19india.org/data.json');
      const responseJson = await response.json();

      this.setState({
        isLoading: false,
        graph: responseJson.cases_time_series.map(({totalconfirmed}) =>
          Number(totalconfirmed),
        ),
        graph1: responseJson.cases_time_series.map(({totaldeceased}) =>
          Number(totaldeceased),
        ),
        graph2: responseJson.cases_time_series.map(({totalrecovered}) =>
          Number(totalrecovered),
        ),
      });
    } catch (error) {
      return console.log(error);
    }
  };

  componentDidMount() {
    this.getUserFromApi();
  }

  render() {
    const screenWidth = Dimensions.get('screen').width;

    if (this.state.isLoading) {
      return (
        <View style={styles.progress}>
          <ActivityIndicator size="large" color="black" />
        </View>
      );
    }
    return (
      <ScrollView
        style={{
          flex: 1,
          height: 250,
          //marginHorizontal: 10,
        }}>
        <View style={{justifyContent: 'center', marginRight: 5}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              fontFamily: 'sans-serif-condensed',
              alignSelf: 'center',
            }}>
            Total Confirmed{console.log(screenWidth)}
          </Text>
          <LineChart
            data={{
              datasets: [{data: this.state.graph}],
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
              strokeWidth: 2,
            }}
            width={screenWidth - 10}
            height={220}
            yAxisInterval={10}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              color: () => `rgb(255, 255, 255)`,
              labelColor: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
            }}
            withDots={false}
            bezier={true}
            style={{
              marginVertical: 8,
              borderRadius: 16,
              alignSelf: 'center',
            }}
          />
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              fontFamily: 'sans-serif-condensed',
              alignSelf: 'center',
            }}>
            Total Deaths
          </Text>
          <LineChart
            data={{
              datasets: [{data: this.state.graph1}],
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
              strokeWidth: 2,
            }}
            width={screenWidth - 10}
            height={220}
            yAxisInterval={10}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#dae3e3',
              backgroundGradientTo: '#646666',
              color: () => `rgb(255, 255, 255)`,
              labelColor: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
            }}
            withDots={false}
            bezier={true}
            style={{
              marginVertical: 8,
              borderRadius: 16,
              alignSelf: 'center',
            }}
          />
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              fontFamily: 'sans-serif-condensed',
              alignSelf: 'center',
            }}>
            Total Recovered
          </Text>
          <LineChart
            data={{
              datasets: [{data: this.state.graph2}],
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
              strokeWidth: 2,
            }}
            width={screenWidth - 10}
            height={220}
            yAxisInterval={10}
            chartConfig={{
              backgroundColor: '#32e80e',
              backgroundGradientFrom: '#32e80e',
              backgroundGradientTo: '#dae3e3',
              color: () => `rgb(255, 255, 255)`,
              labelColor: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
            }}
            withDots={false}
            bezier={true}
            style={{
              marginVertical: 8,
              borderRadius: 16,
              alignSelf: 'center',
            }}
          />
        </View>
      </ScrollView>
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
  },
});
