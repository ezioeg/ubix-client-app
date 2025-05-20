/**
 * Ubix
 *
 * @format
 * @flow
 */

// import dependencies
import React, { Component } from 'react';
import { ImageBackground, StatusBar, StyleSheet, View } from 'react-native';

// import components
import Button from '../../components/buttons/Button';
import { Heading5, Paragraph } from '../../components/text/CustomText';
import LinkButton from '../../components/buttons/LinkButton';
import Logo from '../../components/logo/Logo';
import SafeAreaView from '../../components/SafeAreaView';

// import colors, layout
import Colors from '../../theme/colors';
import Layout from '../../theme/layout';

// WelcomeD Config
const headerImg = require('../../assets/img/salad_1.jpg');

// WelcomeD Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
  },
  headerImg: {
    height: Layout.SCREEN_HEIGHT * 0.48,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000022',
  },
  headerText: {
    fontWeight: '700',
    color: Colors.white,
  },
  footer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -60,
    borderRadius: 52,
    width: 104,
    height: 104,
    backgroundColor: Colors.primaryColor,
  },
  center: {
    alignItems: 'center',
  },
  buttonsGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  customButton: {
    width: 148,
  },
  hspace16: {
    width: 16,
  },
  linkButtonText: {
    color: Colors.onSurface,
  },
});

// WelcomeD
export default class WelcomeD extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  navigateTo = (screen) => () => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  render() {
    return (
      <View style={styles.screenContainer}>
        <ImageBackground source={headerImg} style={styles.headerImg}>
          <View style={styles.overlay}>
            <Heading5 style={styles.headerText}>Bon Appétit</Heading5>
          </View>
        </ImageBackground>

        <View style={styles.footer}>
          <View style={styles.logoContainer}>
            <Logo size={150} tintColor={Colors.white} />
          </View>

          <View style={styles.center}>
            <Paragraph>Ordenar comida. Rapido y Facil</Paragraph>
            <Paragraph>Da el primer bocado y Disfruta!</Paragraph>
          </View>

          <View style={styles.center}>
            <View style={styles.buttonsGroup}>
              <Button
                buttonStyle={styles.customButton}
                onPress={this.navigateTo('SignUp')}
                title={'Regístrate'.toUpperCase()}
              />
              <View style={styles.hspace16} />
              <Button
                buttonStyle={styles.customButton}
                onPress={this.navigateTo('SignIn')}
                title={'Iniciar sesión'.toUpperCase()}
                outlined
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
