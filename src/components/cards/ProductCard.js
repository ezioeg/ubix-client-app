/**
 * Ubix
 *
 * @format
 * @flow
 */

// Dependencies
import React, { Component } from 'react';
import {
  I18nManager,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';

import { SwipeRow } from 'react-native-swipe-list-view';

// Utils
import getImgSource from '../../utils/getImgSource.js';
import FastImage from 'react-native-fast-image';

// Components
import Icon from '../icon/Icon';
import { Subtitle1, Subtitle2 } from '../text/CustomText';
import TouchableItem from '../TouchableItem';

// Colors, layout
import Colors from '../../theme/colors';
import Layout from '../../theme/layout';

// Config
const isRTL = I18nManager.isRTL;
const IOS = Platform.OS === 'ios';
const ITEM_WIDTH = Layout.SCREEN_WIDTH;

const MINUS_ICON = IOS ? 'ios-remove' : 'md-remove';
const PLUS_ICON = IOS ? 'ios-add' : 'md-add';
const DELETE_ICON = IOS ? 'ios-close' : 'md-close';

const imgHolder = require('../../assets/img/imgholder.png');

// Styles
const styles = StyleSheet.create({
  cardBack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 4,
    marginHorizontal: 6,
    backgroundColor: '#cd040b22',
    borderRadius: 20,
  },
  deleteButtonContainer: {
    width: 88,
    overflow: 'hidden',
  },
  deleteButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bg: {
    backgroundColor: Colors.whiteSmoke,
    borderRadius: 20,
    marginVertical: 4,
    marginHorizontal: 6,
    elevation: 5,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: ITEM_WIDTH,
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  imageContainer: {
    marginRight: 16,
  },
  image: {
    width: 98,
    height: 82,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    flex: 1,
    fontWeight: '700',
    color: Colors.primaryText,
    textAlign: 'left',
  },
  firstLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  secondLine: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  thirdLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  descriptionText: {
    flex: 1,
    lineHeight: 20,
    color: Colors.secondaryText,
    textAlign: 'left',
  },
  descriptionText2: {
    flex: 1,
    lineHeight: 20,
    color: '#FE5000',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  priceText: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.primaryColor,
    textAlign: 'left',
  },
  amountButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  quantity: {
    top: -1,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Colors.black,
    textAlign: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    borderRadius: 14,
    width: 28,
    height: 28,
    backgroundColor: '#cacaca',
  },
  priceGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  oldPriceContainer: { marginLeft: 7 },
  oldPrice: {
    fontSize: 16,
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
  price: {
    fontWeight: '700',
    fontSize: 15,
    color: Colors.primaryColor,
  },
  ingredienteContainer: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  ingrediente: {
    paddingRight: 10,
  },
});

// State
type State = {};

// Props
type Props = {
  onPress: () => {},
  onPressRemove: () => void,
  onPressAdd: () => void,
  activeOpacity: number,
  imageUri: string,
  title: string,
  description: string,
  price: number,
  quantity: number,
  swipeoutDisabled: boolean,
  swipeoutOnPressRemove: () => {},
  discountPercentage: number,
  label: 'nuevo',
};

// ProductCard DeleteButton
const DeleteButton = ({ onPress }) => (
  <View style={styles.deleteButtonContainer}>
    <TouchableItem onPress={onPress} style={styles.deleteButton}>
      <Icon name={DELETE_ICON} size={26} color={Colors.error} />
    </TouchableItem>
  </View>
);

// ProductCard
export default class ProductCard extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = { showIgredientes: false };
  }

  onPressAdd = () => {
    const { onPressAdd = () => {} } = this.props;
    onPressAdd();
  };

  onPressRemove = () => {
    const { onPressRemove = () => {} } = this.props;
    onPressRemove();
  };

  showIngredientes = () => {
    this.setState({ showIgredientes: !this.state.showIgredientes });
  };

  render() {
    const {
      activeOpacity,
      onPress,
      imageUri,
      title,
      description,
      price = 0,
      quantity = 0,
      discountPercentage, // nuevo
      label, // nuevo
      swipeoutDisabled,
      swipeoutOnPressRemove,
      ingredientes,
    } = this.props;

    return (
      <SwipeRow
        disableLeftSwipe={isRTL ? true : swipeoutDisabled}
        disableRightSwipe={isRTL ? swipeoutDisabled : true}
        directionalDistanceChangeThreshold={16}
        rightOpenValue={isRTL ? 0 : -88}
        leftOpenValue={isRTL ? 88 : 0}
      >
        <View style={styles.cardBack}>
          <DeleteButton onPress={swipeoutOnPressRemove} />
        </View>

        {/** FIX ME:
         * extra View was added because of iOS ToucableOpacity bug
         */}
        <View style={styles.bg}>
          <TouchableItem onPress={onPress} activeOpacity={activeOpacity} useForeground>
            <View style={styles.container}>
              <View style={styles.imageContainer}>
                <FastImage
                  defaultSource={imgHolder}
                  source={imageUri ? getImgSource(imageUri) : null}
                  style={[styles.image]}
                />
              </View>

              <View style={styles.textContainer}>
                <View style={styles.firstLine}>
                  <Subtitle1 numberOfLines={1} style={styles.title}>
                    {title}
                  </Subtitle1>
                </View>

                {ingredientes ? (
                  !this.state.showIgredientes ? (
                    <Subtitle2 onPress={this.showIngredientes} style={styles.descriptionText2}>
                      Ver ingredientes
                    </Subtitle2>
                  ) : (
                    <>
                      <Text onPress={this.showIngredientes} style={styles.descriptionText2}>
                        Ocultar ingredientes
                      </Text>
                      {/* Solo muestra los ingredientes seleccionados por el cliente */}
                      <FlatList
                        data={ingredientes}
                        renderItem={({ item }) => (
                          <View style={styles.ingredienteContainer}>
                            <Text style={styles.ingrediente}>{item.nombre}</Text>
                            <Text style={styles.ingrediente}>${item.precio}</Text>
                          </View>
                        )}
                        keyExtractor={(item) => item.nombre}
                      />
                    </>
                  )
                ) : (
                  <View style={styles.secondLine}>
                    <Subtitle2 numberOfLines={3} style={styles.descriptionText}>
                      {description}
                    </Subtitle2>
                  </View>
                )}

                {discountPercentage ? (
                  <View style={styles.thirdLine}>
                    <Text style={styles.priceText}>
                      {`$ ${(((100 - discountPercentage) / 100) * price).toFixed(2)}`}
                    </Text>
                    <View style={styles.oldPriceContainer}>
                      <Text style={styles.oldPrice}>{`$ ${price.toFixed(2)}`}</Text>
                      <View style={styles.hr} />
                    </View>
                    <Text style={styles.quantity}>Cantidad {quantity}</Text>
                  </View>
                ) : (
                  <View style={styles.thirdLine}>
                    <Text style={styles.priceText}>{`$ ${price.toFixed(2)}`}</Text>
                    <Text style={styles.quantity}>Cantidad {quantity}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableItem>
        </View>
      </SwipeRow>
    );
  }
}
