/**
 * Ubix
 *
 * @format
 * @flow
 */

// Dependencies
import React, { Fragment, useState, useContext, useEffect } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';

// Components
import OrderItem from '../../components/cards/OrderItem';
import { Heading6 } from '../../components/text/CustomText';
import EmptyState from '../../components/emptystate/EmptyState';

// Colors
import Colors from '../../theme/colors';

import { useNavigation } from '@react-navigation/native';
import firebase from '../../../firebase';

// Config
const EMPTY_STATE_ICON = 'clipboard-outline';

// Styles
const styles = StyleSheet.create({
  // topArea: { flex: 0, backgroundColor: Colors.primaryColor },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  productsContainer: {
    paddingBottom: 16,
  },
  titleContainer: {
    paddingHorizontal: 16,
    backgroundColor: Colors.background,
  },
  titleContainer2: {
    paddingHorizontal: 16,
    backgroundColor: Colors.background,
  },
  titleText: {
    paddingTop: 25,
    paddingBottom: 15,
    fontWeight: '700',
    textAlign: 'left',
  },
});

// OrdersB
const OrdersB = () => {
  //state de ordenes
  const [ordenes, setOrdenes] = useState([]);
  const user = firebase.auth.currentUser;
  const usuarioID = user.uid;

  useEffect(() => {
    const unsubscribe = firebase.db
      .collection('clientes')
      .doc(usuarioID)
      .collection('ordenes')
      // .where('verificado', '==', true)
      .onSnapshot(manejarSnapshot);

    return () => {
      // Unmouting
      unsubscribe();
    };
  }, []);

  function manejarSnapshot(snapshot) {
    const ordenes = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setOrdenes(ordenes);
  }

  // Hook para redireccionar
  const navigation = useNavigation();

  const keyExtractor = (item) => item.id.toString();

  const renderItem = ({ item, index }) => (
    <OrderItem
      key={index}
      activeOpacity={0.8}
      orderNumber={item.id}
      orderDate={item.creado}
      orderItems={item.orden}
      items={item}
      orderStatusVerified={item.verificado}
      orderStatusDeliveryTime={item.tiempoentrega}
      orderStatusDelivered={item.entregado}
      orderTime={item.tiempoentrega}
      restaurantName={item.restaurantenombre}
      // onPress={navigateTo('Product')}
    />
  );

  return (
    <Fragment>
      {/* <SafeAreaView style={styles.topArea} /> */}
      <SafeAreaView style={styles.container}>
        {/* <StatusBar backgroundColor="white" barStyle="dark-content" /> */}
        {ordenes.length === 0 ? (
          <Fragment>
            <View style={styles.titleContainer}>
              <Heading6 style={styles.titleText}>Mis ordenes</Heading6>
            </View>
            <EmptyState
              showIcon
              iconName={EMPTY_STATE_ICON}
              title="Tu lista de ordenes está vacía"
              message="Parece que no has realizado ordenes"
            />
          </Fragment>
        ) : (
          <Fragment>
            <View style={styles.titleContainer2}>
              <Heading6 style={styles.titleText}>Mis ordenes</Heading6>
            </View>
            <View style={styles.container}>
              <FlatList
                data={ordenes}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                contentContainerStyle={styles.productsContainer}
              />
            </View>
          </Fragment>
        )}
      </SafeAreaView>
    </Fragment>
  );
};

export default OrdersB;
