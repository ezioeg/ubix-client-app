/**
 * Ubix
 *
 * @format
 * @flow
 */

// Dependencies
import React, { useState, useContext, useEffect, useCallback } from 'react';
import {
  FlatList,
  I18nManager,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';

// Components
import Divider from '../../components/divider/Divider';
import { Heading6 } from '../../components/text/CustomText';
import TouchableItem from '../../components/TouchableItem';
import SafeAreaView from '../../components/SafeAreaView';
import SimpleProductCard from '../../components/cards/SimpleProductCard';

// Colors
import Colors from '../../theme/colors';

import { useFocusEffect } from '@react-navigation/native';

import firebase from '../../../firebase';
import PedidoContext from '../../../context/pedidos/pedidosContext';

// Config
const isRTL = I18nManager.isRTL;
const FILTER_ICON = 'filter-variant';
const SEARCH_ICON = 'magnify';

// Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  titleContainer: {
    paddingHorizontal: 16,
  },
  titleText: {
    // paddingTop: 25,
    paddingBottom: 15,
    fontWeight: '700',
    textAlign: 'left',
  },
  inputContainer: {
    marginHorizontal: 16,
    paddingBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    paddingLeft: 8,
    paddingRight: 51,
    height: 46,
    fontSize: 16,
    textAlignVertical: 'center',
    textAlign: isRTL ? 'right' : 'left',
  },
  searchButtonContainer: {
    position: 'absolute',
    top: 4,
    right: 4,
    borderRadius: 4,
    backgroundColor: Colors.primaryColor,
    overflow: 'hidden',
  },
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 38,
    height: 38,
  },
  filtersList: {
    paddingVertical: 8,
    marginLeft: 15,
    paddingRight: isRTL ? 0 : 16,
    paddingLeft: isRTL ? 16 : 0,
  },
  filterItemContainer: {
    marginRight: isRTL ? 16 : 0,
    marginLeft: isRTL ? 0 : 16,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(35, 47, 52, 0.08)',
    overflow: 'hidden',
  },
  filterItem: { flex: 1, justifyContent: 'center' },
  filterName: {
    top: -1,
    fontWeight: '700',
    color: 'rgb(35, 47, 52)',
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    paddingTop: 230,
  },
});

// Search
const Search = ({ navigation }) => {
  // const [filtrados, setFiltrados] = useState([]);
  const [buscar, setBuscar] = useState('');

  // Uso del contexto para seleccion
  const {
    negocio,
    seleccionarPlato,
    productosbusqueda,
    listarProductosBusqueda,
    limpiarListaProductosBusqueda,
  } = useContext(PedidoContext);

  useEffect(() => {
    if (buscar) {
      const unsubscribe = firebase.db
        .collection('restaurantes')
        .where('negocioTipo', '==', negocio.nombre)
        .onSnapshot((snapshot) => {
          limpiarListaProductosBusqueda();
          snapshot.docs.map((doc) => {
            firebase.db
              .collection('restaurantes')
              .doc(doc.id)
              .collection('productos')
              .where('categoria', '==', buscar)
              .get()
              .then((snapshot) => {
                snapshot.docs.map((doc) => {
                  const platos = { id: doc.id, ...doc.data() };
                  listarProductosBusqueda(platos);
                  // console.log(platos);
                });
              });
          });
        });

      return () => {
        limpiarListaProductosBusqueda();
        unsubscribe();
      };
    }
  }, [buscar]);

  const keyExtractor = (item, index) => index.toString();

  const renderProductItem = ({ item, index }) => (
    <SimpleProductCard
      key={index}
      onPress={() => {
        // Con los datos del item se llena el estado global plato
        seleccionarPlato(item);
        navigation.navigate('Product');
      }}
      activeOpacity={0.7}
      imageUri={item.imagen}
      title={item.nombre}
      price={item.precio}
      description={item.descripcion}
      stock={item.existencia}
      searchCard={true}
      swipeoutDisabled
    />
  );

  const renderSeparator = () => <Divider />;

  // Busqueda
  const buscandoElemento = (aBuscar) => {
    const abuscar = aBuscar.toLowerCase();

    setBuscar(abuscar);
    // let productosSinDuplicados = removeDuplicates(productosbusqueda, 'id').filter((elemento) =>
    //   elemento.nombre.toLowerCase().includes(aBuscar.toLowerCase()),
    // );

    // setFiltrados(productosSinDuplicados);
  };

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

  return (
    <SafeAreaView style={styles.screenContainer}>
      {/* <StatusBar backgroundColor={Colors.background} barStyle="dark-content" /> */}

      <View style={styles.titleContainer}>
        <Heading6 style={styles.titleText}>Buscar</Heading6>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nombre del producto que desea buscar"
          returnKeyType="search"
          maxLength={50}
          style={styles.textInput}
          onChangeText={(text) => {
            buscandoElemento(text);
          }}
        />
        <View style={styles.searchButtonContainer}>
          <TouchableItem>
            <View style={styles.searchButton}>
              <Icon name={SEARCH_ICON} size={23} color={Colors.onPrimaryColor} />
            </View>
          </TouchableItem>
        </View>
      </View>

      <View>
        {buscar && productosbusqueda.length === 0 ? (
          <View style={styles.container}>
            <ActivityIndicator animating color={'#FE5000'} size="large" />
          </View>
        ) : (
          <FlatList
            data={removeDuplicates(productosbusqueda, 'id')}
            showsHorizontalScrollIndicator={false}
            alwaysBounceHorizontal={false}
            keyExtractor={keyExtractor}
            // initialNumToRender={10} //probando
            renderItem={renderProductItem}
            contentContainerStyle={styles.filtersList}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Search;
