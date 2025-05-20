/**
 * Ubix
 *
 * @format
 * @flow
 */

// Dependencies
import React, { Component, Fragment, useState, useContext, useEffect } from 'react';
import {
  Platform,
  StatusBar,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import SafeAreaView from '../../components/SafeAreaView';

// Utils
import getImgSource from '../../utils/getImgSource.js';
import FastImage from 'react-native-fast-image';

// Components
import Button from '../../components/buttons/Button';
import { Heading5, Heading6, SmallText } from '../../components/text/CustomText';
import Icon from '../../components/icon/Icon';
import TouchableItem from '../../components/TouchableItem';
import Divider from '../../components/divider/Divider';
import SimpleProductCard from '../../components/cards/SimpleProductCard';
import TabBadgeIcon from '../../components/navigation/TabBadgeIcon';

// Colors
import Colors from '../../theme/colors';

import { useNavigation } from '@react-navigation/native';
// Contexts
import FirebaseContext from '../../../context/firebase/firebaseContext';
import PedidoContext from '../../../context/pedidos/pedidosContext';
import firebase from '../../../firebase';
import _ from 'lodash';

// Config
const IOS = Platform.OS === 'ios';
const MINUS_ICON = IOS ? 'ios-remove' : 'md-remove';
const PLUS_ICON = IOS ? 'ios-add' : 'md-add';
const CARTCONT_ICON = IOS ? 'ios-cart' : 'md-cart';
const CLOSE_ICON = IOS ? 'ios-close' : 'md-arrow-back';
const FUNNEL_ICON = IOS ? 'ios-funnel' : 'md-funnel';
const imgHolder = require('../../assets/img/imgholder.png');

// Styles
const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    backgroundColor: Colors.whiteSmoke,
  },
  swiperContainer: {
    width: '100%',
    height: 228, // 228
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImg: {
    width: '100%',
    height: '100%', // 228
    resizeMode: 'cover',
  },
  topButton: {
    position: 'absolute',
    top: 16,
    borderRadius: 18,
    backgroundColor: Colors.whiteSmoke,
  },
  left: { left: 16 },
  right: { right: 16 },
  buttonIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
  },
  descriptionContainer: {
    // position: 'absolute',
    // top: 180,
    // left: 18,
    // right: 18,
    backgroundColor: Colors.background,
    // marginTop: 2, // linea de arriba
    paddingHorizontal: 16,
    paddingBottom: 38,
    marginBottom: 2, // linea de abajo
    flex: 1,
  },
  restaurantTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 15,
  },
  restaurantTitle: {
    fontWeight: '700',
  },
  shortDescription: {
    paddingBottom: 8,
  },
  menuContainer: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: Colors.background,
  },
  menuTitle: {
    paddingLeft: 20,
    paddingBottom: 20,
    fontWeight: '700',
  },
  //new
  menuCard: {
    marginBottom: 9,
    marginLeft: '2%',
    width: '96%',
    borderRadius: 10,
    backgroundColor: Colors.whiteSmoke,
    // overflow: 'hidden', // Arregla el borderRadius que no funciona
  },
  menuButtonContainer: {
    // flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1, // nuevo
    paddingTop: 10,
  },
  menuButton: {
    width: '40%',
    height: '140%',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    justifyContent: 'center',
    alignItems: 'center',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.primaryColor,
  },
  badgeText: {
    top: -0.5,
    fontSize: 10,
    color: Colors.onSecondaryColor,
  },
  separador: {
    backgroundColor: Colors.background,
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separadorTexto: { fontWeight: 'bold', textTransform: 'uppercase' },
  loader: { marginTop: 10, alignItems: 'center' },
});

// Combinacion de ProductA y CategoryB
const Restaurant = () => {
  const [favorite, setFavorite] = useState(false);
  // const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [platosRestaurante, setPlatosRestaurante] = useState([]);
  // Obtener productos de este restaurante y llenarlos en menurestaurante
  const { menurestaurante, obtenerProductosRestaurante } = useContext(FirebaseContext);
  // restaurante seleccionado y seleccionarPlato para llenar el plato seleccionado
  const { negocio, restaurante, seleccionarPlato, cantidadtotal } = useContext(PedidoContext);
  // Se extran datos del estado global restaurante
  const { id, nombre, imagen, descripcion, categoria, abierto } = restaurante;

  useEffect(() => {
    // obtenerProductosRestaurante(id);

    // Probando
    const unsubscribe = firebase.db
      .collection('restaurantes')
      .doc(id)
      .collection('productos')
      .onSnapshot(manejarSnapshot);

    function manejarSnapshot(snapshot) {
      let platosRestaurante = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      platosRestaurante = _.sortBy(platosRestaurante, 'categoria');

      setPlatosRestaurante(platosRestaurante);
    }

    return () => {
      // Unmouting
      unsubscribe();
    };
  }, []);

  // Hook para redireccionar
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  const keyExtractor = (item, index) => index.toString();

  const mostrarHeading = (categoria, i) => {
    if (i > 0) {
      const categoriaAnterior = platosRestaurante[i - 1].categoria;
      if (categoriaAnterior !== categoria) {
        return (
          <View style={styles.separador}>
            <Text style={styles.separadorTexto}>{categoria}</Text>
          </View>
        );
      }
    } else {
      return (
        <View style={styles.separador}>
          <Text style={styles.separadorTexto}>{categoria}</Text>
        </View>
      );
    }
  };

  const renderFooter = () => {
    if (isMoreLoading) return true;
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#FE5000" />
      </View>
    );
  };

  // const onRefresh = () => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);
  // };

  const handleLoadMore = () => {
    setIsMoreLoading(true);
    setTimeout(() => {
      setIsMoreLoading(false);
    }, 2000);
  };

  // const onClickItem = (item, index) => {
  //   const newArrData = data.map((e, index) => {
  //     if (item.id == e.id) {
  //       return {
  //         ...e,
  //         selected: true,
  //       };
  //     }
  //
  //     return {
  //       ...e,
  //       selected: false,
  //     };
  //   });

  //   setData(newArrData);
  // };

  const renderProductItem = ({ item, index }) => (
    <>
      {mostrarHeading(item.categoria, index)}
      <SimpleProductCard
        onPress={() => {
          // Con los datos del item se llena el estado global plato
          seleccionarPlato(item);
          navigation.navigate('Product');
        }}
        key={index}
        activeOpacity={0.7}
        imageUri={item.imagen}
        title={item.nombre}
        price={item.precio}
        description={item.descripcion}
        discountPercentage={item.descuentoPorcentaje}
        stock={item.existencia}
        swipeoutDisabled
      />
    </>
  );

  return (
    <SafeAreaView>
      <View style={styles.carouselContainer}>
        {/* <StatusBar backgroundColor="white" /> */}
        <ScrollView>
          <View style={styles.swiperContainer}>
            <FastImage
              defaultSource={imgHolder}
              source={imagen ? getImgSource(imagen) : null}
              style={styles.slideImg}
            />

            <View style={[styles.topButton, styles.left]}>
              <TouchableItem onPress={goBack} borderless>
                <View style={styles.buttonIconContainer}>
                  <Icon name={CLOSE_ICON} size={IOS ? 20 : 22} color={'black'} />
                </View>
              </TouchableItem>
            </View>

            <View style={[styles.topButton, styles.right]}>
              <TouchableItem onPress={() => navigateTo('Cart')} borderless>
                <View style={styles.buttonIconContainer}>
                  <Icon name={CARTCONT_ICON} size={IOS ? 20 : 22} color={'black'} />
                  {cantidadtotal > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{cantidadtotal}</Text>
                    </View>
                  )}
                </View>
              </TouchableItem>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <View style={styles.restaurantTitleContainer}>
              <Heading5 style={styles.restaurantTitle}>{nombre}</Heading5>
            </View>

            <View>
              <SmallText style={styles.shortDescription}>{descripcion}</SmallText>
            </View>

            <View style={styles.menuButtonContainer}>
              {abierto ? (
                <Button
                  // onPress={}
                  buttonStyle={styles.menuButton}
                  title="Abierto"
                  borderColor="#3CB371"
                  titleColor="#3CB371"
                  outlined
                />
              ) : (
                <Button
                  // onPress={}
                  buttonStyle={styles.menuButton}
                  title="Cerrado"
                  borderColor="red"
                  titleColor="red"
                  outlined
                />
              )}
            </View>
          </View>
          {/* <Fragment> */}
          <View style={styles.menuContainer}>
            <View>
              <Heading6 style={styles.menuTitle}>Menú</Heading6>
            </View>
            <FlatList
              data={platosRestaurante}
              keyExtractor={keyExtractor}
              renderItem={renderProductItem}
              ListFooterComponent={renderFooter}
              // refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
              onEndReachedThreshold={0}
              // onMomentumScrollBegin={() => {
              //   onEndReachedCalledDuringMomentum = false;
              // }}
              onEndReached={() => {
                // if (!onEndReachedCalledDuringMomentum) {
                handleLoadMore();
                //   onEndReachedCalledDuringMomentum = true;
                // }
              }}
            />
          </View>
          {/* </Fragment> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default Restaurant;
