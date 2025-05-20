import React, { useReducer } from 'react';

import firebase from '../../firebase'; // index
import FirebaseReducer from './firebaseReducer';
import FirebaseContext from './firebaseContext';

import _ from 'lodash';

import {
  OBTENER_USUARIO,
  OBTENER_USUARIO_FIRESTORE,
  OBTENER_RESTAURANTES,
  OBTENER_PRODUCTOS_RESTAURANTE,
  OBTENER_CLIENTE_ORDEN,
  OBTENER_RESTAURANTE_ORDEN,
  OBTENER_RESTAURANTE_BY_ID,
  OBTENER_CONFIGS,
} from '../types';

const FirebaseState = (props) => {
  const initialState = {
    usuarioinfo: [],
    usuarioinfofirestore: [],
    restaurantes: [],
    menurestaurante: [],
    clienteorden: [],
    restauranteorden: [],
    restaurantebyid: [],
    configs: [],
  };

  // useReducer con dispatch para ejecutar las funciones
  const [state, dispatch] = useReducer(FirebaseReducer, initialState);
  // Workaround

  // Obtener la info del usuario que se guarda en el firebase.auth
  const obtenerUsuarioInfo = async () => {
    const user = await firebase.auth.currentUser;
    const usuarioInfo = user.providerData[0];
    // console.log(usuarioInfo);

    dispatch({
      type: OBTENER_USUARIO,
      payload: usuarioInfo,
    });
  };

  // Obtener la info del usuario que se guarda en firestore
  const obtenerUsuarioInfoFirestore = async () => {
    const user = await firebase.auth.currentUser;
    const usuarioID = user.uid;
    // console.log(user);
    firebase.db
      .collection('clientes')
      .doc(usuarioID)
      .onSnapshot(function (doc) {
        const usuarioInfoFirestore = {
          id: doc.id,
          ...doc.data(),
        };

        dispatch({
          type: OBTENER_USUARIO_FIRESTORE,
          payload: usuarioInfoFirestore,
        });
      });
  };

  const obtenerRestaurantes = (negocioNombre) => {
    firebase.db
      .collection('restaurantes')
      .where('negocioTipo', '==', negocioNombre)
      .onSnapshot(manejarSnapshot);

    function manejarSnapshot(snapshot) {
      let restaurantes = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      // Tenemos resultados de la base de datos
      dispatch({
        type: OBTENER_RESTAURANTES,
        payload: restaurantes,
      });
      // console.log(restaurantes);
    }
  };

  const obtenerProductosRestaurante = (id) => {
    firebase.db
      .collection('restaurantes')
      .doc(id)
      .collection('productos')
      // .where('existencia', '==', true)
      .onSnapshot(manejarSnapshot);

    function manejarSnapshot(snapshot) {
      let platosRestaurante = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      // Ordenar por categoria con lodash
      platosRestaurante = _.sortBy(platosRestaurante, 'categoria');

      dispatch({
        type: OBTENER_PRODUCTOS_RESTAURANTE,
        payload: platosRestaurante,
      });
      // console.log(platosRestaurante);
    }
  };

  // Principalmente para obtener las coordenadas de destino
  const obtenerClienteOrden = (clienteid) => {
    // console.log(clienteid);
    firebase.db
      .collection('clientes')
      .doc(clienteid)
      .onSnapshot(function (doc) {
        const clienteOrden = {
          id: doc.id,
          ...doc.data(),
        };

        // console.log(clienteOrden.coordinates.latitude);
        // console.log(clienteOrden.coordinates.longitude);

        dispatch({
          type: OBTENER_CLIENTE_ORDEN,
          payload: clienteOrden,
        });
      });
  };

  // Principalmente para obtener las coordenadas de origen
  const obtenerRestauranteOrden = (restauranteid) => {
    // console.log(restauranteid);
    firebase.db
      .collection('restaurantes')
      .doc(restauranteid)
      .onSnapshot(function (doc) {
        const restauranteOrden = {
          id: doc.id,
          ...doc.data(),
        };

        // console.log('3', restauranteOrden.coordinates.latitude);
        // console.log('4', restauranteOrden.coordinates.longitude);

        dispatch({
          type: OBTENER_RESTAURANTE_ORDEN,
          payload: restauranteOrden,
        });
      });
  };

  //
  const obtenerRestauranteById = (restauranteid) => {
    firebase.db
      .collection('restaurantes')
      .doc(restauranteid)
      .onSnapshot(function (doc) {
        const restauranteById = {
          id: doc.id,
          ...doc.data(),
        };
        dispatch({
          type: OBTENER_RESTAURANTE_BY_ID,
          payload: restauranteById,
        });
      });
  };

  const obtenerConfigs = () => {
    firebase.db
      .collection('configuraciones')
      .doc('0')
      .onSnapshot(function (doc) {
        const configs = {
          ...doc.data(),
        };
        dispatch({
          type: OBTENER_CONFIGS,
          payload: configs,
        });
      });
  };

  return (
    <FirebaseContext.Provider
      value={{
        usuarioinfo: state.usuarioinfo,
        usuarioinfofirestore: state.usuarioinfofirestore,
        restaurantes: state.restaurantes,
        menurestaurante: state.menurestaurante,
        clienteorden: state.clienteorden,
        restauranteorden: state.restauranteorden,
        restaurantebyid: state.restaurantebyid,
        configs: state.configs,
        obtenerUsuarioInfo,
        obtenerUsuarioInfoFirestore,
        obtenerRestaurantes,
        obtenerProductosRestaurante,
        obtenerClienteOrden,
        obtenerRestauranteOrden,
        obtenerRestauranteById,
        obtenerConfigs,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseState;
