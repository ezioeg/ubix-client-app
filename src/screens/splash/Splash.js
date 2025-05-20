import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';

var { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FE5000',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 190,
    height: 190,
  },
  title: {
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    fontSize: 18,
    width: 400,
    marginTop: 10,
  },
});

export default class Splash extends Component {
  state = {
    logoOpacity: new Animated.Value(0),
    titleMarginTop: new Animated.Value(50),
  };
  componentDidMount() {
    //Add animations here
    Animated.sequence([
      //animations by sequence
      Animated.timing(this.state.logoOpacity, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true, // Corrige error de useNativeDriver
      }),
    ]).start();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar hidden />
        <View style={styles.centerContent}>
          <Animated.Image
            source={require('../../assets/img/splash.png')}
            style={{
              ...styles.logo,
              opacity: this.state.logoOpacity,
            }}
          />
          {/* <Animated.Text style={{ ...styles.title, marginTop: this.state.titleMarginTop }}>
            Ubix cliente
          </Animated.Text> */}
        </View>
      </SafeAreaView>
    );
  }
}
