/**
 * Ubix
 *
 * @format
 * @flow
 */

// Dependencies
import React, { Component } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-easy-toast';

// Components
import Button from '../../components/buttons/Button';
import UnderlinePasswordInput from '../../components/textinputs/UnderlinePasswordInput';
import UnderlineTextInput from '../../components/textinputs/UnderlineTextInput';
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';

// Colors and layout
import Colors from '../../theme/colors';
import Layout from '../../theme/layout';

//Email validation
import { validateEmail } from '../../utils/Validation';

// Facebook and Google Login APIs
// import { LoginManager, AccessToken } from 'react-native-fbsdk';
// import { GoogleSignin, statusCodes } from 'react-native-google-signin';

// Firebase for auth
import firebase from '../../../firebase';
// Direct firebase use
import fire from '@react-native-firebase/app'; // import fire from 'firebase/app';

// Config
const PLACEHOLDER_TEXT_COLOR = 'rgba(0, 0, 0, 0.4)';
const INPUT_TEXT_COLOR = 'rgba(0, 0, 0, 0.87)';
const INPUT_BORDER_COLOR = 'rgba(0, 0, 0, 0.2)';
const INPUT_FOCUSED_BORDER_COLOR = '#000';
const BUTTON_HEIGHT = 48;
const BUTTON_BORDER_RADIUS = 4;

// Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainerStyle: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  form: {
    paddingHorizontal: Layout.LARGE_PADDING,
  },
  inputContainer: { marginBottom: 7 },
  buttonContainer: { paddingTop: 23 },
  buttonsGroup: {
    paddingTop: 23,
  },
  vSpacer: {
    height: 15,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: '100%',
  },
  termsContainer: {
    flexDirection: 'row',
  },
  footerText: {
    fontWeight: '300',
    fontSize: 13,
    color: Colors.primaryText,
  },
  footerLink: {
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
  btnRegister: {
    color: '#FE5000',
    fontWeight: 'bold',
  },
  btnForgotPassword: {
    color: '#FE5000',
    fontWeight: 'bold',
  },
  social_box: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
    marginRight: 10,
  },
  image_box_social_facebook: {
    height: 30,
    width: 30,
  },
  image_box_social_google: {
    height: 50,
    width: 50,
  },
});

// SignInA
export default class SignInA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailFocused: false,
      password: '',
      passwordFocused: false,
      secureTextEntry: true,
      modalVisible: false,
    };
  }

  // componentDidMount() {
  //   GoogleSignin.configure({
  //     // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  //     webClientId: '1032526930554-jo5vrorq5lk0rkpg9bperor3vhf891a2.apps.googleusercontent.com',
  //     offlineAccess: true,
  //     hostedDomain: '',
  //     forceConsentPrompt: true,
  //   });
  // }

  // Login con firebase
  signInUser = async (email, password) => {
    if (!email || !password) {
      this.refs.toast.show('Todos los campos son obligatorios');
      return;
    }
    if (!validateEmail(email)) {
      this.refs.toast.show('El email no es correcto');
      return;
    }
    this.setState({
      modalVisible: true,
    });

    await firebase.auth.signInWithEmailAndPassword(email, password).catch(() => {
      this.refs.toast.show('Email o contraseña incorrecta');
    });

    this.setState({
      modalVisible: false,
    });
  };

  // Login con facebook y firebase
  // facebookLogin = () => {
  //   //Se envia una solicitud para utilizar el login de facebook
  //   LoginManager.logInWithPermissions(['public_profile', 'email'])
  //     .then((result) => {
  //       // Si se cancela la solicitud
  //       if (result.isCancelled) {
  //         return Promise.reject(new Error('Inicio de sesión cancelado'));
  //       }
  //       // Si la solicitud es exitosa
  //       // console.log(
  //       //   `Inicio de sesión exitoso con permisos: ${result.grantedPermissions.toString()}`,
  //       // );
  //       // Se obtiene el token de acceso
  //       return AccessToken.getCurrentAccessToken();
  //     })
  //     .then((data) => {
  //       this.setState({
  //         modalVisible: true,
  //       });
  //       // Creamos un credencial con el token de acceso de facebook
  //       const credential = fire.auth.FacebookAuthProvider.credential(data.accessToken);
  //       // Con el credencial se autentifica en firebase el inicio de sesion
  //       return fire.auth().signInWithCredential(credential);
  //     })
  //     .then((currentUser) => {
  //       // console.log(currentUser);
  //       this.setState({
  //         modalVisible: false,
  //       });
  //     })
  //     .catch((error) => {
  //       this.setState({
  //         modalVisible: false,
  //       });
  //       // console.log(`Error de inicio de sesión de Facebook: ${error}`);
  //       this.refs.toast.show('Error de inicio de sesión de Facebook');
  //     });
  // };

  // Login con google y firebase
  // googleLogin = () => {
  //   // Se envia una solicitud para utilizar el login de google
  //   // Se obtiene el token de acceso
  //   GoogleSignin.signIn()
  //     .then((data) => {
  //       // Creamos un credencial con el token de acceso de google
  //       const credential = fire.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);

  //       this.setState({
  //         modalVisible: true,
  //       });

  //       // Con el credencial se autentifica en firebase el inicio de sesion
  //       return fire.auth().signInWithCredential(credential);
  //     })
  //     .then((currentUser) => {
  //       // console.log(currentUser);
  //       this.setState({
  //         modalVisible: false,
  //       });
  //     })
  //     .catch((error) => {
  //       this.setState({
  //         modalVisible: false,
  //       });
  //       // console.log(`Error de inicio de sesión de Google: ${error}`);
  //       this.refs.toast.show('Error de inicio de sesión de Google');
  //     });
  // };

  // Otra forma de Login con google y firebase
  // _googleSignIn = async () => {
  //   //Prompts a modal to let the user sign in into your application.
  //   try {
  //     await GoogleSignin.hasPlayServices({
  //       //Check if device has Google Play Services installed.
  //       //Always resolves to true on iOS.
  //       showPlayServicesUpdateDialog: true,
  //     });

  //     const userInfo = await GoogleSignin.signIn();

  //     // console.log('User Info --> ', userInfo);

  //     const credential = fire.auth.GoogleAuthProvider.credential(
  //       userInfo.idToken,
  //       userInfo.accessToken,
  //     );
  //     this.setState({
  //       modalVisible: true,
  //     });
  //     // login with credential
  //     const currentUser = await fire.auth().signInWithCredential(credential);

  //     console.info(currentUser);
  //     this.setState({
  //       modalVisible: false,
  //     });
  //   } catch (error) {
  //     this.setState({
  //       modalVisible: false,
  //     });

  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       this.refs.toast.show('Iniciando sesión');
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       this.refs.toast.show('play services no esta disponible o desactualizado');
  //     } else {
  //       this.refs.toast.show('Error de inicio de sesión de Google');
  //     }
  //   }
  // };

  // _signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();

  //     const { accessToken, idToken } = await GoogleSignin.signIn();

  //     const credential = fire.auth.GoogleAuthProvider.credential(idToken, accessToken);

  //     this.setState({
  //       modalVisible: true,
  //     });

  //     await fire.auth().signInWithCredential(credential);
  //     this.setState({
  //       modalVisible: false,
  //     });
  //   } catch (error) {
  //     this.setState({
  //       modalVisible: false,
  //     });
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //       this.refs.toast.show('Inicio de sesión cancelado');
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       this.refs.toast.show('Inicio de sesión en progreso');
  //       // operation (f.e. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       this.refs.toast.show('play services no esta disponible');
  //       // play services not available or outdated
  //     } else {
  //       this.refs.toast.show('Error de inicio de sesión de Google');
  //     }
  //   }
  // };

  emailFocus = () => {
    this.setState({
      emailFocused: true,
      passwordFocused: false,
    });
  };

  passwordFocus = () => {
    this.setState({
      passwordFocused: true,
      emailFocused: false,
    });
  };

  onTogglePress = () => {
    const { secureTextEntry } = this.state;
    this.setState({
      secureTextEntry: !secureTextEntry,
    });
  };

  focusOn = (nextFiled) => () => {
    if (nextFiled) {
      nextFiled.focus();
    }
  };

  navigateTo = (screen) => () => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  render() {
    const {
      email,
      emailFocused,
      password,
      passwordFocused,
      secureTextEntry,
      modalVisible,
    } = this.state;

    return (
      <SafeAreaView style={styles.screenContainer}>
        {/* <StatusBar hidden={true} /> */}

        <KeyboardAwareScrollView contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.content}>
            <View />

            <View style={styles.form}>
              <UnderlineTextInput
                onRef={(r) => {
                  this.email = r;
                }}
                onChangeText={(email) => this.setState({ email })}
                onFocus={this.emailFocus}
                inputFocused={emailFocused}
                onSubmitEditing={this.focusOn(this.password)}
                returnKeyType="next"
                blurOnSubmit={false}
                keyboardType="email-address"
                placeholder="Correo electrónico"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                inputTextColor={INPUT_TEXT_COLOR}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                inputContainerStyle={styles.inputContainer}
              />

              <UnderlinePasswordInput
                onRef={(r) => {
                  this.password = r;
                }}
                onChangeText={(password) => this.setState({ password })}
                onFocus={this.passwordFocus}
                inputFocused={passwordFocused}
                returnKeyType="done"
                placeholder="Contraseña"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                inputTextColor={INPUT_TEXT_COLOR}
                secureTextEntry={secureTextEntry}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                toggleVisible={password.length > 0}
                toggleText={
                  secureTextEntry ? (
                    <Icon name="eye" size={24} />
                  ) : (
                    <Icon name="eye-off" size={24} />
                  )
                }
                onTogglePress={this.onTogglePress}
              />

              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => this.signInUser(this.state.email, this.state.password)}
                  activeOpacity={0.8}
                  height={BUTTON_HEIGHT}
                  borderRadius={BUTTON_BORDER_RADIUS}
                  title={'Iniciar sesión'.toUpperCase()}
                />
              </View>

              <Text style={{ textAlign: 'center', paddingTop: 20 }}>
                ¿Olvidó la contraseña?{' '}
                <Text onPress={this.navigateTo('ForgotPassword')} style={styles.btnForgotPassword}>
                  Aquí
                </Text>
              </Text>

              <Text style={{ textAlign: 'center', paddingTop: 8 }}>
                ¿Aún no tienes una cuenta?{' '}
                <Text style={styles.btnRegister} onPress={this.navigateTo('SignUp')}>
                  Regístrate
                </Text>
              </Text>

              {/* <View style={styles.social_box}>
                <TouchableOpacity
                  style={styles.image_box_social_facebook}
                  onPress={this.facebookLogin}
                >
                  <Image
                    source={require('../../assets/img/facebook.png')}
                    style={styles.image_box_social_facebook}
                  /> */}

              {/* googleLogin _googleSignIn _signIn*/}
              {/* </TouchableOpacity>
                <TouchableOpacity style={styles.image_box_social_google} onPress={this.googleLogin}>
                  <Image
                    source={require('../../assets/img/google.png')}
                    style={styles.image_box_social_google}
                  />
                </TouchableOpacity>
              </View> */}
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Al iniciar sesión acepta nuestros</Text>
              <View style={styles.termsContainer}>
                <TouchableWithoutFeedback onPress={this.navigateTo('TermsConditions')}>
                  <Text style={[styles.footerText, styles.footerLink]}>Términos, condiciones</Text>
                </TouchableWithoutFeedback>
                <Text style={styles.footerText}> y </Text>
                <TouchableWithoutFeedback onPress={this.navigateTo('PoliticasPrivacidad')}>
                  <Text style={[styles.footerText, styles.footerLink]}>política de privacidad</Text>
                </TouchableWithoutFeedback>
                <Text style={styles.footerText}>.</Text>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>

        <ActivityIndicatorModal
          message="Por favor espere . . ."
          // onRequestClose={}
          title="Iniciando"
          visible={modalVisible}
        />
        <Toast ref="toast" style={{ backgroundColor: '#232323' }} position="center" opacity={0.8} />
      </SafeAreaView>
    );
  }
}
