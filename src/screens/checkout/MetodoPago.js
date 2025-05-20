/**
 * Ubix
 *
 * @format
 * @flow
 */

import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import { Caption } from '../../components/text/CustomText';
import Button from '../../components/buttons/Button';
import LinkButton from '../../components/buttons/LinkButton';
import Colors from '../../theme/colors';
// import Color from 'color';

import firebase from '../../../firebase';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContainer: {
    alignItems: 'center',
  },
  /******** card **************/
  card: {
    shadowColor: '#00000021',
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    backgroundColor: 'white',
    flexBasis: '42%',
    marginBottom: 10,
    paddingHorizontal: '6%',
    paddingVertical: 15,
  },
  cardImage: {
    height: '20%',
    width: '20%',
    alignSelf: 'center',
    paddingHorizontal: 150,
    paddingVertical: 85,
  },
  stepIndicator: {
    backgroundColor: Colors.background,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    elevation: 1,
    ...Platform.select({
      ios: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#a7a7aa',
      },
    }),
  },
  stepContainer: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: {
    fontWeight: '700',
    color: '#000000aa',
  },
  activeStepText: {
    color: '#FE5000',
  },
  line: {
    width: 48,
    height: 2,
    backgroundColor: '#000000aa',
  },
  buttonContainer: {
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: Colors.whiteSmoke,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  linkButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
  },
  linkButton: {
    color: Colors.black,
  },
});

const MetodoPago = () => {
  const [data, setData] = useState([
    // {
    //   id: 1,
    //   title: 'Banesco',
    //   image: require('../../assets/img/banesco.jpg'),
    //   button: () => navigation.navigate('Banesco'),
    // },
    {
      id: 2,
      title: 'Zelle',
      image: require('../../assets/img/zelle.png'),
      button: () => navigation.navigate('Zelle'),
    },
    {
      id: 3,
      title: 'Plaza',
      image: require('../../assets/img/plaza.jpg'),
      button: () => navigation.navigate('Plaza'),
    },
    {
      id: 4,
      title: 'Pago Movil',
      image: require('../../assets/img/pagomovil.jpg'),
      button: () => navigation.navigate('PagoMovilPlaza'),
    },
    {
      id: 5,
      title: 'Efectivo',
      image: require('../../assets/img/efectivo.jpg'),
      button: () => navigation.navigate('Efectivo'),
    },
  ]);

  // Hook para redireccionar
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const keyExtractor = (item, index) => index.toString();

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar backgroundColor="white" barStyle="dark-content" /> */}
      <View style={styles.stepIndicator}>
        <View style={styles.stepContainer}>
          <Caption style={styles.stepText}>Dirección</Caption>
          <Caption style={styles.stepText}>de entrega</Caption>
        </View>
        <View style={styles.line} />

        <View style={styles.stepContainer}>
          <Caption style={[styles.stepText, styles.activeStepText]}>Método</Caption>
          <Caption style={[styles.stepText, styles.activeStepText]}>de pago</Caption>
        </View>

        <View style={styles.line} />

        <View style={styles.stepContainer}>
          <Caption style={styles.stepText}>Realizar</Caption>
          <Caption style={styles.stepText}>pedido</Caption>
        </View>
      </View>
      <View style={{ marginTop: 10 }}></View>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={data}
        horizontal={false}
        numColumns={1}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.card} onPress={item.button}>
              <Image style={styles.cardImage} source={item.image} />
            </TouchableOpacity>
          );
        }}
      />

      <View style={styles.buttonContainer}>
        <Button onPress={() => goBack()} title="Regresar" />
      </View>
    </SafeAreaView>
  );
};

export default MetodoPago;
