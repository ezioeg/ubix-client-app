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

// Firebase for credentials and auth
import firebase from '../../../firebase';

// Config
const PLACEHOLDER_TEXT_COLOR = 'rgba(0, 0, 0, 0.4)';
const INPUT_TEXT_COLOR = 'rgba(0, 0, 0, 0.87)';
const INPUT_BORDER_COLOR = 'rgba(0, 0, 0, 0.2)';
const INPUT_FOCUSED_BORDER_COLOR = '#000';

// Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainerStyle: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  form: {
    paddingHorizontal: Layout.LARGE_PADDING,
  },
  inputContainer: { marginBottom: 7 },
  vSpacer: {
    height: 15,
  },
  buttonContainer: {
    paddingVertical: 23,
  },
  buttonsGroup: {
    paddingTop: 23,
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
  btnLogin: {
    color: '#FE5000',
    fontWeight: 'bold',
  },
});

// SignUpA
export default class SignUpA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailFocused: false,
      nombre: '',
      nombreFocused: false,
      phone: '',
      phoneFocused: false,
      password: '',
      passwordFocused: false,
      repeatPassword: '',
      repeatPasswordFocused: false,
      secureTextEntry: true,
      secureTextEntry2: true,
      modalVisible: false, // new add
    };
  }

  // Registro con firebase
  signUpUser = async (email, nombre, phone, password, repeatPassword) => {
    if (!email || !nombre || !phone || !password || !repeatPassword) {
      this.refs.toast.show('Todos los campos son obligatorios');
      return;
    }
    if (!validateEmail(email)) {
      this.refs.toast.show('El email no es correcto');
      return;
    }

    if (nombre.length < 9) {
      this.refs.toast.show('Coloque su nombre y apellido completo');
      return;
    }

    if (phone.length < 10) {
      this.refs.toast.show('El numero debe tener minimo 10 digitos');
      return;
    }

    if (password.length < 6) {
      this.refs.toast.show('Su clave debe tener minimo 6 caracteres');
      return;
    }
    if (password !== repeatPassword) {
      this.refs.toast.show('Las contraseñas no son iguales');
      return;
    }

    this.setState({
      modalVisible: true,
    });

    await firebase.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        // Datos ya registrados por auth entonces se agregan a firestore
        const id = firebase.auth.currentUser.uid;
        firebase.db
          .collection('clientes')
          .doc(id)
          .set({ avatar: '', email: email, nombre: nombre, telefono: phone, password: password });
      })
      .catch(() => {
        this.refs.toast.show('Error al crear la cuenta, intentelo más tarde');
        // console.log('error en el SignUp: ', error);
      });

    this.setState({
      modalVisible: false,
    });
  };

  emailFocus = () => {
    this.setState({
      emailFocused: true,
      nombreFocused: false,
      phoneFocused: false,
      passwordFocused: false,
      repeatPasswordFocused: false,
    });
  };

  nombreFocus = () => {
    this.setState({
      nombreFocused: true,
      emailFocused: false,
      phoneFocused: false,
      passwordFocused: false,
      repeatPasswordFocused: false,
    });
  };

  phoneFocus = () => {
    this.setState({
      phoneFocused: true,
      emailFocused: false,
      nombreFocused: false,
      passwordFocused: false,
      repeatPasswordFocused: false,
    });
  };

  passwordFocus = () => {
    this.setState({
      passwordFocused: true,
      emailFocused: false,
      nombreFocused: false,
      phoneFocused: false,
      repeatPasswordFocused: false,
    });
  };

  repeatPasswordFocus = () => {
    this.setState({
      repeatPasswordFocused: true,
      emailFocused: false,
      nombreFocused: false,
      phoneFocused: false,
      passwordFocused: false,
    });
  };

  onTogglePress = () => {
    const { secureTextEntry } = this.state;
    this.setState({
      secureTextEntry: !secureTextEntry,
    });
  };

  onTogglePress2 = () => {
    const { secureTextEntry2 } = this.state;
    this.setState({
      secureTextEntry2: !secureTextEntry2,
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
      emailFocused,
      nombre,
      nombreFocused,
      phoneFocused,
      password,
      passwordFocused,
      repeatPassword,
      repeatPasswordFocused,
      secureTextEntry,
      secureTextEntry2,
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
                onSubmitEditing={this.focusOn(this.nombre)}
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

              <UnderlineTextInput
                onRef={(r) => {
                  this.nombre = r;
                }}
                onChangeText={(nombre) => this.setState({ nombre })}
                onFocus={this.nombreFocus}
                inputFocused={nombreFocused}
                onSubmitEditing={this.focusOn(this.phone)}
                returnKeyType="next"
                blurOnSubmit={false}
                placeholder="Nombre y Apellido"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                inputTextColor={INPUT_TEXT_COLOR}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                inputContainerStyle={styles.inputContainer}
              />

              <UnderlineTextInput
                onRef={(r) => {
                  this.phone = r;
                }}
                onChangeText={(phone) => this.setState({ phone })}
                onFocus={this.phoneFocus}
                inputFocused={phoneFocused}
                onSubmitEditing={this.focusOn(this.password)}
                returnKeyType="next"
                blurOnSubmit={false}
                keyboardType="phone-pad"
                placeholder="Número de teléfono"
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
                onSubmitEditing={this.focusOn(this.repeatPassword)}
                returnKeyType="next"
                placeholder="Contraseña"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
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

              <UnderlinePasswordInput
                onRef={(r) => {
                  this.repeatPassword = r;
                }}
                onChangeText={(repeatPassword) => this.setState({ repeatPassword })}
                onFocus={this.repeatPasswordFocus}
                inputFocused={repeatPasswordFocused}
                returnKeyType="done"
                placeholder="Repetir contraseña"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                secureTextEntry={secureTextEntry2}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                toggleVisible={repeatPassword.length > 0}
                toggleText={
                  secureTextEntry2 ? (
                    <Icon name="eye" size={24} />
                  ) : (
                    <Icon name="eye-off" size={24} />
                  )
                }
                onTogglePress={this.onTogglePress2}
              />

              <View style={styles.buttonContainer}>
                <Button
                  onPress={() =>
                    this.signUpUser(
                      this.state.email,
                      this.state.nombre,
                      this.state.phone,
                      this.state.password,
                      this.state.repeatPassword,
                    )
                  }
                  title={'Crear Cuenta'.toUpperCase()}
                />
              </View>

              <Text style={{ textAlign: 'center' }}>
                ¿Ya tienes cuenta?{' '}
                <Text style={styles.btnLogin} onPress={this.navigateTo('SignIn')}>
                  Inicia Sesión
                </Text>
              </Text>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Al registrarte aceptas nuestros</Text>
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

            <ActivityIndicatorModal
              message="Por favor espere . . ."
              title="Iniciando"
              visible={modalVisible}
            />
            <Toast
              ref="toast"
              style={{ backgroundColor: '#232323' }}
              position="center"
              opacity={0.8}
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
