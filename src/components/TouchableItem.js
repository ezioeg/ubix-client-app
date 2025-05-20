/**
 * Ubix
 *
 * @format
 * @flow
 *
 * TouchableItem renders a touchable that looks native on both iOS and Android
 *
 * It provides an abstraction on top of TouchableNativeFeedback and
 * TouchableOpacity
 */

// import dependencies
import React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  TouchableHighlight,
} from 'react-native';

// TouchableItem config
const ANDROID_VERSION_LOLLIPOP = 21;

// TouchableItem
const TouchableItem = (props) => {
  /**
   * TouchableNativeFeedback.Ripple causes a crash on old Android versions,
   * therefore only enable it on Android Lollipop and above
   *
   * We need to pass the background prop to specify a borderless ripple effect
   */
  if (Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_LOLLIPOP) {
    const { borderless = false, rippleColor = '#66033c11', children, style, ...rest } = props;
    return (
      <TouchableNativeFeedback
        {...rest}
        style={null}
        background={TouchableNativeFeedback.Ripple(rippleColor, borderless)}
        delayPressIn={0} // Arregla delay de efecto cuando se presiona boton
        // delayPressOut={0}
      >
        <View style={style}>{React.Children.only(children)}</View>
      </TouchableNativeFeedback>
    );
  }

  const { children } = props;
  return (
    <TouchableOpacity activeOpacity={0.85} {...props}>
      {children}
    </TouchableOpacity>
  );
};

export default TouchableItem;
