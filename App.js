import React, { useEffect, useState } from 'react';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


var historyList = [];
var index = 0;

const HomeScreen = ({ navigation}) => {
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountedPrice, setDiscountPrice] = useState(0);
  const [youSave, setYouSave] = useState(0);
  const [saveButton, setSaveButton] = useState(true);
  const [clear, setClear] = useState(false);

  const calculateDiscount = () => {
    var saved = price * ((discount * 10 ) / 100);
    setYouSave(saved);
    setDiscountPrice(price - saved);

    setSaveButton(false);
  };

  const addToHistory = () => {
    if (price > 0) {
      var data = {
        key: index,
        dataOriginalPrice: price,
        dataDiscount: discount,
        dataDiscountedPrice: discountedPrice,
        dataUsave: youSave,
      };

      index = index + 1;

      historyList.push(data);
      console.log(historyList);
      setPrice(0);
      setDiscount(0);
      setDiscountPrice(0);
      setYouSave(0);
      setSaveButton(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.homeHeader}>Discount App</Text>

      <TextInput
        style={styles.input}
        keyboardType="decimal-pad"
        placeholder="Enter Price: "
         value = {price}
        onChangeText={(newPrice) => {
          if (newPrice > -1 && newPrice != ' ') {
            setPrice(newPrice);
          }
        }}
      />

      <TextInput
        style={styles.input}
        keyboardType="decimal-pad"
        placeholder="Enter Discount Percentage: "
        value = {discount}
        onChangeText={(newDiscount) => {
          {
            if (newDiscount > -1 && newDiscount != ' ') {
              setDiscount(newDiscount);
            }
          }
          calculateDiscount();
        }}
      />

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.homeFields}>You Save: </Text>
        <Text style={styles.homeFields}>{youSave}</Text>
      </View>

      <View style={{ flexDirection: 'row', marginBottom: 50 }}>
        <Text style={styles.homeFields}>Final Price: </Text>
        <Text style={styles.homeFields}>{discountedPrice}</Text>
      </View>

      <TouchableOpacity
        disabled={saveButton}
        style={

          saveButton == true ? styles.disabledHomeButton : styles.homeButton
        }
        onPress={addToHistory}>
        <Text style={styles.homeButtonText}>Save Calculation</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('history')}>
        <Text style={styles.homeButtonText}>View History</Text>
      </TouchableOpacity>
    </View>
  );
};

const history = ({ navigation }) => {
  const [dataList, setDataList] = useState(historyList);

    navigation.setOptions({
      headerRight: () => (
        <Button
          title="CLEAR"
          color="red"
          onPress={clearHistory}
        />
      ),
    });

    const clearHistory = () => {
      const emptyArr = [];
      setDataList(emptyArr);

      console.log(dataList);

      historyList = [];
      console.log(dataList);
    }

    const removeItem = (element) => {
    var newlist = historyList.filter((listitem) => listitem.key != element.key);
    historyList = newlist;
    setDataList(newlist);
    }

  return (
    <View style={styles.list}>
      <FlatList
        data={dataList}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>
              Discounted Price: {item.dataDiscountedPrice}
            </Text>
            <Text style={styles.subitemText}>
              Original Price: {item.dataOriginalPrice}
            </Text>
            <Text style={styles.subitemText}>
              Discount: {item.dataDiscount}%
            </Text>
            <Text style={styles.subitemText}>
              Amount Saved: {item.dataUsave}
            </Text>
            <View style = {{height: 10, width: 40, marginLeft: 280, marginBottom: 20}}>
            <Button title = "x"  color = "gray"  onPress={() => removeItem(item)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#F5B7B1',
            justifyContent: 'center',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          options={{ headerShown: false }}
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen name="history"  component={history} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#D5F5E3',
  },

  homeHeader: {
    color: '#F5B7B1',
    fontWeight: 'bold',
    fontSize: 43,
    marginTop: 100,
    marginBottom: 50,
  },
  homeFields: {
    color: '#F5B7B1',
    fontWeight: 'bold',
    fontSize: 30,
  },
  input: {
    backgroundColor: 'white',
    height: 60,
    width: '80%',
    marginBottom: 20,
    color:'#F5B7B1',
    fontWeight: "bold",
    fontSize: 20

  },
  homeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5B7B1',
    height: 80,
    width: '75%',
    marginBottom: 20,
  },
  disabledHomeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fadad7',
    height: 80,
    width: '75%',
    marginBottom: 20,
  },
  homeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  item: {
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 150,
    width: '100%',
    marginBottom: 20,
  },
  itemText: {
    color: '#F5B7B1',
    fontSize: 20,
    marginLeft: 10,
  },
  subitemText:{
    fontSize: 15,
    marginLeft: 10,
  },
  list: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: '#D5F5E3',
  },


});