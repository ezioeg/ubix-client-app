/**
 * Ubix
 *
 * @format
 * @flow
 */

// Dependencies
import React, { useState, useContext, useRef } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-easy-toast';

// Components
import { Subtitle2 } from '../../components/text/CustomText';
import UnderlinePasswordInput from '../../components/textinputs/UnderlinePasswordInput';
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';
import Button from '../../components/buttons/Button';

// Colors
import Colors from '../../theme/colors';

import { reauthenticate } from '../../utils/ReAuthenticate';
// Firebase for auth
import firebase from '../../../firebase';
// Firebase for get current user
import FirebaseContext from '../../../context/firebase/firebaseContext';

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  editForm: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  overline: {
    color: Colors.secondaryText,
    textAlign: 'left',
    marginTop: 20,
  },
  inputContainerStyle: {
    marginTop: -20,
    marginBottom: 0,
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
});

// ChangePassword
const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [passwordFocused, setPasswordFocused] = useState(false);
  const [newPasswordFocused, setNewPasswordFocused] = useState(false);
  const [newPasswordRepeatFocused, setNewPasswordRepeatFocused] = useState(false);

  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const [newPassword, setNewPassword] = useState('');
  const [hideNewPassword, setHideNewPassword] = useState(true);

  const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
  const [hideNewPasswordRepeat, setHideNewPasswordRepeat] = useState(true);

  const user = firebase.auth.currentUser; // Arreglar
  const usuarioID = user.uid; // Arreglar

  const updating = async () => {
    if (!password || !newPassword || !newPasswordRepeat) {
      toastRef.show('Todos los campos son obligatorios');
      return;
    }

    if (newPassword.length < 6) {
      toastRef.show('Su contraseña debe tener minimo 6 caracteres');
      return;
    }

    if (newPassword !== newPasswordRepeat) {
      toastRef.show('Las contraseñas no son iguales');
      return;
    }

    setIsLoading(true);
    await reauthenticate(password)
      .then(async () => {
        await firebase.auth.currentUser
          .updatePassword(newPassword)
          .then(async () => {
            await firebase.db.collection('clientes').doc(usuarioID).update({
              password: newPassword,
            });

            setIsLoading(false);
            toastRef.show('Contraseña actualizada correctamente');
          })
          .catch(() => {
            toastRef.show('Error al actualizar contraseña');
            setIsLoading(false);
          });
      })
      .catch(() => {
        toastRef.show('Contraseña incorrecta');
        setIsLoading(false);
      });
  };

  const passwordFocus = () => {
    setPasswordFocused(true);
    setNewPasswordFocused(false);
    setNewPasswordRepeatFocused(false);
  };

  const newPasswordFocus = () => {
    setPasswordFocused(false);
    setNewPasswordFocused(true);
    setNewPasswordRepeatFocused(false);
  };

  const newPasswordRepeatFocus = () => {
    setPasswordFocused(false);
    setNewPasswordFocused(false);
    setNewPasswordRepeatFocused(true);
  };

  const onTogglePress = () => {
    setHidePassword(!hidePassword);
  };

  const onTogglePress2 = () => {
    setHideNewPassword(!hideNewPassword);
  };

  const onTogglePress3 = () => {
    setHideNewPasswordRepeat(!hideNewPasswordRepeat);
  };

  const focusOn = (nextFiled) => () => {
    if (nextFiled) {
      nextFiled.focus();
    }
  };

  // Hook para redireccionar
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar backgroundColor="white" barStyle="dark-content" /> */}

      <KeyboardAwareScrollView enableOnAndroid>
        <View style={styles.editForm}>
          <Subtitle2 style={styles.overline}>Contraseña anterior</Subtitle2>
          <UnderlinePasswordInput
            // ref={(ref) => {
            //   passwordRef = ref;
            // }}
            onChangeText={(password) => setPassword(password)}
            onFocus={passwordFocus}
            inputFocused={passwordFocused}
            returnKeyType="done"
            placeholder="Contraseña anterior"
            secureTextEntry={hidePassword}
            focusedBorderColor={Colors.primaryColor}
            toggleVisible={password.length > 0}
            toggleText={
              hidePassword ? <Icon name="eye" size={24} /> : <Icon name="eye-off" size={24} />
            }
            onTogglePress={onTogglePress}
            inputContainerStyle={styles.inputContainerStyle}
          />

          <Subtitle2 style={styles.overline}>Nueva contraseña</Subtitle2>
          <UnderlinePasswordInput
            // ref={(ref) => {
            //   newPasswordRef = ref;
            // }}
            onChangeText={(newPassword) => setNewPassword(newPassword)}
            onFocus={newPasswordFocus}
            inputFocused={newPasswordFocused}
            returnKeyType="done"
            placeholder="Nueva contraseña"
            secureTextEntry={hideNewPassword}
            focusedBorderColor={Colors.primaryColor}
            toggleVisible={newPassword.length > 0}
            toggleText={
              hideNewPassword ? <Icon name="eye" size={24} /> : <Icon name="eye-off" size={24} />
            }
            onTogglePress={onTogglePress2}
            inputContainerStyle={styles.inputContainerStyle}
          />

          <Subtitle2 style={styles.overline}>Repetir nueva contraseña</Subtitle2>
          <UnderlinePasswordInput
            // ref={(ref) => {
            //   newPasswordRef = ref;
            // }}
            onChangeText={(newPasswordRepeat) => setNewPasswordRepeat(newPasswordRepeat)}
            onFocus={newPasswordRepeatFocus}
            inputFocused={newPasswordRepeatFocused}
            returnKeyType="done"
            placeholder="Repetir nueva contraseña"
            secureTextEntry={hideNewPasswordRepeat}
            focusedBorderColor={Colors.primaryColor}
            toggleVisible={newPasswordRepeat.length > 0}
            toggleText={
              hideNewPasswordRepeat ? (
                <Icon name="eye" size={24} />
              ) : (
                <Icon name="eye-off" size={24} />
              )
            }
            onTogglePress={onTogglePress3}
            inputContainerStyle={styles.inputContainerStyle}
          />
        </View>
      </KeyboardAwareScrollView>
      <View style={{ paddingHorizontal: 70, paddingVertical: 30 }}>
        <Button onPress={updating} activeOpacity={0.8} rounded title={'Guardar'} />
      </View>

      <ActivityIndicatorModal
        // message="Por favor espere . . ."
        title="Actualizando contraseña"
        visible={isLoading}
      />
      <Toast
        ref={(ref) => {
          toastRef = ref;
        }}
        style={{ backgroundColor: '#232323' }}
        position="top"
        opacity={0.8}
      />
    </SafeAreaView>
  );
};
export default ChangePassword;
