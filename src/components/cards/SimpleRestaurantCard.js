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
} from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';

// Utils
import getImgSource from '../../utils/getImgSource.js';
import FastImage from 'react-native-fast-image';

// Components
import Icon from '../icon/Icon';
import { Subtitle1, Subtitle2 } from '../text/CustomText';
import TouchableItem from '../TouchableItem';

// import colors, layout
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
  cardBack: {},
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
    // backgroundColor: 'red',
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
  openTag: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#3CB371',
  },
  closeTag: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'red',
  },
  firstLine: {
    flexDirection: 'column',
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
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    borderRadius: 14,
    width: 28,
    height: 28,
    backgroundColor: '#cacaca',
  },
  newLabelContainer: {
    position: 'absolute',
    top: 14,
    left: -1,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: Colors.primaryColor,
  },
  discountLabelContainer: {
    position: 'absolute',
    top: 14,
    right: 1,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: Colors.tertiaryColor,
  },
  label: {
    fontSize: 13,
    color: Colors.onPrimaryColor,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderRadius: 1,
    borderColor: '#eaeaea',
    marginHorizontal: 12,
    paddingVertical: 10,
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
  swipeoutDisabled: boolean,
  swipeoutOnPressRemove: () => {},
  discountPercentage: number,
  label: 'nuevo',
  abierto: boolean,
  apertura: string,
  cierre: string,
};

// SimpleProductCard DeleteButton
const DeleteButton = ({ onPress }) => (
  <View style={styles.deleteButtonContainer}>
    <TouchableItem onPress={onPress} style={styles.deleteButton}>
      <Icon name={DELETE_ICON} size={26} color={Colors.error} />
    </TouchableItem>
  </View>
);

// SimpleProductCard
export default class SimpleProductCard extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderLabel = (label, discountPercentage) => {
    if (label === 'new') {
      return (
        <View style={styles.newLabelContainer}>
          <Text style={styles.label}>NUEVO</Text>
        </View>
      );
    }
    if (discountPercentage) {
      return (
        // {`- ${discountPercentage}%`}
        <View style={styles.discountLabelContainer}>
          <Text style={styles.label}>{`- ${discountPercentage}%`}</Text>
        </View>
      );
    }

    return <View />;
  };

  onPressAdd = () => {
    const { onPressAdd = () => {} } = this.props;
    onPressAdd();
  };

  onPressRemove = () => {
    const { onPressRemove = () => {} } = this.props;
    onPressRemove();
  };

  render() {
    const {
      activeOpacity,
      onPress,
      imageUri,
      title,
      description,
      discountPercentage, // nuevo
      label, // nuevo
      abierto, // nuevo
      swipeoutDisabled,
      swipeoutOnPressRemove,
      apertura,
      cierre,
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
                  <Subtitle2 numberOfLines={3} style={styles.descriptionText}>
                    {description}
                  </Subtitle2>
                </View>

                <Subtitle2 numberOfLines={3} style={styles.descriptionText}>
                  Horario:
                  {apertura >= '12:00' ? (
                    <Text>
                      {apertura} pm - {cierre} pm
                    </Text>
                  ) : (
                    <Text>
                      {apertura} am - {cierre} pm
                    </Text>
                  )}
                </Subtitle2>

                <View style={styles.secondLine}>
                  <Subtitle2 numberOfLines={3} style={styles.descriptionText}>
                    {abierto ? (
                      <Subtitle1 numberOfLines={1} style={styles.openTag}>
                        Abierto
                      </Subtitle1>
                    ) : (
                      <Subtitle1 numberOfLines={1} style={styles.closeTag}>
                        Cerrado
                      </Subtitle1>
                    )}
                  </Subtitle2>
                </View>
              </View>
              {this.renderLabel(label, discountPercentage)}
            </View>
          </TouchableItem>
        </View>
      </SwipeRow>
    );
  }
}
