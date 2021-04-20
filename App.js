import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountedPrice, setDiscountPrice] = useState(0);
  const [youSave, setYouSave] = useState(0);

  const [viewModal, setViewModal] = useState(false);
  const [modalText, setModalText] = useState('hello');

  const calculateDiscount = () => {
    var saved = price * (discount / 100);
    setYouSave(saved);
    setDiscountPrice(price - saved);

    setViewModal(true);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Enter Price: "
        onChangeText={(newPrice) => setPrice(newPrice)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Discount Percentage: "
        onChangeText={(newDiscount) => setDiscount(newDiscount)}
      />
      <View
        style={{
          width: 80,
          marginLeft: 12,
        }}>
        <Button title="Enter" color="blue" onPress= {calculateDiscount}/>
      </View>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={viewModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setViewModal(!viewModal);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Price After Discount: {discountedPrice}
              </Text>
              <Text style={styles.modalText}>
                You Save: {youSave}
              </Text>
              <Pressable style={[styles.buttonModal, styles.buttonClose]}>
                <Text style={styles.textStyle}>newGame</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  buttonModal: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
