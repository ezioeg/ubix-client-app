/**
 * Ubix
 *
 * @format
 * @flow
 */

// Dependencies
import React, { Component, Fragment, useState, useContext, useEffect } from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  I18nManager,
} from 'react-native';

// Utils
import getImgSource from '../../utils/getImgSource.js';
import FastImage from 'react-native-fast-image';

// Components
import Button from '../../components/buttons/Button';
import { Caption, Heading5, Heading6, SmallText } from '../../components/text/CustomText';
import Icon from '../../components/icon/Icon';
import TouchableItem from '../../components/TouchableItem';
import TabBadgeIcon from '../../components/navigation/TabBadgeIcon';

// Colors
import Colors from '../../theme/colors';

import { useNavigation } from '@react-navigation/native';
import PedidoContext from '../../../context/pedidos/pedidosContext';
import FirebaseContext from '../../../context/firebase/firebaseContext';
import firebase from '../../../firebase';

// Config
const isRTL = I18nManager.isRTL;
const IOS = Platform.OS === 'ios';
const MINUS_ICON = IOS ? 'ios-remove' : 'md-remove';
const PLUS_ICON = IOS ? 'ios-add' : 'md-add';
const CARTCONT_ICON = IOS ? 'ios-cart' : 'md-cart';
const CLOSE_ICON = IOS ? 'ios-close' : 'md-arrow-back';
const imgHolder = require('../../assets/img/imgholder.png');

// Styles
const styles = StyleSheet.create({
  topArea: { flex: 0, backgroundColor: '#fff' },
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    width: '100%',
    height: 300,
  },
  productImg: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  bottomOverlay: { flex: 1 },
  topButton: {
    position: 'absolute',
    top: 16,
    borderRadius: 18,
    backgroundColor: Colors.whiteSmoke, // #66033ccc
  },
  left: { left: 16 },
  right: { right: 16 },
  buttonIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
  },
  productDescription: {
    marginTop: -22,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 16,
    backgroundColor: Colors.background, //Colors.surface,
  },
  productTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 10,
  },
  productTitle: {
    fontWeight: '700',
  },
  priceText: {
    fontWeight: '700',
    fontSize: 18,
    paddingTop: 2,
    color: Colors.primaryColor,
  },
  shortDescription: {
    paddingVertical: 8,
    textAlign: 'left',
  },
  caption: {
    padding: 16,
    fontWeight: '700',
    textAlign: 'left',
  },
  dishContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    height: 56,
  },
  indicator: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  emptyIndicator: {
    marginRight: 24,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.black, //
    opacity: 0.4,
    backgroundColor: Colors.background,
  },
  filledIndicator: {
    marginRight: 24,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FE5000', //
    opacity: 0.8,
  },
  dishName: {
    top: -1,
    lineHeight: 22,
  },
  dishPrice: {
    color: Colors.secondaryText,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  quantity: {
    top: -1,
    paddingHorizontal: 18,
    fontSize: 18,
    color: Colors.black,
    textAlign: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryColor,
  },
  iconContainerClose: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'grey',
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopRightRadius: 22,
    borderTopLeftRadius: 22,
    width: '100%',
    padding: 16,
    backgroundColor: Colors.whiteSmoke,
  },
  bottomArea: { flex: 0, backgroundColor: Colors.whiteSmoke },
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
  priceGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  oldPriceContainer: { marginLeft: 7 },
  oldPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#8e8e8e',
  },
  hr: {
    position: 'absolute',
    top: 11,
    width: '100%',
    height: 1,
    backgroundColor: '#8e8e8e',
  },
  titleStock: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'red',
    letterSpacing: 0.15,
  },
});

// ProductB
const ProductB = () => {
  const {
    plato,
    agregarProductoCarrito,
    pedidocarrito,
    // cantidadTotal,
    cantidadtotal,
    seleccionarRestaurante,
  } = useContext(PedidoContext);
  const { obtenerRestauranteById, restaurantebyid } = useContext(FirebaseContext);

  // Se extran datos del estado global plato
  const {
    nombre,
    imagen,
    descripcion,
    precio,
    ingredientes,
    descuentoPorcentaje,
    existencia,
    limiteCompra,
    restauranteId,
  } = plato;

  // Para muestra
  const [product, setProduct] = useState([
    {
      precio: 10.9,
      singleProductPrice: 10.9,
      quantity: 1,
      sideDish: 20,
      total: 10.9,
    },
  ]);

  // Para muestra
  const [extras, setExtras] = useState(ingredientes);
  const [extrasSeleccionados, setExtrasSeleccionados] = useState([]);

  const [favorite, setFavorite] = useState(false);
  const [focused, setFocused] = useState('');

  // State local para cantidad y total
  const [cantidad, setCantidad] = useState(1);
  const [total, setTotal] = useState(0);
  const [restaurante, setRestaurante] = useState([]);

  useEffect(() => {
    // obtenerRestauranteById(restauranteId);

    // Probando
    const unsubscribe = firebase.db
      .collection('restaurantes')
      .doc(restauranteId)
      .onSnapshot(function (doc) {
        const restauranteById = {
          id: doc.id,
          ...doc.data(),
        };

        setRestaurante(restauranteById);
      });
    return () => {
      // Unmouting
      unsubscribe();
    };
  }, []);

  // Apenas el componente carga, calcula la cantidad a pagar
  useEffect(() => {
    calcularTotalPagar();
    // Se desactivo esta funcion porque ralentiza la cuenta total
    // calcularCantidadTotal();
  }, [pedidocarrito, cantidad, extras]);

  // Hook para redireccionar
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  // Calcular el total a pagar
  const calcularTotalPagar = () => {
    // Se suma los ingredientes seleccionados
    const precioExtra = extrasSeleccionados.reduce((sum, value) => sum + value.precio, 0);

    //   console.log(
    //   'precio extra',
    //   extras.reduce((sum, value) => (value.seleccionado ? sum + value.precio : sum), 0),
    // );

    const precioVerificado = !descuentoPorcentaje
      ? (precio + precioExtra) * cantidad
      : (((100 - descuentoPorcentaje) / 100) * (precio + precioExtra)).toFixed(2) * cantidad;

    const totalPagar = precioVerificado;
    setTotal(totalPagar);
  };

  // Incrementar en uno la cantidad
  const decrementar = () => {
    if (cantidad > 1) {
      const nuevaCantidad = parseInt(cantidad) - 1;
      setCantidad(nuevaCantidad);
    }
  };

  // Incrementar en uno la cantidad
  const incrementar = () => {
    const nuevaCantidad = parseInt(cantidad) + 1;
    setCantidad(nuevaCantidad);
  };

  // Confirma y restringe agregar el producto al carrito
  const agregarOrden = () => {
    if (limiteCompra > 0) {
      if (descuentoPorcentaje && cantidad > limiteCompra) {
        Alert.alert(
          'Producto en oferta',
          `No se puede agregar mas de ${cantidad} en este descuento`,
          [
            {
              text: 'Ok',
            },
          ],
        );
        return;
      }
    }

    Alert.alert('Agregar producto', 'Deseas agregar al carrito?', [
      {
        text: ' Si',
        onPress: () => {
          // Almacenar el pedido al carrito
          const pedidoCarrito = {
            ...plato,
            ingredientes: extrasSeleccionados,
            cantidad,
            total,
          };
          // Se llena el estado global pedido carrito
          agregarProductoCarrito(pedidoCarrito);
          seleccionarRestaurante(restaurante);
          // Navegar hacia el resumen o carrito
          navigation.navigate('Restaurant');
        },
      },
      {
        text: ' Cancelar',
        style: 'cancel',
      },
    ]);
  };

  // Por arreglar
  const setExtraDish = (item) => () => {
    const index = extras.indexOf(item);
    const seleccionado = extras[index].seleccionado;

    // if (seleccionado) {
    //   product.singleProductPrice -= item.precio;
    //   product.total -= product.quantity * item.precio;
    // } else {
    //   product.singleProductPrice += item.precio;
    //   product.total += product.quantity * item.precio;
    // }

    extras[index].seleccionado = !seleccionado;
    // Si esta seleccionado, lo agrega
    const extrasSeleccionados = extras.filter((extra) => extra.seleccionado === true);

    // console.log('extras', [...extras]);
    // console.log('extras seleccionados', [...extrasSeleccionados]);
    // setProduct(product);

    setExtras([...extras]);
    setExtrasSeleccionados([...extrasSeleccionados]);
  };

  return (
    <Fragment>
      <SafeAreaView style={styles.topArea} />

      <View style={styles.screenContainer}>
        <ScrollView>
          <View style={styles.header}>
            <FastImage
              defaultSource={imgHolder}
              source={imagen ? getImgSource(imagen) : null}
              style={styles.productImg}
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

          <View style={styles.productDescription}>
            <View style={styles.productTitleContainer}>
              <Heading6 style={styles.productTitle}>{nombre}</Heading6>

              {descuentoPorcentaje ? (
                <View>
                  <Text style={styles.priceText}>
                    $ {(((100 - descuentoPorcentaje) / 100) * precio).toFixed(2)}
                  </Text>
                  <View style={styles.oldPriceContainer}>
                    <Text style={styles.oldPrice}>{`$ ${precio.toFixed(2)}`}</Text>
                    <View style={styles.hr} />
                  </View>
                </View>
              ) : (
                <Text style={styles.priceText}>$ {precio}</Text>
              )}
            </View>
            {!existencia && (
              <View>
                <Text style={styles.titleStock}>Agotado</Text>
              </View>
            )}

            <SmallText style={styles.shortDescription}>{descripcion}</SmallText>
          </View>
          <View>
            <Caption style={styles.caption}>EXTRAS</Caption>
            {extras &&
              extras.map((item, index) => (
                <TouchableItem key={index.toString()} onPress={setExtraDish(item)} useForeground>
                  <View style={styles.dishContainer}>
                    <View style={styles.indicator}>
                      <View>
                        {item.seleccionado ? (
                          <View style={styles.filledIndicator} />
                        ) : (
                          <View style={styles.emptyIndicator} />
                        )}
                      </View>

                      <Text style={styles.dishName}>{item.nombre}</Text>
                    </View>

                    <Text style={styles.dishPrice}>+ ${item.precio}</Text>
                  </View>
                </TouchableItem>
              ))}
          </View>
        </ScrollView>

        <View style={styles.bottomButtonsContainer}>
          <View style={styles.amountContainer}>
            <View style={styles.amountButtonsContainer}>
              <>
                {restaurante.abierto && existencia ? (
                  <TouchableItem onPress={decrementar} borderless>
                    <View style={styles.iconContainer}>
                      <Icon name={MINUS_ICON} size={20} color={Colors.onPrimaryColor} />
                    </View>
                  </TouchableItem>
                ) : (
                  <View style={styles.iconContainerClose}>
                    <Icon name={MINUS_ICON} size={20} color={Colors.onPrimaryColor} />
                  </View>
                )}
              </>

              <Text style={styles.quantity}>{cantidad}</Text>

              <>
                {restaurante.abierto && existencia ? (
                  <TouchableItem onPress={incrementar} borderless>
                    <View style={styles.iconContainer}>
                      <Icon name={PLUS_ICON} size={20} color={Colors.onPrimaryColor} />
                    </View>
                  </TouchableItem>
                ) : (
                  <View style={styles.iconContainerClose}>
                    <Icon name={PLUS_ICON} size={20} color={Colors.onPrimaryColor} />
                  </View>
                )}
              </>
            </View>
          </View>

          {restaurante.abierto && existencia ? (
            <Button
              onPress={agregarOrden}
              title={`Agregar $${Math.round(total * 100) / 100}`}
              titleColor={Colors.onPrimaryColor}
              height={44}
              color={Colors.primaryColor}
              small
              rounded
            />
          ) : (
            <Button
              title={`Agregar $${Math.round(total * 100) / 100}`}
              titleColor={Colors.onPrimaryColor}
              height={44}
              color="grey"
              small
              rounded
            />
          )}
        </View>
      </View>
      <SafeAreaView style={styles.bottomArea} />
    </Fragment>
  );
};
export default ProductB;
