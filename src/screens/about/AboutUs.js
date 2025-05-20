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
  ImageBackground,
  Linking,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';

// Components
import Avatar from '../../components/avatar/Avatar';
// import GradientContainer from '../../components/gradientcontainer/GradientContainer';
import { Caption, Heading5, Subtitle1, Subtitle2 } from '../../components/text/CustomText';
import TouchableItem from '../../components/TouchableItem';

// Colors
import Colors from '../../theme/colors';

// Config
const isRTL = I18nManager.isRTL;
const FACEBOOK_ICON = 'facebook';
const INSTAGRAM_ICON = 'instagram';
const YELP_ICON = 'yelp';
const OVERLAY_COLOR = 'rgba(185, 0, 57, 0.4)';
const AVATAR_SIZE = 54;

// Styles
const styles = StyleSheet.create({
  pb6: { paddingBottom: 6 },
  pl8: { paddingLeft: 8 },
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 16,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  swiperContainer: {
    width: '100%',
    height: 252,
  },
  paginationStyle: {
    bottom: 14,
    transform: [{ scaleX: isRTL ? -1 : 1 }],
  },
  dot: { backgroundColor: Colors.white, opacity: 0.3 },
  activeDot: { backgroundColor: Colors.white },
  bgImg: {
    flex: 1,
    resizeMode: 'cover',
  },
  swiperContent: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 16,
  },
  avatarWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: AVATAR_SIZE + 2,
    height: AVATAR_SIZE + 2,
    borderRadius: (AVATAR_SIZE + 4) / 2,
    backgroundColor: Colors.white,
  },
  info: {
    fontWeight: '500',
  },
  infoText: {
    color: Colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 4,
    textAlign: 'left',
  },
  caption: {
    color: Colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 4,
    textAlign: 'left',
  },
  description: {
    maxWidth: '80%',
  },
  phone: {
    marginTop: 8,
    color: Colors.primaryColor,
  },
  social: {
    flexDirection: 'row',
    marginTop: 8,
    fontWeight: '500',
    marginBottom: 20,
  },
  socialButton: {
    margin: 8,
    borderRadius: 22,
    backgroundColor: Colors.primaryColor,
  },
  socialIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    height: 44,
  },
  footer: {
    width: '100%',
    backgroundColor: Colors.background,
  },
  footerButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 52,
  },
  footerButtonText: {
    fontWeight: '500',
    color: Colors.primaryColor,
  },
});

// AboutUs
export default class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  callPhone = () => {
    Linking.openURL(`tel:${1601234567}`);
  };

  render() {
    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />

        <View style={styles.content}>
          <View style={styles.swiperContainer}>
            <Swiper
              loop={false}
              index={isRTL ? 2 : 0} // number of slides - 1
              paginationStyle={styles.paginationStyle}
              activeDotStyle={styles.activeDot}
              dotStyle={styles.dot}
            >
              <ImageBackground
                source={require('../../assets/img/comida_1.jpg')}
                style={styles.bgImg}
              >
                <View style={styles.swiperContent}>
                  <View style={styles.row}>
                    <View style={styles.avatarWrapper}>
                      <Avatar
                        imageUri={require('../../assets/img/profile_1.jpeg')}
                        size={AVATAR_SIZE}
                        rounded
                      />
                    </View>
                    <View style={styles.pl8}>
                      <Subtitle1 style={[styles.info, styles.infoText]}>UBIX</Subtitle1>
                      <Caption style={styles.caption}>Concepto</Caption>
                    </View>
                  </View>

                  <View style={styles.description}>
                    <Subtitle1 style={styles.infoText}>Descripción</Subtitle1>
                  </View>
                </View>
              </ImageBackground>

              <ImageBackground
                source={require('../../assets/img/comida_2.jpg')}
                style={styles.bgImg}
              >
                <View style={styles.swiperContent}>
                  <View style={styles.description}>
                    <Subtitle1 style={styles.infoText}>
                      Comida deliciosa en la puerta de tu casa.
                    </Subtitle1>
                  </View>
                </View>
              </ImageBackground>

              <ImageBackground
                source={require('../../assets/img/comida_3.jpg')}
                style={styles.bgImg}
              >
                <View style={styles.swiperContent}>
                  <View style={styles.row}>
                    <View>
                      <Caption style={[styles.caption, styles.pb6]}>DIRECCION</Caption>
                      <Subtitle1 style={[styles.info, styles.infoText]}>
                        384 K Las Vegas Blvd,
                      </Subtitle1>
                      <Subtitle1 style={[styles.info, styles.infoText]}>
                        Las Vegas, MS 85701
                      </Subtitle1>
                    </View>
                  </View>
                  <View style={styles.description}>
                    <Subtitle1 style={styles.infoText}>
                      Mas que un equipo somos una familia.
                    </Subtitle1>
                  </View>
                </View>
              </ImageBackground>
            </Swiper>
          </View>

          <View style={styles.center}>
            <Subtitle2>LLAMANOS</Subtitle2>
            <Heading5 style={styles.phone} onPress={this.callPhone}>
              0412-3795205
            </Heading5>
          </View>

          <View style={styles.center}>
            <Subtitle2>SIGUENOS</Subtitle2>
            <View style={styles.social}>
              <View style={styles.socialButton}>
                <TouchableItem rippleColor={Colors.white} borderless>
                  <View style={styles.socialIconContainer}>
                    <FAIcon name={FACEBOOK_ICON} size={20} color={Colors.white} />
                  </View>
                </TouchableItem>
              </View>

              <View style={styles.socialButton}>
                <TouchableItem rippleColor={Colors.white} borderless>
                  <View style={styles.socialIconContainer}>
                    <FAIcon name={INSTAGRAM_ICON} size={22} color={Colors.white} />
                  </View>
                </TouchableItem>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableItem>
            <View style={styles.footerButton}>
              <Text style={styles.footerButtonText}>www.ubix.com</Text>
            </View>
          </TouchableItem>
        </View>
      </SafeAreaView>
    );
  }
}
