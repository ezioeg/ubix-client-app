/**
 * Ubix
 *
 * @format
 * @flow
 */

// Dependencies
import React, { useState, useEffect, useContext, useRef } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-easy-toast';

// Components
import { Subtitle2 } from '../../components/text/CustomText';
import UnderlineTextInput from '../../components/textinputs/UnderlineTextInput';
import UnderlinePasswordInput from '../../components/textinputs/UnderlinePasswordInput';
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';
import Button from '../../components/buttons/Button';

// Colors
import Colors from '../../theme/colors';

//Email validation
import { validateEmail } from '../../utils/Validation';
// password validation
import { reauthenticate } from '../../utils/ReAuthenticate';

import firebase from '../../../firebase';
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
    marginTop: 0,
    marginBottom: 0,
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
  inputContainerStyle2: {
    marginTop: -20,
    marginBottom: 0,
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
});

// ChangeEmail
const ChangeEmail = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');

  const [hidePassword, setHidePassword] = useState(true);

  const { usuarioinfofirestore, obtenerUsuarioInfoFirestore } = useContext(FirebaseContext);

  useEffect(() => {
    obtenerUsuarioInfoFirestore();
  }, []);

  const updateEmail = async () => {
    if (!newEmail || usuarioinfofirestore.email === newEmail) {
      toastRef.show('El email no ha cambiado');
      return;
    }

    if (!validateEmail(newEmail)) {
      toastRef.show('El email no es correcto');
      return;
    }

    if (!password) {
      toastRef.show('Su contraseña es obligatoria');
      return;
    }

    setIsLoading(true);
    await reauthenticate(password)
      .then(async () => {
        await firebase.auth.currentUser
          .updateEmail(newEmail)
          .then(async () => {
            await firebase.db.collection('clientes').doc(usuarioinfofirestore.id).update({
              email: newEmail,
            });

            setIsLoading(false);
            toastRef.show('Email actualizado correctamente');
          })
          .catch(() => {
            toastRef.show('Error al actualizar el email');
            setIsLoading(false);
          });
      })
      .catch(() => {
        toastRef.show('Contraseña incorrecta');
        setIsLoading(false);
      });
  };

  const updating = async () => {
    updateEmail();
  };

  const emailFocus = () => {
    setEmailFocused(true);
    setPasswordFocused(false);
  };

  const passwordFocus = () => {
    setPasswordFocused(true);
    setEmailFocused(false);
  };

  const onTogglePress = () => {
    setHidePassword(!hidePassword);
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
          <Subtitle2 style={styles.overline}>Dirección de correo electrónico</Subtitle2>
          <UnderlineTextInput
            // ref={(ref) => {
            //   emailRef = ref;
            // }}
            defaultValue={usuarioinfofirestore.email && usuarioinfofirestore.email}
            onChangeText={(newEmail) => setNewEmail(newEmail)}
            onFocus={emailFocus}
            inputFocused={emailFocused}
            returnKeyType="next"
            keyboardType="email-address"
            inputContainerStyle={styles.inputContainerStyle}
          />

          <Subtitle2 style={styles.overline}>Contraseña</Subtitle2>

          <UnderlinePasswordInput
            // ref={(ref) => {
            //   passwordRef = ref;
            // }}
            onChangeText={(password) => setPassword(password)}
            onFocus={passwordFocus}
            inputFocused={passwordFocused}
            returnKeyType="done"
            placeholder="Contraseña"
            secureTextEntry={hidePassword}
            focusedBorderColor={Colors.primaryColor}
            toggleVisible={password.length > 0}
            toggleText={
              hidePassword ? <Icon name="eye" size={24} /> : <Icon name="eye-off" size={24} />
            }
            onTogglePress={onTogglePress}
            inputContainerStyle={styles.inputContainerStyle2}
          />
        </View>
      </KeyboardAwareScrollView>
      <View style={{ paddingHorizontal: 70, paddingVertical: 30 }}>
        <Button onPress={updating} activeOpacity={0.8} rounded title={'Guardar'} />
      </View>

      <ActivityIndicatorModal
        // message="Por favor espere . . ."
        title="Actualizando email"
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
export default ChangeEmail;
