/**
 * Ubix
 *
 * @format
 * @flow
 */

// Dependencies
import React, { useState, useContext, useEffect } from 'react';
import {
  Alert,
  I18nManager,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  View,
} from 'react-native';

import { GoogleSignin } from 'react-native-google-signin';

// Components
import Avatar from '../../components/avatar/Avatar';
import Divider from '../../components/divider/Divider';
import Icon from '../../components/icon/Icon';
import { Heading6, Subtitle1, Subtitle2 } from '../../components/text/CustomText';
import TouchableItem from '../../components/TouchableItem';

// Colors
import Colors from '../../theme/colors';

// Firebase for auth
import firebase from '../../../firebase';
// Context for get current the user
import FirebaseContext from '../../../context/firebase/firebaseContext';

// Config
const isRTL = I18nManager.isRTL;
const IOS = Platform.OS === 'ios';
const DIVIDER_MARGIN_LEFT = 60;
const ARROW_ICON = 'ios-arrow-forward';
const ADDRESS_ICON = IOS ? 'ios-pin' : 'md-pin';
const NOTIFICATION_OFF_ICON = IOS ? 'ios-notifications-off' : 'md-notifications-off';
const NOTIFICATION_ICON = IOS ? 'ios-notifications' : 'md-notifications';
const PAYMENT_ICON = IOS ? 'ios-card' : 'md-card';
const FAVORITES_ICON = IOS ? 'ios-list' : 'md-star';
const TERMS_ICON = IOS ? 'reader-outline' : 'md-paper';
const ABOUT_ICON = IOS ? 'ios-information-circle-outline' : 'md-information-circle-outline';
const LOGOUT_ICON = IOS ? 'ios-log-out' : 'md-log-out';
const LOGIN_ICON = IOS ? 'ios-log-in' : 'md-log-in';

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainerStyle: {
    paddingBottom: 16,
  },
  titleContainer: {
    paddingHorizontal: 16,
  },
  titleText: {
    paddingTop: 25,
    paddingBottom: 15,
    fontWeight: '700',
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  profileContainer: {
    paddingVertical: 16,
  },
  leftSide: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileInfo: {
    paddingLeft: 16,
  },
  name: {
    fontWeight: '500',
    textAlign: 'left',
  },
  email: {
    paddingVertical: 2,
  },
  mediumText: {
    fontWeight: '500',
  },
  setting: {
    height: 56,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    width: 28,
    height: 28,
  },
  extraDataContainer: {
    top: -8,
    marginLeft: DIVIDER_MARGIN_LEFT,
    paddingBottom: 8,
  },
  extraData: {
    textAlign: 'left',
  },
  logout: { color: Colors.secondaryColor },
});

// Props
type Props = {
  icon: string,
  title: String,
  onPress: () => {},
  extraData: React.Node,
};

// Components
const Setting = ({ icon, title, onPress, extraData }: Props) => (
  <TouchableItem onPress={onPress}>
    <View>
      <View style={[styles.row, styles.setting]}>
        <View style={styles.leftSide}>
          {icon !== undefined && (
            <View style={styles.iconContainer}>
              <Icon name={icon} size={24} color={Colors.primaryColor} />
            </View>
          )}
          <Subtitle1 style={styles.mediumText}>{title}</Subtitle1>
        </View>

        <View style={isRTL && { transform: [{ scaleX: -1 }] }}>
          <Icon name={ARROW_ICON} size={16} color="rgba(0, 0, 0, 0.16)" />
        </View>
      </View>

      {extraData ? <View style={styles.extraDataContainer}>{extraData}</View> : <View />}
    </View>
  </TouchableItem>
);

// SetingsA
const SettingsA = ({ navigation, props }) => {
  const [notificationsOn, setNotificationsOn] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const {
    usuarioinfo,
    obtenerUsuarioInfo,
    usuarioinfofirestore,
    obtenerUsuarioInfoFirestore,
  } = useContext(FirebaseContext);

  useEffect(() => {
    try {
      firebase.auth.onAuthStateChanged((user) => {
        user ? setLoggedIn(true) : setLoggedIn(false);
      });
    } catch (error) {
      // console.log('error mamerto:', error);
    }

    obtenerUsuarioInfo();
    obtenerUsuarioInfoFirestore();
  }, []);

  const logout = async () => {
    Alert.alert(
      'Cerrar sesión',
      'Estas seguro que deseas cerrar sesión?',
      [
        { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => await firebase.auth.signOut(),
        },
      ],
      { cancelable: false },
    );
  };

  const avisoInicioSesion = () => {
    Alert.alert(
      'Aviso inicio de sesión',
      'Para utilizar esta función debe iniciar sesión',
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

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar backgroundColor="white" barStyle="dark-content" /> */}

      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.titleContainer}>
          <Heading6 style={styles.titleText}>Configuraciones</Heading6>
        </View>
        {isLoggedIn ? (
          <>
            <TouchableItem
              useForeground
              onPress={() => (usuarioinfo.photoURL ? '' : navigation.navigate('EditProfile'))}
            >
              <View style={[styles.row, styles.profileContainer]}>
                <View style={styles.leftSide}>
                  {usuarioinfo.photoURL ? (
                    <Avatar
                      imageUri={
                        usuarioinfo.photoURL
                        // ? usuarioinfo.photoURL
                        // : require('../../assets/img/profile_1.jpeg')
                      }
                      rounded
                      size={60}
                    />
                  ) : (
                    <Avatar
                      imageUri={
                        usuarioinfofirestore.avatar
                          ? usuarioinfofirestore.avatar
                          : require('../../assets/img/profile_1.jpeg')
                      }
                      rounded
                      size={60}
                    />
                  )}

                  <View style={styles.profileInfo}>
                    <Subtitle1 style={styles.name}>
                      {usuarioinfofirestore.nombre
                        ? usuarioinfofirestore.nombre
                        : usuarioinfo.displayName}
                    </Subtitle1>
                    <Subtitle2 style={styles.email}>
                      {usuarioinfofirestore.email ? usuarioinfofirestore.email : usuarioinfo.email}
                    </Subtitle2>
                  </View>
                </View>
              </View>
            </TouchableItem>

            <Divider />

            <Setting
              onPress={() => navigation.navigate('DeliveryAddress')}
              icon={ADDRESS_ICON}
              title="Dirección de entrega"
              // extraData={
              //   <View>
              //     <Subtitle2 style={styles.extraData}>1600 Pennsylvania Avenue</Subtitle2>
              //     <Subtitle2 style={styles.extraData}>Washington DC, USA</Subtitle2>
              //   </View>
              // }
            />

            <Divider type="inset" marginLeft={DIVIDER_MARGIN_LEFT} />

            <Setting
              onPress={() => navigation.navigate('Favorites')}
              icon={FAVORITES_ICON}
              title="Mis favoritos"
            />
          </>
        ) : (
          <>
            <TouchableItem useForeground onPress={() => avisoInicioSesion()}>
              <View style={[styles.row, styles.profileContainer]}>
                <View style={styles.leftSide}>
                  <Avatar imageUri={require('../../assets/img/profile_1.jpeg')} rounded size={60} />

                  <View style={styles.profileInfo}>
                    <Subtitle1 style={styles.name}>Usuario Invitado</Subtitle1>
                    <Subtitle2 style={styles.email}>usuarioinvitado@xmail.com</Subtitle2>
                  </View>
                </View>
              </View>
            </TouchableItem>

            <Divider />

            <Setting
              onPress={() => avisoInicioSesion()}
              icon={ADDRESS_ICON}
              title="Dirección de entrega"
            />

            <Divider type="inset" marginLeft={DIVIDER_MARGIN_LEFT} />

            <Setting
              onPress={() => avisoInicioSesion()}
              icon={FAVORITES_ICON}
              title="Mis favoritos"
            />
          </>
        )}

        <Divider type="inset" marginLeft={DIVIDER_MARGIN_LEFT} />

        <Setting
          onPress={() => navigation.navigate('TermsConditions')}
          icon={TERMS_ICON}
          title="Términos y Condiciones"
        />
        <Divider type="inset" marginLeft={DIVIDER_MARGIN_LEFT} />

        <Setting
          onPress={() => navigation.navigate('PoliticasPrivacidad')}
          icon={TERMS_ICON}
          title="Política de Privacidad"
        />
        <Divider type="inset" marginLeft={DIVIDER_MARGIN_LEFT} />

        <Setting
          onPress={() => navigation.navigate('AboutUs')}
          icon={ABOUT_ICON}
          title="Acerca de"
        />
        <Divider type="inset" marginLeft={DIVIDER_MARGIN_LEFT} />

        {isLoggedIn ? (
          <TouchableItem onPress={logout}>
            <View style={[styles.row, styles.setting]}>
              <View style={styles.leftSide}>
                <View style={styles.iconContainer}>
                  <Icon name={LOGOUT_ICON} size={24} color={Colors.secondaryColor} />
                </View>
                <Subtitle1 style={[styles.logout, styles.mediumText]}>Cerrar sesión</Subtitle1>
              </View>
            </View>
          </TouchableItem>
        ) : (
          <TouchableItem onPress={() => navigation.navigate('Welcome')}>
            <View style={[styles.row, styles.setting]}>
              <View style={styles.leftSide}>
                <View style={styles.iconContainer}>
                  <Icon name={LOGIN_ICON} size={24} color={Colors.secondaryColor} />
                </View>
                <Subtitle1 style={[styles.logout, styles.mediumText]}>Iniciar sesión</Subtitle1>
              </View>
            </View>
          </TouchableItem>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
export default SettingsA;
