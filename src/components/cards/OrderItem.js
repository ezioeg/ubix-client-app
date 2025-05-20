/**
 * Ubix
 *
 * @format
 * @flow
 */

// Dependencies
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// Components
import Button from '../buttons/Button';
import { Caption, Subtitle1, Subtitle2 } from '../text/CustomText';
import TouchableItem from '../TouchableItem';

// Colors, layout
import Colors from '../../theme/colors';
import Layout from '../../theme/layout';

// Config

// Styles
const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    marginHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#F5F5F5', //Colors.background,
    elevation: 5,
  },
  content: {
    width: Layout.SCREEN_WIDTH - 2 * 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  orderNumber: {
    paddingBottom: 2,
    fontWeight: 'bold',
    color: Colors.primaryColorDark,
    textAlign: 'left',
  },
  flexEnd: {
    alignItems: 'flex-end',
  },
  divider: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#D8D8D8',
  },
  circleMask: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#D8D8D8',
  },
  leftCircle: {
    left: -9,
  },
  rightCircle: {
    right: -9,
  },
  pv8: {
    paddingVertical: 8,
  },
  itemContainer: {
    marginVertical: 4,
    backgroundColor: '#F5F5F5', //Colors.background,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 18,
  },
  ingredientes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    // height: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  extraSmallButton: {
    width: 116,
    height: 34,
    borderRadius: 17,
  },
  status: {
    textAlign: 'left',
  },
  onTheWay: {
    color: Colors.tertiaryColor,
    fontWeight: 'bold',
  },
  pending: {
    color: Colors.secondaryColor,
    fontWeight: 'bold',
  },
  delivered: {
    color: Colors.primaryColor,
    fontWeight: 'bold',
  },
});

// Props
type Props = {
  onPress: () => {},
  activeOpacity: number,
  orderNumber: number,
  orderDate: number,
  orderItems: Array,
  items: Array,
  orderStatusVerified: boolean,
  orderStatusDeliveryTime: number,
  orderStatusDelivered: boolean,
  orderTime: number,
  restaurantName: string,
};

// OrderItem
const OrderItem = ({
  onPress,
  activeOpacity,
  orderNumber,
  orderDate,
  orderItems,
  orderStatusVerified,
  orderStatusDeliveryTime,
  orderStatusDelivered,
  items,
  orderTime,
  restaurantName,
}: Props) => (
  <View style={styles.container}>
    <View style={styles.content}>
      <View style={styles.header}>
        <View>
          <Subtitle2 style={styles.orderNumber}>{`#Pedido ${orderNumber}`}</Subtitle2>

          <Caption>
            {new Date(orderDate).toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Caption>
          <Text>{restaurantName}</Text>
        </View>
        <View style={styles.flexEnd}>
          <Subtitle1> Total : {items.pagototal}</Subtitle1>
          <Caption>{`${orderItems.reduce(
            (sumaItems, producto) => sumaItems + producto.cantidad,
            0,
          )} items`}</Caption>
        </View>
      </View>

      <View style={styles.divider}>
        <View style={[styles.circleMask, styles.leftCircle]} />
        <View style={styles.dividerLine} />
        <View style={[styles.circleMask, styles.rightCircle]} />
      </View>

      <View style={styles.pv8}>
        {orderItems.map((item, index) => (
          <View key={index.toString()} style={styles.itemContainer}>
            <TouchableItem onPress={onPress} activeOpacity={activeOpacity}>
              <>
                <View style={styles.item}>
                  <Text style={{ color: '#FE5000', fontWeight: 'bold' }}>{item.nombre}</Text>

                  <Text>
                    cant: {item.cantidad}{' '}
                    {item.descuentoPorcentaje ? (
                      <>
                        <Text>
                          {` $${(((100 - item.descuentoPorcentaje) / 100) * item.precio).toFixed(
                            2,
                          )}`}
                        </Text>
                        <Text
                          style={{
                            textDecorationLine: 'line-through',
                            textDecorationStyle: 'solid',
                          }}
                        >{` $${item.precio.toFixed(2)}`}</Text>
                      </>
                    ) : (
                      <Text>{` $${item.precio.toFixed(2)}`}</Text>
                    )}
                  </Text>
                </View>
                {/* Muestra la lista de ingredientes seleccionados por producto */}
                {item.ingredientes.map((ingrediente, index) => (
                  <View key={index.toString()} style={styles.ingredientes}>
                    <Text>{ingrediente.nombre}</Text>
                    <Text>{` $${ingrediente.precio.toFixed(2)}`}</Text>
                  </View>
                ))}
                {/* Muestra el precio del delivery si es menor a 20 el pago total */}
                {items.pagototal < 20 && (
                  <View key={index.toString()} style={styles.ingredientes}>
                    <Text style={{ fontWeight: 'bold' }}>delivery</Text>
                    <Text style={{ fontWeight: 'bold' }}>$2.00</Text>
                  </View>
                )}
              </>
            </TouchableItem>
          </View>
        ))}
      </View>

      {!orderStatusVerified && (
        <View style={styles.footer}>
          <View>
            <Subtitle2 style={styles.status}>Status</Subtitle2>
            <Subtitle2 style={styles.pending}>Verificando pago</Subtitle2>
          </View>
          <Button
            color={'#66033c22'}
            title="0 Minutos"
            titleColor={Colors.secondaryColor}
            buttonStyle={styles.extraSmallButton}
          />
        </View>
      )}

      {orderStatusVerified && orderStatusDeliveryTime > 0 && !orderStatusDelivered && (
        <View style={styles.footer}>
          <View>
            <Subtitle2 style={styles.status}>Status</Subtitle2>
            <Subtitle2 style={styles.onTheWay}>En camino</Subtitle2>
          </View>
          <Button
            color={'#66033c22'}
            title={orderTime ? `${orderTime} Minutos` : ''}
            titleColor={Colors.secondaryColor}
            buttonStyle={styles.extraSmallButton}
          />
        </View>
      )}

      {orderStatusVerified && orderStatusDelivered && (
        <View style={styles.footer}>
          <View>
            <Subtitle2 style={styles.status}>Status</Subtitle2>
            <Subtitle2 style={styles.delivered}>Entregada</Subtitle2>
          </View>
          <Button
            color={'#66033c22'}
            title="Reordenar"
            titleColor={Colors.secondaryColor}
            buttonStyle={styles.extraSmallButton}
          />
        </View>
      )}
    </View>
  </View>
);

export default OrderItem;
