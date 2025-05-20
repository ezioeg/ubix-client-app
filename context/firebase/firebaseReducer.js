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

export default (state, action) => {
  switch (action.type) {
    case OBTENER_USUARIO:
      return {
        ...state,
        usuarioinfo: action.payload,
      };

    case OBTENER_USUARIO_FIRESTORE:
      return {
        ...state,
        usuarioinfofirestore: action.payload,
      };

    case OBTENER_RESTAURANTES:
      return {
        ...state,
        restaurantes: action.payload,
      };

    case OBTENER_PRODUCTOS_RESTAURANTE:
      return {
        ...state,
        menurestaurante: action.payload,
      };

    case OBTENER_CLIENTE_ORDEN:
      return {
        ...state,
        clienteorden: action.payload,
      };

    case OBTENER_RESTAURANTE_ORDEN:
      return {
        ...state,
        restauranteorden: action.payload,
      };

    case OBTENER_RESTAURANTE_BY_ID:
      return {
        ...state,
        restaurantebyid: action.payload,
      };

    case OBTENER_CONFIGS:
      return {
        ...state,
        configs: action.payload,
      };

    default:
      return state;
  }
};
