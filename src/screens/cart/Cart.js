/**
 * Ubix
 *
 * @format
 * @flow
 */

// Dependencies
import React, { Component, Fragment, useState, useContext, useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  FlatList,
  Alert,
  I18nManager,
  Text,
  TextInput,
} from 'react-native';

// Components
import Button from '../../components/buttons/Button';
import Divider from '../../components/divider/Divider';
import { Caption, Heading6, Subtitle1, SmallText } from '../../components/text/CustomText';
import EmptyState from '../../components/emptystate/EmptyState';
import ProductCard from '../../components/cards/ProductCard';
import SafeAreaView from '../../components/SafeAreaView';
import TouchableItem from '../../components/TouchableItem';
import Icon from '../../components/icon/Icon';

// Colors
import Colors from '../../theme/colors';

import { useNavigation } from '@react-navigation/native';
import firebase from '../../../firebase';
import FirebaseContext from '../../../context/firebase/firebaseContext';
import PedidoContext from '../../../context/pedidos/pedidosContext';

// Config
const isRTL = I18nManager.isRTL;
const IOS = Platform.OS === 'ios';
const EMPTY_STATE_ICON = 'cart-remove';
const ADD_ICON = IOS ? 'ios-add' : 'md-add';

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  titleText: {
    // paddingTop: 5,
    paddingBottom: 15,
    fontWeight: '700',
    textAlign: 'left',
  },
  inline: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  subTotalText: {
    top: -8,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  subTotalPriceText: {
    top: -8,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primaryColor,
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
  button: {
    width: '48%',
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
    width: '100%',
    borderRadius: 14,
    paddingHorizontal: 12,
    backgroundColor: Colors.whiteSmoke,
  },
  caption: {
    padding: 16,
    fontWeight: '700',
    textAlign: 'left',
  },
  caption2: {
    paddingLeft: 16,
    fontWeight: '700',
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'green',
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
});

// Cart
const Cart = () => {
  const {
    restaurante,
    pedidocarrito,
    pagototal,
    pagoTotal,
    cantidadtotal,
    cantidadTotal,
    eliminarProductoCarrito,
    seleccionarPlato,
    guardarPedido,
    // pedidoRealizado,
  } = useContext(PedidoContext);

  const {
    obtenerClienteOrden,
    obtenerRestauranteOrden,
    obtenerConfigs,
    clienteorden,
    restauranteorden,
    configs,
  } = useContext(FirebaseContext);

  const [costoTotal, setcostoTotal] = useState(0);
  const [codigoInputValue, setCodigoInputValue] = useState('');
  const [codigo, setCodigo] = useState('');

  const user = firebase.auth.currentUser; // arreglar
  const usuarioID = user ? user.uid : null; // arreglar

  useEffect(() => {
    // Exteraer datos de origen y destino
    obtenerClienteOrden(usuarioID); // No hace falta al parecer
    obtenerConfigs(); // Para la tasa del dolar
  }, []);

  useEffect(() => {
    calcularSumaTotal();
    calcularCantidadTotal();
    if (pedidocarrito.length > 0) {
      obtenerRestauranteOrden(pedidocarrito[0].restauranteId);
    }
  }, [pedidocarrito, codigo]);

  // Hook para redireccionar
  const navigation = useNavigation();

  const inputValue = (inputvalue) => {
    const inputValue = inputvalue.toLowerCase();
    // console.log('input: ', inputValue);
    setCodigoInputValue(inputValue);
  };

  const verificarCodigo = () => {
    // console.log('Introduciendo input: ', codigoInputValue);

    // Se puede quitar el tiempo real aqui?
    firebase.db
      .collection('promociones')
      .where('codigo', '==', codigoInputValue)
      .onSnapshot(manejarSnapshot);

    function manejarSnapshot(snapshot) {
      let codigo = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      setCodigo(codigo);
    }
  };

  const calcularSumaTotal = () => {
    let sumaTotal = 0;
    sumaTotal = pedidocarrito.reduce((sumaTotal, producto) => sumaTotal + producto.total, 0);

    setcostoTotal(sumaTotal);

    // Se verifica el codigo de promo
    if (codigo[0] !== undefined) {
      // console.log('Promo porcentaje: ', codigo[0].porcentaje);
      // console.log('Promo valor: ', codigo[0].valor);

      const promoPorcentaje = codigo[0].porcentaje;
      const promoValor = codigo[0].valor;

      // Promo porcentual
      let resultadoPromoPorcentaje = (sumaTotal * promoPorcentaje) / 100;
      // Promo valor
      let resultadoPromoValor = promoValor;

      // Si el pedido es menor a 20 dolares se suman 2 dolares de envio
      // let totalPagar = sumaTotal < 20 ? Number(sumaTotal + 2) : Number(sumaTotal);
      let totalPagar = Number(sumaTotal + 2);
      totalPagar = totalPagar - resultadoPromoPorcentaje - resultadoPromoValor;

      pagoTotal(totalPagar);
    } else {
      // Si el pedido es menor a 20 dolares se suman 2 dolares de envio
      // let totalPagar = sumaTotal < 20 ? Number(sumaTotal + 2) : Number(sumaTotal);
      let totalPagar = Number(sumaTotal + 2);
      pagoTotal(totalPagar);
    }
  };

  const calcularCantidadTotal = () => {
    let sumaCantidad = 0;
    // Suma todas las cantidades del pedido
    sumaCantidad = pedidocarrito.reduce(
      (sumaCantidad, producto) => sumaCantidad + producto.cantidad,
      0,
    );
    // console.log(sumaCantidad);
    // Agrega la cantidad total del pedido carrito
    cantidadTotal(sumaCantidad);
  };

  // No se esta usando
  const decrementar = (item) => {
    if (item.cantidad > 1) {
      const nuevaCantidad = parseInt(item.cantidad) - 1;
      const nuevoTotal = item.precio * nuevaCantidad;
    }
  };

  // No se esta usando
  const incrementar = (item) => {
    const nuevaCantidad = parseInt(item.cantidad) + 1;
    const nuevoTotal = item.precio * nuevaCantidad;
  };

  // Confirma orden
  const confirmarRealizarPedido = () => {
    // No permite comprar mas de 12 platos
    if (cantidadtotal > 12) {
      Alert.alert('No puedes agregar mas de 12 productos al carrito', '', [
        {
          text: 'Ok',
        },
      ]);
      return;
    }

    // No permite que se compre productos de diferentes restaurantes
    for (let i = 0; i < pedidocarrito.length; i++) {
      // console.log(pedidocarrito[i].restauranteId);
      if (pedidocarrito[0].restauranteId !== pedidocarrito[i].restauranteId) {
        Alert.alert('No puedes comprar en restaurantes diferentes', '', [
          {
            text: 'Ok',
          },
        ]);
        return;
      }
    }

    Alert.alert('Revisa tu orden', 'Una vez que realizas la orden no podras editarla', [
      {
        text: ' Confirmar',
        onPress: async () => {
          // El id del restaurante para tambien agregarle la orden
          // console.log(restauranteorden.id);
          const restauranteID = restauranteorden.id;

          // Crear un objeto con la info inicial de la orden
          const pedidoObj = {
            clienteId: usuarioID,
            clientenombre: clienteorden.nombre,
            clientetelefono: clienteorden.telefono,
            restauranteId: restauranteID, // Probando
            restaurantenombre: restauranteorden.nombre,
            tiempoentrega: 0,
            verificado: false,
            entregado: false,
            conductornombre: '',
            conductorcelular: '',
            pagototal: pagototal, // Si el pedido es menor a 20$ se cobra envio de 2$
            orden: pedidocarrito, // array
            creado: Date.now(), // firebase.fire.FieldValue.serverTimestamp()
          };

          // console.log(pedidoObj);

          try {
            guardarPedido(pedidoObj);

            // Redirecciona
            navigation.navigate('DireccionUsuario');
          } catch (error) {
            // console.log(error);
          }
        },
      },
      {
        text: ' Revisar',
        style: 'cancel',
      },
    ]);
  };

  // Elimina un producto del carrito
  const confirmarEliminarProductoCarrito = (id) => {
    Alert.alert('Desea eliminar del carrito?', '', [
      {
        text: ' Confirmar',
        onPress: () => {
          // Elimina el producto del pedido
          eliminarProductoCarrito(id);
        },
      },
      {
        text: ' Cancelar',
        style: 'cancel',
      },
    ]);
  };
  const avisoInicioSesion = () => {
    Alert.alert(
      'Aviso inicio de sesión',
      'Para realizar un pedido debe iniciar sesión',
      [
        { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
        {
          text: 'Iniciar sesión',
          onPress: () => navigation.navigate('Welcome'),
        },
      ],
      { cancelable: false },
    );
  };
  const keyExtractor = (item, index) => index.toString();

  const renderProductItem = ({ item, index }) => (
    <ProductCard
      key={item.id}
      onPress={() => {
        // Con los datos del item se llena el estado global plato
        seleccionarPlato(item);
        navigation.navigate('Product');
      }}
      onPressRemove={() => decrementar(item)}
      onPressAdd={() => incrementar(item)}
      activeOpacity={0.7}
      imageUri={item.imagen}
      title={item.nombre}
      description={item.descripcion}
      ingredientes={item.ingredientes}
      price={item.precio}
      quantity={item.cantidad}
      discountPercentage={item.descuentoPorcentaje}
      swipeoutOnPressRemove={() => confirmarEliminarProductoCarrito(item.id)} //swipeoutOnPressRemove(item)
    />
  );

  const renderSeparator = () => <Divider />;

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar backgroundColor={Colors.statusBarColor} barStyle="dark-content" /> */}

      <View style={styles.titleContainer}>
        <Heading6 style={styles.titleText}>Carrito</Heading6>

        {pedidocarrito.length > 0 && (
          <>
            <View style={styles.inline}>
              <Subtitle1 style={styles.subTotalText}> Total: </Subtitle1>
              <Heading6 style={styles.subTotalPriceText}>
                ${Math.round(pagototal * 100) / 100}{' '}
              </Heading6>
            </View>
          </>
        )}

        {restauranteorden && pedidocarrito.length > 0 && (
          <>
            <View style={styles.inline}>
              <Subtitle1 style={styles.subTotalText}> Total: </Subtitle1>
              <Heading6 style={styles.subTotalPriceText}>
                BsS {Math.round(pagototal * configs.tasa * 100) / 100}
              </Heading6>
            </View>
          </>
        )}
      </View>
      {/* pedidocarrito.length > 0 && costoTotal < 20  */}
      {pedidocarrito.length > 0 && (
        <View style={styles.bottomTextInfo}>
          <View style={styles.info}>
            <Text style={{ color: 'red', fontWeight: 'bold' }}>
              El envío tiene un costo adicional de $2
            </Text>
          </View>
        </View>
      )}

      {pedidocarrito.length === 0 ? (
        <EmptyState
          showIcon
          iconName={EMPTY_STATE_ICON}
          title="Su carrito está vacío"
          message="Parece que no has agregado nada a tu carrito"
        />
      ) : (
        <Fragment>
          <FlatList
            data={pedidocarrito}
            keyExtractor={keyExtractor}
            renderItem={renderProductItem}
            // ItemSeparatorComponent={renderSeparator}
          />

          <View style={styles.bottomTextInfo}>
            <View style={styles.info}>
              <SmallText>{`Desliza hacia la ${
                isRTL ? 'derecha' : 'izquierda'
              } para eliminar productos`}</SmallText>
            </View>
          </View>

          <View>
            <Caption style={styles.caption}>
              CÓDIGO PROMO{' '}
              {codigo[0] !== undefined && <Caption style={styles.caption2}>APLICADO!</Caption>}
            </Caption>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Coloque su código de promoción aquí"
                returnKeyType="search"
                maxLength={50}
                style={styles.textInput}
                onChangeText={(codigo) => {
                  inputValue(codigo);
                }}
              />
              <View style={styles.searchButtonContainer}>
                <TouchableItem onPress={verificarCodigo}>
                  <View style={styles.searchButton}>
                    <Icon name={ADD_ICON} size={23} color={Colors.onPrimaryColor} />
                  </View>
                </TouchableItem>
              </View>
            </View>
          </View>

          <View style={styles.bottomButtonsContainer}>
            <Button
              onPress={() => navigation.navigate('Restaurant')}
              buttonStyle={styles.button}
              color={Colors.tertiaryColor}
              rounded
              title="Agregar más"
            />
            {usuarioID ? (
              <Button
                onPress={() => confirmarRealizarPedido()}
                buttonStyle={styles.button}
                rounded
                title="Pago"
              />
            ) : (
              <Button
                onPress={() => avisoInicioSesion()}
                buttonStyle={styles.button}
                rounded
                title="Pago"
              />
            )}
          </View>
        </Fragment>
      )}
    </SafeAreaView>
  );
};
export default Cart;
