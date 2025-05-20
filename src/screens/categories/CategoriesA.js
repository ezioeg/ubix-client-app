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

import firebase from '../../../firebase';
import PedidoContext from '../../../context/pedidos/pedidosContext';

// CategoriesA Styles
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
    borderRadius: 6,
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

// CategoriesA
const CategoriesA = ({ navigation }) => {
  const [categorias, setCategorias] = useState([]);

  const { negocio, seleccionarCategoria } = useContext(PedidoContext);

  useEffect(() => {
    const unsubscribe = firebase.db
      .collection('categorias')
      .doc(negocio.id)
      .collection('principales')
      .onSnapshot(manejarSnapshot);

    return () => {
      // Unmouting
      unsubscribe();
    };
  }, []);

  function manejarSnapshot(snapshot) {
    const categorias = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    // console.log('categorias principales: ',categorias);
    setCategorias(categorias);
  }

  const keyExtractor = (item, index) => index.toString();

  const generateColor = () => {
    const randomColor =
      'hsl(' +
      360 * Math.random() +
      ',' +
      (25 + 70 * Math.random()) +
      '%,' +
      (85 + 10 * Math.random()) +
      '%)';
    // const randomColor =
    //   'hsl(' +
    //   360 * Math.random() +
    //   ',' +
    //   (25 + 70 * Math.random()) +
    //   '%,' +
    //   (85 + 10 * Math.random()) +
    //   '%)';
    return `#${randomColor}`;
  };

  const renderCategoryItem = ({ item, index }) => (
    <ImageBackground
      key={index}
      // source={getImgSource(item.imageUri)}
      imageStyle={styles.cardImg}
      style={[styles.card, { backgroundColor: generateColor() }]}
    >
      <View style={styles.cardOverlay}>
        <TouchableItem
          onPress={() => {
            // Con los datos del item se llena el estado global restaurante
            seleccionarCategoria(item);
            navigation.navigate('Category');
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
          data={categorias.sort(function (a, b) {
            // Ordena por nombre
            return a.nombre.localeCompare(b.nombre);
          })}
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
export default CategoriesA;
