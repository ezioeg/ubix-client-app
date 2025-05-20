import React, { useState, useContext } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Image,
} from 'react-native';

import Button from '../../components/buttons/Button';
import UnderlineTextInput from '../../components/textinputs/UnderlineTextInput';
import { Subtitle2 } from '../../components/text/CustomText';
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';
import Avatar from '../../components/avatar/Avatar';
import Icon from '../../components/icon/Icon';
import TouchableItem from '../../components/TouchableItem';
import LinkButton from '../../components/buttons/LinkButton';
import Colors from '../../theme/colors';

//Email validation
import { validateEmail } from '../../utils/Validation';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { launchImageLibrary } from 'react-native-image-picker';

import { useNavigation } from '@react-navigation/native';
import PedidoContext from '../../../context/pedidos/pedidosContext';
import FirebaseContext from '../../../context/firebase/firebaseContext';
import storage from '@react-native-firebase/storage';
import firebase from '../../../firebase';

const IOS = Platform.OS === 'ios';
const CAMERA_ICON = IOS ? 'ios-camera' : 'md-camera';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center',
  },
  imageBox: {
    width: 200,
    height: 200,
  },
  avatarSection: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  whiteCircle1: {
    marginTop: -18,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  whiteCircle2: {
    marginTop: -35,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  cameraButtonContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FE5000',
    overflow: 'hidden',
  },
  cameraButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 34,
    height: 34,
  },
  button: {
    width: '48%',
  },
  uploadButton: {
    paddingHorizontal: 75,
    // paddingVertical: 20,
    marginTop: 30,
  },
  editForm: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  overline: {
    color: '#5d5d5d',
    textAlign: 'left',
  },
  inputContainerStyle: {
    marginTop: 0,
    marginBottom: 17,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});

const Zelle = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const [nombreZelle, setNombreZelle] = useState('');
  const [emailZelle, setEmailZelle] = useState('');
  const [nombreZelleFocused, setNombreZelleFocused] = useState(false);
  const [emailZelleFocused, setEmailZelleFocused] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const {
    negocio,
    tiempoentrega,
    direccionorigen,
    direcciondestino,
    pedido,
    pedidoRealizado,
    pagototal,
  } = useContext(PedidoContext);
  const { restauranteorden } = useContext(FirebaseContext);

  const user = firebase.auth.currentUser; // Arreglar
  const usuarioID = user.uid; // Arreglar

  // Hook para redireccionar
  const navigation = useNavigation();

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 800,
      maxHeight: 800,
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

  // Enviando los datos de pago Zelle
  const sendingDates = async (emailZelle, nombreZelle, image) => {
    // Validaciones
    if (!emailZelle || !nombreZelle) {
      Alert.alert('El email zelle no puede estar vacío', '', [
        {
          text: 'Ok',
        },
      ]);
      return;
    }

    if (!validateEmail(emailZelle)) {
      Alert.alert('El email no es correcto', '', [
        {
          text: 'Ok',
        },
      ]);
      return;
    }

    if (!image) {
      Alert.alert('Debe adjuntar un capture', '', [
        {
          text: 'Ok',
        },
      ]);
      return;
    }

    // Ejemplo de uri: file:///storage/emulated/0/Pictures/images/image-ac526801-a1e3-48a5-8f49-4a7915fd9392.jpg
    const { uri } = image;
    // Ejemplo de filename: image-ac526801-a1e3-48a5-8f49-4a7915fd9392.jpg
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    // Uri donde esta alojada la imagen
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setUploading(true);
    // Indica la ruta en el storage de firebase
    const capturePath =
      '/restaurantes/' + pedido.restauranteId + '/capturas/' + usuarioID + '/' + filename;
    // En la ruta del storage indicada, guarda la uri donde esta alojada la imagen
    const task = storage().ref(capturePath).putFile(uploadUri);

    try {
      await task;
      const captureURL = await storage().ref(capturePath).getDownloadURL();

      const zelleObj = {
        ...pedido,
        capturapago: captureURL,
        emailzelle: emailZelle,
        nombrezelle: nombreZelle,
        tiempoentrega: tiempoentrega,
        clientedireccion: direcciondestino,
        restaurantedireccion: direccionorigen,
      };

      // console.log(zelleObj);

      const pedidoCompletado = await firebase.db
        .collection('clientes')
        .doc(usuarioID)
        .collection('ordenes')
        .add(zelleObj);

      // Tambien guardar la orden en el restaurante
      await firebase.db
        .collection('restaurantes')
        .doc(pedido.restauranteId)
        .collection('ordenes')
        .doc(pedidoCompletado.id) // nuevo
        .set(zelleObj);

      // Guarda el id de la orden y finaliza la orden
      pedidoRealizado(pedidoCompletado.id);

      // Redirecciona
      navigation.navigate('Orders'); //StatusPedido
    } catch (error) {
      console.error(error);
    }
    setUploading(false);
    Alert.alert('Datos de pago', 'Los datos de pago han sido enviados');
    // setImage(null);
  };

  const nombreZelleFocus = () => {
    setNombreZelleFocused(true);
    setEmailZelleFocused(false);
  };

  const emailZelleFocus = () => {
    setNombreZelleFocused(false);
    setEmailZelleFocused(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarSection}>
        <Avatar
          imageUri={image ? image.uri : require('../../assets/img/no-image.png')}
          size={150}
        />
        <View style={image ? styles.whiteCircle1 : styles.whiteCircle2}>
          <View style={styles.cameraButtonContainer}>
            <TouchableItem onPress={selectImage}>
              <View style={styles.cameraButton}>
                <Icon name={CAMERA_ICON} size={16} color={'#fff'} />
              </View>
            </TouchableItem>
          </View>
        </View>
      </View>

      <KeyboardAwareScrollView enableOnAndroid>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold' }}>Zelle: imfranzius@gmail.com</Text>
          <Text style={{ fontWeight: 'bold', color: 'red' }}>Total a pagar: $ {pagototal}</Text>
        </View>
        <View style={styles.editForm}>
          <Subtitle2 style={styles.overline}>Email de Zelle:</Subtitle2>
          <UnderlineTextInput
            // ref={(ref) => {
            //   nameRef = ref;
            // }}

            onChangeText={(emailZelle) => setEmailZelle(emailZelle)} // el onChange sirve con event
            onFocus={emailZelleFocus}
            inputFocused={emailZelleFocused}
            // onSubmitEditing={focusOn(emailRef)}
            keyboardType="email-address"
            returnKeyType="done"
            focusedBorderColor={'#FE5000'}
            inputContainerStyle={styles.inputContainerStyle}
          />
          <Subtitle2 style={styles.overline}>Cuenta a nombre de:</Subtitle2>
          <UnderlineTextInput
            // ref={(ref) => {
            //   emailRef = ref;
            // }}

            onChangeText={(nombreZelle) => setNombreZelle(nombreZelle)}
            onFocus={nombreZelleFocus}
            inputFocused={nombreZelleFocused}
            returnKeyType="done"
            focusedBorderColor={'#FE5000'}
            inputContainerStyle={styles.inputContainerStyle}
          />
          <View style={{ paddingHorizontal: 60, paddingVertical: 15 }}>
            <Button
              onPress={() => {
                sendingDates(emailZelle, nombreZelle, image);
              }}
              buttonStyle={styles.uploadButton}
              rounded
              title="Enviar"
            />
          </View>
          {uploading ? (
            <View>
              <ActivityIndicatorModal
                message="Por favor espere . . ."
                title="Enviando datos de pago"
                visible={uploading}
              />
            </View>
          ) : null}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Zelle;
