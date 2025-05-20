/**
 * Ubix
 *
 * @format
 * @flow
 */

// import node modules
import React, { Component, Fragment, useContext, useEffect } from 'react';
import { I18nManager, StatusBar, FlatList, StyleSheet, View, Alert } from 'react-native';

// Components
import Divider from '../../components/divider/Divider';
import EmptyState from '../../components/emptystate/EmptyState';
import { Heading6, SmallText } from '../../components/text/CustomText';
import ProductCard from '../../components/cards/ProductCard';
import SafeAreaView from '../../components/SafeAreaView';
import SimpleProductCard from '../../components/cards/SimpleProductCard';

// Colors
import Colors from '../../theme/colors';

// Additionals
import { useNavigation } from '@react-navigation/native';
import PedidoContext from '../../../context/pedidos/pedidosContext';

// Config
const isRTL = I18nManager.isRTL;
const EMPTY_STATE_ICON = 'heart-outline';

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  titleContainer: {
    paddingHorizontal: 16,
  },
  titleText: {
    paddingVertical: 16,
    fontWeight: '700',
    textAlign: 'left',
  },
  bottomTextInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  info: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 14,
    paddingHorizontal: 12,
    backgroundColor: '#f1f1f1',
  },
});

// Favorites
const Favorites = () => {
  // Extraer los favoritos guardados
  const { favoritos, seleccionarPlato, eliminarProductoFavorito } = useContext(PedidoContext);

  // Hook para redireccionar
  const navigation = useNavigation();

  const keyExtractor = (item, index) => index.toString();

  // base on list item dimensions
  // marginLeft={116} // 116 = 100 + 16
  const renderSeparator = () => <Divider type="inset" marginLeft={0} />;

  function removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }

    return newArray;
  }

  // Elimina un producto del carrito
  const confirmarEliminarProductoFavorito = (id) => {
    Alert.alert('Desea eliminar de favorito?', '', [
      {
        text: ' Confirmar',
        onPress: () => {
          // Eliminar del state
          eliminarProductoFavorito(id);
        },
      },
      {
        text: ' Cancelar',
        style: 'cancel',
      },
    ]);
  };

  const renderProductItem = ({ item }) => (
    <SimpleProductCard
      key={item.id}
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
      swipeoutOnPressRemove={() => confirmarEliminarProductoFavorito(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />

      {favoritos.length === 0 ? (
        <EmptyState
          showIcon
          iconName={EMPTY_STATE_ICON}
          title="Tu lista de favoritos está vacía"
          message="Guarde su comida favorita y hacer un pedido más fácil"
        />
      ) : (
        <Fragment>
          <FlatList
            data={removeDuplicates(favoritos, 'id')} // Hace que no se repita el item
            keyExtractor={keyExtractor}
            renderItem={renderProductItem}
            ItemSeparatorComponent={renderSeparator}
          />

          <View style={styles.bottomTextInfo}>
            <View style={styles.info}>
              <SmallText>{`Desliza hacia la ${
                isRTL ? 'derecha' : 'izquierda'
              } para eliminar de favoritos`}</SmallText>
            </View>
          </View>
        </Fragment>
      )}
    </SafeAreaView>
  );
};
export default Favorites;
