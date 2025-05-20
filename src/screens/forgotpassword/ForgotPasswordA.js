/**
 * Ubix
 *
 * @format
 * @flow
 */

// import dependencies
import React, { Component } from 'react';
import { Keyboard, ScrollView, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Toast from 'react-native-easy-toast';

// import components
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';
import Button from '../../components/buttons/Button';
import { Paragraph } from '../../components/text/CustomText';
import UnderlineTextInput from '../../components/textinputs/UnderlineTextInput';

// import colors
import Colors from '../../theme/colors';

import firebase from '../../../firebase';

// ForgotPasswordA Config
const PLACEHOLDER_TEXT_COLOR = 'rgba(0, 0, 0, 0.4)';
const INPUT_TEXT_COLOR = 'rgba(0, 0, 0, 0.87)';
const INPUT_BORDER_COLOR = 'rgba(0, 0, 0, 0.2)';
const INPUT_FOCUSED_BORDER_COLOR = '#000';

// ForgotPasswordA Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainerStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 64,
    paddingHorizontal: 24,
  },
  instructionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FE500022',
  },
  instruction: {
    marginTop: 32,
    paddingHorizontal: 16,
    fontSize: 14,
    textAlign: 'center',
  },
  inputContainer: {
    paddingTop: 16,
  },
  inputStyle: {
    textAlign: 'center',
  },
  buttonContainer: {
    paddingTop: 22,
  },
});

// ForgotPasswordA
export default class ForgotPasswordA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailFocused: false,
      modalVisible: false,
    };
  }

  componentDidMount = () => {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  };

  // avoid memory leak
  componentWillUnmount = () => {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  };

  keyboardDidShow = () => {
    this.setState({
      emailFocused: true,
    });
  };

  keyboardDidHide = () => {
    this.setState({
      emailFocused: false,
    });
  };

  emailChange = (text) => {
    this.setState({
      email: text,
    });
  };

  navigateTo = (screen) => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  resetPassword = () => {
    Keyboard.dismiss();
    this.setState(
      {
        modalVisible: true,
        emailFocused: false,
      },
      () => {
        firebase.auth
          .sendPasswordResetEmail(this.state.email)
          .then(() => {
            this.refs.toast.show('Link para restablecer password enviado a su email');
            this.setState({
              modalVisible: false,
            });
          })
          .catch((error) => {
            this.refs.toast.show('Error enviando link para restablecer password');
          });
      },
    );
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    const { emailFocused, modalVisible } = this.state;

    return (
      <SafeAreaView forceInset={{ top: 'never' }} style={styles.screenContainer}>
        <StatusBar backgroundColor={Colors.statusBarColor} barStyle="dark-content" />

        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.instructionContainer}>
            <View style={styles.iconContainer}>
              <Icon name="lock-outline" size={36} color={Colors.primaryColor} />
            </View>
            <Paragraph style={styles.instruction}>
              Ingrese su dirección de correo electrónico a continuación para recibir su instrucción
              de restablecimiento de contraseña
            </Paragraph>
          </View>

          <View style={styles.inputContainer}>
            <UnderlineTextInput
              onChangeText={this.emailChange}
              inputFocused={emailFocused}
              onSubmitEditing={this.resetPassword}
              returnKeyType="next"
              blurOnSubmit={false}
              keyboardType="email-address"
              placeholder="Dirección de correo electrónico"
              placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
              inputTextColor={INPUT_TEXT_COLOR}
              borderColor={INPUT_BORDER_COLOR}
              focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
              inputStyle={styles.inputStyle}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button onPress={this.resetPassword} small title={'Restablecer'.toUpperCase()} />
          </View>

          <ActivityIndicatorModal
            message="Por favor espere . . ."
            onRequestClose={this.closeModal}
            title="Enviando instrucciones"
            visible={modalVisible}
          />
        </ScrollView>
        <Toast ref="toast" style={{ backgroundColor: '#232323' }} position="center" opacity={0.8} />
      </SafeAreaView>
    );
  }
}
