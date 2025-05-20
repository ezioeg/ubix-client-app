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
  View,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import getImgSource from '../../utils/getImgSource.js';
import FastImage from 'react-native-fast-image';

// Components
import Icon from '../icon/Icon';
import TouchableItem from '../TouchableItem';

// Colors
import Colors from '../../theme/colors';

// RestaurantCard Config
const imgHolder = require('../../assets/img/imgholder.png');
const IOS = Platform.OS === 'ios';
const STAR_ICON = IOS ? 'ios-star' : 'md-star';

// Styles
const styles = StyleSheet.create({
  container: {
    // width: 320,
    flex: 1,
    backgroundColor: Colors.whiteSmoke,
    marginBottom: 10,
    padding: 10,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 5,
  },
  image: {
    height: 170,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 16,
    marginTop: 10,
  },
  description: {
    color: '#999',
    marginTop: 5,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    bottom: 15,
  },
  tag: {
    backgroundColor: '#eee',
    marginTop: 10,
    marginRight: 10,
    padding: 5,
  },
  openTag: {
    // position: 'absolute',
    // right: 10,
    // top: 15,
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3CB371',
  },
  closeTag: {
    // position: 'absolute',
    // right: 10,
    // top: 15,
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },

  available: { flexDirection: 'row', justifyContent: 'space-between' },
});

// State
type State = {};

// Props
type Props = {
  activeOpacity: number,

  /**
   * cuisines
   */
  cuisines: string,

  /**
   * Restaurant image uri
   */
  imageUri: string,

  /**
   * Restaurant name
   */
  name: string,

  /**
   * star rating number
   */
  rating: number,

  /**
   * Handler to be called when the user taps on Restaurant card
   */
  onPress: () => void,

  open: boolean,
};

// RestaurantCard
export default class RestaurantCard extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.heartSize = new Animated.Value(1);
    this.state = {
      liked: false,
    };
  }

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
    const { activeOpacity, onPress, imageUri, name, rating, price, cuisines, open } = this.props;

    return (
      <View>
        {/* <TouchableOpacity activeOpacity={0.7} onPress={onPress}> borderless */}
        <TouchableItem
          activeOpacity={activeOpacity}
          style={styles.container}
          onPress={onPress}
          useForeground
        >
          <View>
            {/* <View style={styles.container}> */}
            <View>
              <FastImage
                style={styles.image}
                source={imageUri ? getImgSource(imageUri) : imgHolder}
              />
              {/* {open ? (
                <Text style={styles.openTag}>Abierto</Text>
              ) : (
                <Text style={styles.closeTag}>Cerrado</Text>
              )} */}
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
            <View style={styles.available}>
              <Text style={styles.title}>{name} </Text>

              {open ? (
                <Text style={styles.openTag}>Abierto</Text>
              ) : (
                <Text style={styles.closeTag}>Cerrado</Text>
              )}
            </View>

            <Text numberOfLines={1} style={styles.description}>
              {' '}
              {cuisines}
            </Text>
            <View style={styles.tagContainer}>
              <Text style={styles.tag}>35-45 min</Text>

              <Text style={styles.tag}>
                <Text>4.6 </Text>
                <Icon name={STAR_ICON} size={17} color={Colors.secondaryColor} />
              </Text>
            </View>
          </View>
          {/* </View> */}
        </TouchableItem>
        {/* </TouchableOpacity> */}
      </View>
    );
  }
}
