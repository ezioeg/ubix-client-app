/**
 * Ubix
 *
 * @format
 * @flow
 */

// Dependencies
import React, { Component } from 'react';
import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';

// Utils
import getImgSource from '../../utils/getImgSource.js';

// Components
import Icon from '../icon/Icon';
import StarRating from '../starrating/StarRating';
import TouchableItem from '../TouchableItem';

// Colors, layout
import Colors from '../../theme/colors';
import Layout from '../../theme/layout';

// Config
const imgHolder = require('../../assets/img/imgholder.png');
const FAVORITE_ICON = Platform.OS === 'ios' ? 'ios-heart' : 'md-heart';

// Styles
const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    marginHorizontal: 6,
    width: Layout.SCREEN_WIDTH / 1.8,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
  },
  borderContainer: {
    borderWidth: Platform.OS === 'ios' ? 1 : 0,
    borderColor: '#dfdfdf',
    borderRadius: 2,
    backgroundColor: Colors.surface,
    elevation: 5,
    overflow: 'hidden',
  },
  productImg: {
    width: '100%',
    height: 132,
    resizeMode: 'cover',
  },
  bottomOverlay: { flex: 1 },
  productFooter: {
    marginTop: -10,
    borderRadius: 2,
    backgroundColor: Colors.whiteSmoke,
  },
  titleContainer: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  title: {
    fontWeight: '500',
    fontSize: 15,
    color: Colors.primaryText,
    letterSpacing: 0.15,
  },
  titleStock: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'red',
    letterSpacing: 0.15,
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
  oldPriceContainer: { marginLeft: 7, paddingTop: 2 },
  oldPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#8e8e8e',
  },
  hr: {
    position: 'absolute',
    top: 13,
    width: '100%',
    height: 1,
    backgroundColor: '#8e8e8e',
  },
  price: {
    fontWeight: '700',
    fontSize: 18,
    color: Colors.primaryColor,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    width: 28,
    height: 28,
    backgroundColor: 'white',
  },

  favoriteBg: {
    backgroundColor: Colors.secondaryColor,
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
    right: -1,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: Colors.tertiaryColor,
  },
  label: {
    fontSize: 14,
    color: Colors.onPrimaryColor,
  },
});

// State
type State = {};

// Props
type Props = {
  activeOpacity: number,
  /**
   * Product image uri
   */
  imageUri: string,
  /**
   * Product name
   */
  title: string,

  /**
   * rating number
   */
  rating: number,

  /**
   * Product price
   */
  price: number,

  /**
   * Product discount percentage
   */
  discountPercentage: number,

  /**
   * Handler to be called when the user taps on product card
   */
  onPress: () => void,

  /**
   * label
   */
  label: 'nuevo',

  /**
   * Favorite indicator
   */
  favorite: boolean,

  /**
   * Handler to be called when the user taps on product favorite icon
   */
  onPressFavorite: () => void,

  stock: boolean,
};

// WideProductCard
export default class WideProductCard extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.heartSize = new Animated.Value(1);
    this.state = {
      liked: false,
    };
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

  like() {
    this.setState({ liked: true });
    Animated.spring(this.heartSize, {
      toValue: 1.1,
      friction: 1,
    }).start();
  }

  unlike() {
    this.setState({ liked: false });
    this.heartSize.setValue(1);
  }

  render() {
    const {
      activeOpacity,
      onPress,
      imageUri,
      title,
      price = 0,
      discountPercentage, // nuevo
      label, // nuevo
      stock, // nuevo
      favorite, // para despues
      rating, // para despues
      onPressFavorite,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.borderContainer}>
          <TouchableItem activeOpacity={activeOpacity} onPress={onPress} borderless useForeground>
            <View>
              <ImageBackground
                defaultSource={imgHolder}
                source={imageUri ? getImgSource(imageUri) : null} // Repara el error de source:uri should not be empty string
                style={styles.productImg}
              ></ImageBackground>

              <View style={styles.productFooter}>
                <View style={styles.titleContainer}>
                  <Text numberOfLines={1} style={styles.title}>
                    {title}
                  </Text>
                  {!stock && (
                    <Text numberOfLines={1} style={styles.titleStock}>
                      Agotado
                    </Text>
                  )}

                  {/* <StarRating rating={rating} starSize={15} /> */}
                </View>

                <View style={styles.priceContainer}>
                  {discountPercentage ? (
                    <View style={styles.priceGroup}>
                      <Text style={styles.price}>
                        {`$ ${(((100 - discountPercentage) / 100) * price).toFixed(2)}`}
                      </Text>
                      <View style={styles.oldPriceContainer}>
                        <Text style={styles.oldPrice}>{`$ ${price.toFixed(2)}`}</Text>
                        <View style={styles.hr} />
                      </View>
                    </View>
                  ) : (
                    <Text style={styles.price}>{`$ ${price.toFixed(2)}`}</Text>
                  )}
                  <TouchableOpacity
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    activeOpacity={0.7}
                    onPress={() => (this.state.liked ? this.unlike() : this.like())}
                    style={styles.iconContainer}
                  >
                    {/* <Animated.View style={{ transform: [{ scale: this.heartSize }] }}> */}
                    <Icon
                      name={
                        (Platform.OS === 'ios' ? 'ios-heart' : 'md-heart') +
                        (this.state.liked ? '' : '-outline')
                      }
                      size={32}
                      color="#CB4154"
                    />
                    {/* </Animated.View> */}
                  </TouchableOpacity>
                </View>
              </View>

              {this.renderLabel(label, discountPercentage)}
            </View>
          </TouchableItem>
        </View>
      </View>
    );
  }
}
