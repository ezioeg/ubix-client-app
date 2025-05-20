/**
 * Ubix
 *
 * @format
 * @flow
 */

// Dependencies
import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-easy-toast';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

// Components
import Avatar from '../../components/avatar/Avatar';
import Icon from '../../components/icon/Icon';
import { Subtitle2 } from '../../components/text/CustomText';
import TouchableItem from '../../components/TouchableItem';
import UnderlineTextInput from '../../components/textinputs/UnderlineTextInput';
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';
import Button from '../../components/buttons/Button';

// Colors
import Colors from '../../theme/colors';

// Firebase for auth
import firebase from '../../../firebase';
// Firebase for get current user
import FirebaseContext from '../../../context/firebase/firebaseContext';

// Config
const AVATAR_SIZE = 100;
const IOS = Platform.OS === 'ios';
const CAMERA_ICON = IOS ? 'ios-camera' : 'md-camera';
const INPUT_FOCUSED_BORDER_COLOR = Colors.primaryColor;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  avatarSection: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  whiteCircle: {
    marginTop: -18,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
  },
  cameraButtonContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.primaryColor,
    overflow: 'hidden',
  },
  cameraButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 34,
    height: 34,
  },
  editForm: {
    paddingHorizontal: 30,
  },
  overline: {
    color: Colors.secondaryText,
    textAlign: 'left',
  },
  inputContainerStyle: {
    marginTop: 0,
    marginBottom: 17,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  buttonChangePassword: {
    color: '#FE5000',
    fontWeight: 'bold',
  },
});

// EditProfileA
const EditProfileA = () => {
  const [image, setImage] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [nameFocused, setNameFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);

  const [newName, setNewName] = useState(null);
  const [newPhone, setNewPhone] = useState('');

  const {
    usuarioinfo,
    obtenerUsuarioInfo,
    usuarioinfofirestore,
    obtenerUsuarioInfoFirestore,
  } = useContext(FirebaseContext);
  const { displayName, email, phoneNumber, photoURL } = usuarioinfo;

  useEffect(() => {
    obtenerUsuarioInfo();
    obtenerUsuarioInfoFirestore();
  }, []);

  const selectAvatar = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 150,
      maxHeight: 150,
      allowsEditing: true,
      title: 'Buscar imagen',
      takePhotoButtonTitle: '',
      chooseFromLibraryButtonTitle: 'Buscar en galeria',
      cancelButtonTitle: 'Cancelar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    //ImagePicker.showImagePicker
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        Alert.alert('Selección cancelada');
      } else if (response.error) {
        Alert.alert('Error al seleccionar la imagen');
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        // console.log(source);
        setImage(source);
      }
    });
  };

  const updateName = async () => {
    if (usuarioinfofirestore.nombre === newName) {
      return;
    }

    setIsLoading(true);
    const update = {
      nombre: newName,
    };

    // firebase.auth.currentUser
    //   .updateProfile(update)

    firebase.db
      .collection('clientes')
      .doc(usuarioinfofirestore.id)
      .update(update)
      .then(() => {
        setIsLoading(false);
        toastRef.show('Nombre actualizado correctamente');
      })
      .catch(() => {
        setIsLoading(false);
        toastRef.show('Error al actualizar el nombre');
      });
  };

  const updatePhone = () => {
    if (usuarioinfofirestore.telefono === newPhone) {
      return;
    }
    setIsLoading(true);
    const update = {
      telefono: newPhone,
    };

    // firebase.auth.currentUser
    //   .updateProfile(update)

    firebase.db
      .collection('clientes')
      .doc(usuarioinfofirestore.id)
      .update(update)
      .then(() => {
        setIsLoading(false);
        toastRef.show('Teléfono actualizado correctamente');
      })
      .catch(() => {
        setIsLoading(false);
        toastRef.show('Error al actualizar el teléfono');
      });
  };

  const updateImage = async () => {
    // if (usuarioinfofirestore.avatar === image) {
    //   return;
    // }

    // Ejemplo de uri: file:///storage/emulated/0/Pictures/images/image-ac526801-a1e3-48a5-8f49-4a7915fd9392.jpg
    const { uri } = image;
    // Ejemplo de filename: image-ac526801-a1e3-48a5-8f49-4a7915fd9392.jpg
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    // Uri donde esta alojada la imagen
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setIsLoading(true);
    // Indica la ruta en el storage de firebase
    const avatarPath = '/clientes/' + usuarioinfofirestore.id + '/' + filename;
    // En la ruta del storage indicada, guarda la uri donde esta alojada la imagen
    const task = storage().ref(avatarPath).putFile(uploadUri);

    // try {
    await task;
    const avatarURL = await storage().ref(avatarPath).getDownloadURL();

    const update = {
      avatar: avatarURL,
    };

    firebase.db
      .collection('clientes')
      .doc(usuarioinfofirestore.id)
      .update(update)
      .then(() => {
        setIsLoading(false);
        toastRef.show('Avatar actualizada correctamente');
      })
      .catch(() => {
        setIsLoading(false);
        toastRef.show('Error al actualizar avatar');
      });
    // }
  };

  const updateUserData = () => {
    if (!newName && !newPhone && !image) {
      toastRef.show('Sus datos no han cambiado o estan vacíos');
      return;
    }

    if (newName && !newPhone && !image) {
      updateName();
      return;
    }

    if (newPhone && !newName && !image) {
      updatePhone();
      return;
    }

    if (image && !newPhone && !newName) {
      updateImage();
      return;
    }

    if (newPhone && newName && !image) {
      updatePhone();
      updateName();
      return;
    }

    if (newPhone && image && !newName) {
      updatePhone();
      updateImage();
      return;
    }

    if (newName && newPhone && !image) {
      updateName();
      updatePhone();
      return;
    }

    if (newName && image && !newPhone) {
      updateName();
      updateImage();
      return;
    }

    if (newPhone && newName && image) {
      updatePhone();
      updateName();
      updateImage();
      return;
    }
  };

  const nameFocus = () => {
    setNameFocused(true);
    setPhoneFocused(false);
  };

  const phoneFocus = () => {
    setNameFocused(false);
    setPhoneFocused(true);
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
        <View style={styles.avatarSection}>
          {image ? (
            <Avatar imageUri={image.uri} rounded size={AVATAR_SIZE} />
          ) : (
            <Avatar
              imageUri={
                usuarioinfofirestore.avatar
                  ? usuarioinfofirestore.avatar
                  : require('../../assets/img/profile_1.jpeg')
              }
              rounded
              size={AVATAR_SIZE}
            />
          )}

          <View style={styles.whiteCircle}>
            <View style={styles.cameraButtonContainer}>
              <TouchableItem onPress={selectAvatar}>
                {/* <TouchableOpacity> */}
                <View style={styles.cameraButton}>
                  <Icon name={CAMERA_ICON} size={16} color={Colors.onPrimaryColor} />
                </View>
                {/* </TouchableOpacity> */}
              </TouchableItem>
            </View>
          </View>
        </View>

        <View style={styles.editForm}>
          <Subtitle2 style={styles.overline}>Nombre</Subtitle2>
          <UnderlineTextInput
            // ref={(ref) => {
            //   nameRef = ref;
            // }}
            defaultValue={usuarioinfofirestore.nombre ? usuarioinfofirestore.nombre : displayName} // antes era value
            onChangeText={(newName) => setNewName(newName)} // el onChange sirve con event
            onFocus={nameFocus}
            inputFocused={nameFocused}
            // onSubmitEditing={focusOn(phoneRef)}
            returnKeyType="done"
            focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
            inputContainerStyle={styles.inputContainerStyle}
          />

          <Subtitle2 style={styles.overline}>Número de teléfono</Subtitle2>
          <UnderlineTextInput
            // ref={(ref) => {
            //   phoneRef = ref;
            // }}
            defaultValue={
              usuarioinfofirestore.telefono ? usuarioinfofirestore.telefono : phoneNumber
            }
            onChangeText={(newPhone) => setNewPhone(newPhone)}
            onFocus={phoneFocus}
            inputFocused={phoneFocused}
            returnKeyType="next"
            keyboardType="numeric"
            focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
            inputContainerStyle={styles.inputContainerStyle}
          />

          <Text style={{ textAlign: 'center', paddingTop: 8 }}>
            <Text
              style={styles.buttonChangePassword}
              onPress={() => navigation.navigate('ChangeEmail')}
            >
              Cambiar email
            </Text>
          </Text>

          <Text style={{ textAlign: 'center', paddingTop: 8 }}>
            <Text
              style={styles.buttonChangePassword}
              onPress={() => navigation.navigate('ChangePassword')}
            >
              Cambiar contraseña
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
      <View style={{ paddingHorizontal: 70, paddingVertical: 30 }}>
        <Button onPress={updateUserData} activeOpacity={0.8} rounded title={'Guardar'} />
      </View>

      <ActivityIndicatorModal
        // message="Por favor espere . . ."
        title="Actualizando perfil"
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
export default EditProfileA;
