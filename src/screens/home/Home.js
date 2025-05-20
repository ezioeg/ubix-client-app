/**
 * Ubix
 *
 * @format
 * @flow
 */

// Dependencies
import React, { Component, useState, useContext, useEffect, Fragment, useCallback } from 'react';
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  VirtualizedList,
} from 'react-native';

// Utils
import getImgSource from '../../utils/getImgSource.js';

// Components
import WideProductCard from '../../components/cards/WideProductCard';
import RestaurantCard from '../../components/cards/RestaurantCard';
import LinkButton from '../../components/buttons/LinkButton';
import { Heading6 } from '../../components/text/CustomText';
import TouchableItem from '../../components/TouchableItem';
import SafeAreaView from '../../components/SafeAreaView';

// Colors
import Colors from '../../theme/colors';

// Navigation Hook
import { useNavigation, useFocusEffect } from '@react-navigation/native';

// Contexts
import FirebaseContext from '../../../context/firebase/firebaseContext';
import PedidoContext from '../../../context/pedidos/pedidosContext';
import firebase from '../../../firebase';

// Config
const imgHolder = require('../../assets/img/imgholder.png');

// Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    paddingTop: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    flex: 1,
    // paddingTop: 20,
    // paddingBottom: 15,
  },
  logo: {
    width: 350,
    height: 350,
  },
  titleText: {
    fontWeight: '600',
  },
  cityText: {
    color: Colors.primaryColor,
  },
  productsList: {
    // spacing = paddingHorizontal + WideProductCard marginHorizontal = 10 + 6 = 16
    paddingHorizontal: 10,
    // spacing = paddingHorizontal + WideProductCard marginVertical = 12 + 4 = 16
    paddingBottom: 12,
  },
  viewAllText: {
    color: Colors.primaryColor,
  },
  categoriesList: {
    paddingTop: 4,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 8,
  },
  cardImg: {
    borderRadius: 46,
  },
  card: {
    marginLeft: 8,
    width: 92,
    height: 92,
    resizeMode: 'cover',
  },
  cardOverlay: {
    flex: 1,
    borderRadius: 44,
    backgroundColor: '#00000033',
    overflow: 'hidden',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontWeight: '700',
    fontSize: 13,
    color: Colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 2.5,
    textAlign: 'center',
  },
  restauratnsList: {
    // spacing = paddingHorizontal + RestaurantCard margin = 12 + 4 = 16
    paddingHorizontal: 12,
    paddingBottom: 12,
    flex: 1,
    backgroundColor: Colors.background, //rgba(255,255,255,0.7)
  },
});

const Home = () => {
  // Nombre e imagenes de las categorias
  const [categorias, setCategorias] = useState([]);
  // Uso del contexto de firebase
  // const { restaurantes, obtenerRestaurantes } = useContext(FirebaseContext);
  const [rerender, setReRender] = useState(false);
  const [restaurantes, setRestaurantes] = useState([]);

  // Uso del contexto para seleccionar
  const {
    negocio,
    productos,
    listarProductos,
    limpiarListaProductos,
    seleccionarCategoria,
    seleccionarRestaurante,
    seleccionarPlato,
    agregarProductoFavorito,
  } = useContext(PedidoContext);

  // Workround mejorado
  useEffect(() => {
    const unsubscribe = firebase.db
      .collection('restaurantes')
      .where('negocioTipo', '==', negocio.nombre)
      .onSnapshot((snapshot) => {
        limpiarListaProductos();
        // const listeners = [];
        snapshot.docs.map((doc) => {
          //  const listener =
          firebase.db
            .collection('restaurantes')
            .doc(doc.id)
            .collection('productos')
            .limit(4)
            .onSnapshot((snapshot) => {
              snapshot.docs.map((doc) => {
                const platos = { id: doc.id, ...doc.data() };
                listarProductos(platos);
                // console.log(platos);
              });
            });

          // listeners.push(listener);

          // console.log(listeners);
        });
      });

    // Probando
    const unsubscribe2 = firebase.db
      .collection('restaurantes')
      .where('negocioTipo', '==', negocio.nombre)
      .onSnapshot(manejarSnapshot);

    function manejarSnapshot(snapshot) {
      let restaurantes = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      setRestaurantes(restaurantes);
    }

    // obtenerRestaurantes(negocio.nombre);

    return () => {
      limpiarListaProductos();
      unsubscribe();
      unsubscribe2();
    };
  }, []);

  useEffect(() => {
    const unsubscribe3 = firebase.db
      .collection('categorias')
      .doc(negocio.id)
      .collection('principales')
      .onSnapshot(manejarSnapshot2);

    return () => {
      // Unmouting
      unsubscribe3();
    };
  }, []);

  function manejarSnapshot2(snapshot) {
    const categorias = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    // console.log('categorias secundarias: ',categorias);
    setCategorias(categorias);
  }

  // Hook para redireccionar
  const navigation = useNavigation();

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
      defaultSource={imgHolder}
      // source={getImgSource(item.imageUri)}
      imageStyle={[styles.cardImg, { backgroundColor: generateColor() }]}
      style={[styles.card]}
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

  const renderRestaurantItem = ({ item, index }) => (
    <RestaurantCard
      onPress={() => {
        // Con los datos del item se llena el estado global restaurante
        seleccionarRestaurante(item);
        navigation.navigate('Restaurant');
      }}
      key={index}
      imageUri={item.imagen}
      name={item.nombre}
      cuisines={item.descripcion}
      open={item.abierto}
      // rating={item.rating}
    />
  );

  const renderProductItem = ({ item, index }) => (
    <WideProductCard
      onPress={() => {
        // Con los datos del item se llena el estado global plato
        seleccionarPlato(item);
        navigation.navigate('Product');
      }}
      key={index}
      imageUri={item.imagen}
      title={item.nombre}
      price={item.precio}
      discountPercentage={item.descuentoPorcentaje}
      stock={item.existencia}
      // rating={item.rating}
      // label={item.label}
      // favorite={item.favorito}
      // onPressFavorite={}
    />
  );

  // const onPressFavorite = (item) => () => {
  //   setFavorito(!item.favorito);
  // };

  const removeDuplicates = (originalArray, prop) => {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }

    return newArray;
  };

  function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar backgroundColor="#D8D8D8" barStyle="dark-content" />

      <View style={styles.container}>
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image style={styles.logo} source={require('../../assets/img/logo.png')} />
          </View>

          <View style={styles.titleContainer}>
            <Heading6 style={styles.titleText}>Productos</Heading6>
          </View>

          <FlatList
            data={removeDuplicates(productos, 'id')}
            horizontal
            showsHorizontalScrollIndicator={false}
            alwaysBounceHorizontal={false}
            keyExtractor={keyExtractor}
            // initialNumToRender={10} // probando
            renderItem={renderProductItem}
            contentContainerStyle={styles.productsList}
          />

          <View style={styles.titleContainer}>
            <Heading6 style={styles.titleText}>Categorías</Heading6>
            <LinkButton
              title="Ver todos"
              titleStyle={styles.viewAllText}
              onPress={() => navigation.navigate('Categories')}
            />
          </View>

          <FlatList
            data={categorias.sort(function (a, b) {
              // Ordena por nombre
              return a.nombre.localeCompare(b.nombre);
            })}
            horizontal
            showsHorizontalScrollIndicator={false}
            alwaysBounceHorizontal={false}
            keyExtractor={keyExtractor}
            initialNumToRender={5} // probando
            renderItem={renderCategoryItem}
            contentContainerStyle={styles.categoriesList}
          />

          <View style={styles.titleContainer}>
            <Heading6 style={styles.titleText}>{capitalize(negocio.nombre)}</Heading6>
            {/* <LinkButton title="Ver todos" titleStyle={styles.viewAllText} onPress={() => {}} /> */}
          </View>

          <FlatList
            data={restaurantes}
            keyExtractor={keyExtractor}
            initialNumToRender={5} // probando
            renderItem={renderRestaurantItem}
            contentContainerStyle={styles.restauratnsList}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default Home;
