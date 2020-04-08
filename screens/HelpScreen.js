import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  Alert,
  Linking,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Card} from 'native-base';
const obj = {
  'Andhra Pradesh': '0866 - 2410978',
  Assam: '6913347770',
  'Arunachal Pradesh': '9436055743',
  Bihar: '104',
  Chhattisgarh: '104',
  Goa: '104',
  Gujarat: '104',
  Haryana: '8558893911',
  'Himachal Pradesh': '104',
  Jharkhand: '104',
  Karnataka: '104',
  Kerala: '04712552056',
  'Madhya Pradesh': '104',
  Maharashtra: '020 - 26127394',
  Manipur: '3852411668',
  Meghalaya: '108',
  Mizoram: '102',
  Nagaland: '7005539653',
  Odisha: '9439994859',
  Punjab: '104',
  Rajasthan: '0141 - 2225624',
  Sikkim: '104',
  'Tamil Nadu': '044 - 29510500',
  Telangana: '104',
  Tripura: '0381-2315879',
  Uttarakhand: '104',
  'Uttar Pradesh': '18001805145',
  'West Bengal': '1800313444222',
};
export default class HelpScreen extends React.Component {
  static navigationOptions = {
    title: 'Helpline',
  };
  callAction = (phone) => {
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telpromt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Phone Number is not Available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 10,
          }}>
          <Image
            source={require('../src/phone.png')}
            style={{height: 20, width: 20}}
          />
          <Text style={{fontSize: 15}}> {'  '}Tap to call</Text>
        </View>
        <FlatList
          data={Object.keys(obj)}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                this.callAction(obj[item]);
              }}>
              <Card style={styles.listItem}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginHorizontal: 10,
                  }}>
                  <Text style={{fontSize: 20, color: 'red'}}>{item}</Text>
                  <Text style={{fontSize: 20}}>{obj[item]}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
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

  listItem: {
    padding: 20,
    borderRadius: 10,
  },
});
