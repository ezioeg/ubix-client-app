/**
 * Ubix
 *
 * @format
 * @flow
 */

// Dependencies
import React, { Fragment, useState, useContext, useEffect, useCallback } from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';

// Components
import Divider from '../../components/divider/Divider';
import SimpleRestaurantCard from '../../components/cards/SimpleRestaurantCard'; // antes ProductCard
import EmptyState from '../../components/emptystate/EmptyState';

// Colors
import Colors from '../../theme/colors';

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import PedidoContext from '../../../context/pedidos/pedidosContext';
import firebase from '../../../firebase';

const EMPTY_STATE_ICON = 'cloud-search-outline';

// Styles
const styles = StyleSheet.create({
  topArea: { flex: 0, backgroundColor: Colors.primaryColor },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  productList: {
    paddingVertical: 8,
  },
});

const Category = () => {
  const [negocios, setNegocios] = useState([]);

  // Para muestra
  const [products, setProducts] = useState([
    {
      imageUri: require('../../assets/img/salad_1.jpg'),
      name: 'Sandwich Subway',
      price: 8.49,
      quantity: 0,
      discountPercentage: 10,
    },
  ]);

  // Uso del contexto para seleccion
  const { negocio, categoria, seleccionarRestaurante } = useContext(PedidoContext);

  // Hook para redireccionar
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = firebase.db
      .collection('restaurantes')
      .where('negocioTipo', '==', negocio.nombre)
      .where('categorias', '==', categoria.nombre)
      .onSnapshot(manejarSnapshot);

    // console.log('categorias: ', categoria);

    // Cambia el titulo del componente
    navigation.setOptions({ title: categoria.nombre });

    return () => {
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
    console.log('negocios: ', negocios);
    setNegocios(negocios);
  }

  const keyExtractor = (item, index) => index.toString();

  const renderProductItem = ({ item, index }) => (
    <SimpleRestaurantCard
      onPress={() => {
        // Con los datos del item se llena el estado global plato
        seleccionarRestaurante(item);
        navigation.navigate('Restaurant');
      }}
      key={index}
      activeOpacity={0.7}
      imageUri={item.imagen}
      title={item.nombre}
      description={item.descripcion}
      horario={item}
      apertura={item.apertura}
      cierre={item.cierre}
      abierto={item.abierto}
      swipeoutDisabled
    />
  );

  const renderSeparator = () => <Divider type="inset" marginLeft={0} />;

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
    <Fragment>
      <SafeAreaView style={styles.topArea} />
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />

        {negocios.length === 0 ? (
          <EmptyState
            showIcon
            iconName={EMPTY_STATE_ICON}
            title="Espere unos segundos"
            message="Buscando productos en esta categoría"
          />
        ) : (
          // <View style={[styles.container, { marginTop: 250 }]}>
          //   <ActivityIndicator animating color={'#FE5000'} size="large" />
          // </View>
          <FlatList
            data={negocios}
            keyExtractor={keyExtractor}
            // initialNumToRender={10} // probando
            renderItem={renderProductItem}
            ItemSeparatorComponent={renderSeparator}
            contentContainerStyle={styles.productList}
          />
        )}
      </SafeAreaView>
    </Fragment>
  );
};

export default Category;
