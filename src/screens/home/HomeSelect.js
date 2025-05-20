/**
 * Ubix
 *
 * @format
 * @flow
 */

// import dependencies
import React, { useState, useContext, useEffect } from 'react';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import getImgSource from '../../utils/getImgSource.js';

// import components
import TouchableItem from '../../components/TouchableItem';

// import colors
import Colors from '../../theme/colors';

import PedidoContext from '../../../context/pedidos/pedidosContext';
import firebase from '../../../firebase';

// HomeSelect Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  cardImg: { borderRadius: 4 },
  card: {
    marginVertical: 6,
    height: 150,
    resizeMode: 'cover',
  },
  cardOverlay: {
    flex: 1,
    borderRadius: 4,
    backgroundColor: '#00000033',
    overflow: 'hidden',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 4,
  },
  cardTitle: {
    padding: 16,
    fontWeight: '700',
    fontSize: 18,
    color: Colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.88)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

// HomeSelect
const HomeSelect = ({ navigation }) => {
  const [negocios, setNegocios] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.db.collection('categorias').onSnapshot(manejarSnapshot);

    return () => {
      // Unmouting
      unsubscribe();
    };
  }, []);

  function manejarSnapshot(snapshot) {
    const negocios = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    // almacenar los negocios en el estado
    // console.log('negocios: ',negocios);
    setNegocios(negocios);
  }

  // Uso del contexto para seleccionar
  const { seleccionarNegocio } = useContext(PedidoContext);

  const keyExtractor = (item, index) => index.toString();

  const generateColor = () => {
    // const randomColor =
    //   'hsl(' +
    //   360 * Math.random() +
    //   ',' +
    //   (25 + 70 * Math.random()) +
    //   '%,' +
    //   (85 + 10 * Math.random()) +
    //   '%)';
    const randomColor =
      'hsl(' +
      360 * Math.random() +
      ',' +
      (25 + 70 * Math.random()) +
      '%,' +
      (85 + 10 * Math.random()) +
      '%)';
    return `#${randomColor}`;
  };

  const renderCategoryItem = ({ item, index }) => (
    <ImageBackground
      key={index}
      source={getImgSource(item.imagenUri)}
      imageStyle={styles.cardImg}
      style={[styles.card]}
    >
      <View style={styles.cardOverlay}>
        <TouchableItem
          onPress={() => {
            // Con los datos del item se llena el estado global restaurante
            seleccionarNegocio(item);
            navigation.navigate('HomeNavigator');
          }}
          style={styles.cardContainer}
          // borderless
        >
          <Text style={styles.cardTitle}>{item.nombre}</Text>
        </TouchableItem>
      </View>
    </ImageBackground>
  );

  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />

      <View style={styles.container}>
        <FlatList
          data={negocios}
          showsHorizontalScrollIndicator={false}
          alwaysBounceHorizontal={false}
          keyExtractor={keyExtractor}
          renderItem={renderCategoryItem}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </View>
    </SafeAreaView>
  );
};
export default HomeSelect;
