/**
 * Ubix
 *
 * @format
 * @flow
 */

// import dependencies
import React, { Component } from 'react';
import { Alert, I18nManager, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

// import components
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';
import Button from '../../components/buttons/Button';
import { Heading5, Paragraph } from '../../components/text/CustomText';
import NumericKeyboard from '../../components/keyboard/NumericKeyboard';

// import colors
import Colors from '../../theme/colors';

// VerificationA Config
const isRTL = I18nManager.isRTL;

// VerificationA Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  instructionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instruction: {
    marginTop: 16,
    paddingHorizontal: 40,
    fontSize: 14,
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 38,
  },
  digitContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    width: 48,
    height: 50,
    borderRadius: 4,
    backgroundColor: Colors.primaryColor,
    opacity: 0.2,
  },
  digit: {
    fontWeight: '400',
    fontSize: 17,
    color: Colors.primaryText,
  },
  buttonContainer: {
    paddingBottom: 44,
  },
});

// VerificationA
export default class VerificationA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      pin: '',
    };
  }

  // avoid memory leak
  componentWillUnmount = () => {
    clearTimeout(this.timeout);
  };

  navigateTo = (screen) => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  pressKeyboardButton = (keyboardButton) => () => {
    let { pin } = this.state;

    if (keyboardButton === 'backspace') {
      pin = pin.slice(0, -1);
      this.setState({
        pin,
      });
      return;
    }

    if (keyboardButton === 'skip') {
      Alert.alert(
        'Omitir verificación',
        'Seguro quieres saltarte esto?',
        [
          { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
          {
            text: 'OK',
            onPress: () => {
              this.navigateTo('HomeNavigator');
            },
          },
        ],
        { cancelable: false },
      );
      return;
    }

    if ((pin + keyboardButton).length > 4) {
      return;
    }

    this.setState({
      pin: pin + keyboardButton,
    });
  };

  submit = () => {
    this.setState(
      {
        modalVisible: true,
      },
      () => {
        // for demo purpose after 3s close modal
        this.timeout = setTimeout(() => {
          this.closeModal();
          this.navigateTo('HomeNavigator');
        }, 3000);
      },
    );
  };

  closeModal = () => {
    // for demo purpose clear timeout if user request close modal before 3s timeout
    clearTimeout(this.timeout);
    this.setState({
      modalVisible: false,
      pin: '',
    });
  };

  render() {
    const { modalVisible, pin } = this.state;

    return (
      <SafeAreaView forceInset={{ top: 'never' }} style={styles.screenContainer}>
        <StatusBar backgroundColor={Colors.statusBarColor} barStyle="dark-content" />

        <View style={styles.container}>
          <View style={styles.instructionContainer}>
            <Heading5>Código de verificación</Heading5>
            <Paragraph style={styles.instruction}>
              Por favor, ingrese el código de verificación enviado a +4163039355
            </Paragraph>

            <View style={styles.codeContainer}>
              <View style={styles.digitContainer}>
                <Text style={styles.digit}>{pin[0]}</Text>
              </View>
              <View style={styles.digitContainer}>
                <Text style={styles.digit}>{pin[1]}</Text>
              </View>
              <View style={styles.digitContainer}>
                <Text style={styles.digit}>{pin[2]}</Text>
              </View>
              <View style={styles.digitContainer}>
                <Text style={styles.digit}>{pin[3]}</Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              onPress={this.submit}
              disabled={pin.length < 4}
              borderRadius={4}
              small
              title={'Ingrese código'.toUpperCase()}
            />
          </View>

          <NumericKeyboard actionButtonTitle="omitir" onPress={this.pressKeyboardButton} />

          <ActivityIndicatorModal
            message="Por favor espera . . ."
            onRequestClose={this.closeModal}
            title="Cargando"
            visible={modalVisible}
          />
        </View>
      </SafeAreaView>
    );
  }
}
