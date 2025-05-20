/**
 * Ubix
 *
 * @format
 * @flow
 */

import React, { useState, useEffect, useContext } from 'react';
import { Dimensions, StyleSheet, View, Text, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'; // Para representar el mapa
import { request, PERMISSIONS } from 'react-native-permissions'; // Permiso para usar la geolocalizacion de los usuarios
import Geolocation from 'react-native-geolocation-service'; // Para localizar los usuarios. Antes: @react-native-community/geolocation
import BuscarLocalizacion from '../../components/searchlocation/BuscarLocalizacion'; // Para buscar direcciones
import MapViewDirections from 'react-native-maps-directions'; // Para trazar rutas, distancia y tiempo entre origen y destino
import Geocoder from 'react-native-geocoding'; // tranforma las coordenadas en direccion
import { useNavigation } from '@react-navigation/native';
import Config from 'react-native-config';
import { Caption } from '../../components/text/CustomText';
import Button from '../../components/buttons/Button';
import LinkButton from '../../components/buttons/LinkButton';
import Colors from '../../theme/colors';

import { GeoFirestore } from 'geofirestore';

import firebase from '../../../firebase';

import FirebaseContext from '../../../context/firebase/firebaseContext';
import PedidoContext from '../../../context/pedidos/pedidosContext';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// Se tiene que inicializar
Geocoder.init(Config.FIREBASE_API_KEY);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width,
    height,
  },
  stepIndicator: {
    backgroundColor: Colors.background,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    elevation: 1,
    ...Platform.select({
      ios: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#a7a7aa',
      },
    }),
  },
  stepContainer: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: {
    fontWeight: '700',
    color: '#000000aa',
  },
  activeStepText: {
    color: '#FE5000',
  },
  line: {
    width: 48,
    height: 2,
    backgroundColor: '#000000aa',
  },
  buttonContainer: {
    paddingTop: 16,
    marginTop: -10, //Coloca el mapa debajo del contenedor redondeado
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: Colors.whiteSmoke,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  linkButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
  },
  linkButton: {
    color: Colors.black,
  },
});

const DireccionUsuario = () => {
  // Para extraer las coordenadas de origen y destino
  const { restauranteorden } = useContext(FirebaseContext);

  // Para guardar el tiempo de entrega
  const {
    guardarTiempoEntrega,
    guardarDireccionOrigen,
    guardarDireccionDestino,
    direccionorigen,
    direcciondestino,
  } = useContext(PedidoContext);

  const [isMapReady, setIsMapReady] = useState(false);
  const [posicion, setPosicion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.009,
    longitudeDelta: 0.035,
  });

  const user = firebase.auth.currentUser;
  const usuarioID = user.uid;
  const geofirestore = new GeoFirestore(firebase.db);
  const geocollection = geofirestore.collection('clientes');
  const geodocument = geocollection.doc(usuarioID);

  useEffect(() => {
    function obtenerLocalizacion() {
      solicitarPermisoLocalizacion();
    }

    obtenerLocalizacion();
  }, []);

  useEffect(() => {
    async function guardarLocalizacion() {
      const { latitude, longitude } = posicion;
      try {
        if (latitude && longitude) {
          await geodocument.update({
            // El campo de coordenadas debe ser un GeoPoint
            coordinates: new firebase.fire.GeoPoint(posicion.latitude, posicion.longitude),
          });
        }
      } catch (error) {
        // console.log(error);
      }
    }

    guardarLocalizacion();
  }, [posicion]);

  const solicitarPermisoLocalizacion = async () => {
    if (Platform.OS == 'ios') {
      var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      // console.log('iPhone' + response);

      if (response === 'granted') {
        localizarUsuario();
      }
    } else {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      // console.log('Android' + response);

      if (response === 'granted') {
        localizarUsuario();
      }
    }
  };

  const localizarUsuario = async () => {
    Geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        let posicion = {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.035,
        };

        // Convirtiendo las coordenadas del restaurante en una direccion
        const responseOrigen = await Geocoder.from(
          restauranteorden.coordinates.latitude,
          restauranteorden.coordinates.longitude,
        );
        const direccionOrigen = responseOrigen.results[0].formatted_address;

        // Convirtiendo las coordenadas del cliente en una direccion
        const responseDestino = await Geocoder.from({ latitude, longitude });
        const direccionDestino = responseDestino.results[0].formatted_address;
        // console.log(responseDestino);
        // console.log(direccionDestino);

        setPosicion(posicion);
        guardarDireccionOrigen(direccionOrigen);
        guardarDireccionDestino(direccionDestino);
      }, //success

      (error) => console.log(error), //error

      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }, //options
    );
  };

  // Hook para redireccionar
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.stepIndicator}>
        <View style={styles.stepContainer}>
          <Caption style={[styles.stepText, styles.activeStepText]}>Dirección</Caption>
          <Caption style={[styles.stepText, styles.activeStepText]}>de entrega</Caption>
        </View>
        <View style={styles.line} />

        <View style={styles.stepContainer}>
          <Caption style={styles.stepText}>Método</Caption>
          <Caption style={styles.stepText}>de pago</Caption>
        </View>

        <View style={styles.line} />

        <View style={styles.stepContainer}>
          <Caption style={styles.stepText}>Realizar</Caption>
          <Caption style={styles.stepText}>pedido</Caption>
        </View>
      </View>
      {posicion.longitude === 0 ? (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          ref={(map) => (map = map)}
          showsUserLocation={true}
          showsMyLocationButton={true}
          region={posicion}
          loadingEnabled
        >
          <Marker coordinate={posicion} pinColor="green">
            <Callout>
              <Text>Usted</Text>
            </Callout>
          </Marker>
        </MapView>
      ) : (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          ref={(map) => (map = map)}
          showsUserLocation={true}
          showsMyLocationButton={true}
          region={posicion}
          loadingEnabled
        >
          <Marker coordinate={posicion} pinColor="green">
            <Callout>
              <Text>{direcciondestino}</Text>
            </Callout>
          </Marker>
          <MapViewDirections
            origin={{
              latitude: restauranteorden.coordinates.latitude,
              longitude: restauranteorden.coordinates.longitude,
            }}
            destination={{
              latitude: posicion.latitude,
              longitude: posicion.longitude,
            }}
            apikey={Config.FIREBASE_API_KEY}
            strokeWidth={3}
            strokeColor="#FE5000"
            onReady={(result) => {
              // console.log(`Distancia: ${result.distance} km`);
              // console.log(`Tiempo de entrega: ${Math.floor(result.duration)} min.`);
              guardarTiempoEntrega(Math.floor(result.duration) + 30);
            }}
          />

          <Marker
            coordinate={{
              latitude: restauranteorden.coordinates.latitude,
              longitude: restauranteorden.coordinates.longitude,
              latitudeDelta: 0.009,
              longitudeDelta: 0.035,
            }}
            pinColor="red"
          >
            <Callout>
              <Text>{direccionorigen}</Text>
            </Callout>
          </Marker>
        </MapView>
      )}

      {/* <BuscarLocalizacion /> */}

      <View style={styles.buttonContainer}>
        <Button onPress={() => navigation.navigate('MetodoPago')} title="Siguiente" />

        <View style={styles.linkButtonContainer}>
          <LinkButton onPress={() => goBack()} title="Cancelar" titleStyle={styles.linkButton} />
        </View>
      </View>
    </View>
  );
};

export default DireccionUsuario;
