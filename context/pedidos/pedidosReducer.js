import {
  LISTAR_PRODUCTOS,
  LISTAR_PRODUCTOS_CATEGORIA,
  LISTAR_PRODUCTOS_BUSQUEDA,
  LIMPIAR_LISTA_PRODUCTOS,
  LIMPIAR_LISTA_PRODUCTOS_CATEGORIA,
  LIMPIAR_LISTA_PRODUCTOS_BUSQUEDA,
  SELECCIONAR_NEGOCIO,
  SELECCIONAR_CATEGORIA,
  SELECCIONAR_RESTAURANTE,
  SELECCIONAR_PRODUCTO,
  AGREGAR_PRODUCTO_FAVORITO,
  ELIMINAR_PRODUCTO_FAVORITO,
  AGREGAR_PRODUCTO_CARRITO,
  ELIMINAR_PRODUCTO_CARRITO,
  PAGO_TOTAL,
  CANTIDAD_TOTAL,
  TIEMPO_ENTREGA,
  DIRECCION_ORIGEN,
  DIRECCION_DESTINO,
  GUARDAR_PEDIDO,
  PEDIDO_REALIZADO,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case LISTAR_PRODUCTOS:
      return {
        ...state,
        productos: [...state.productos, action.payload],
      };

    case LISTAR_PRODUCTOS_CATEGORIA:
      return {
        ...state,
        productoscategoria: [...state.productoscategoria, action.payload],
      };

    case LISTAR_PRODUCTOS_BUSQUEDA:
      return {
        ...state,
        productosbusqueda: [...state.productosbusqueda, action.payload],
      };

    case LIMPIAR_LISTA_PRODUCTOS:
      return {
        ...state,
        productos: [],
      };

    case LIMPIAR_LISTA_PRODUCTOS_CATEGORIA:
      return {
        ...state,
        productoscategoria: [],
      };

    case LIMPIAR_LISTA_PRODUCTOS_BUSQUEDA:
      return {
        ...state,
        productosbusqueda: [],
      };

    case SELECCIONAR_NEGOCIO:
      return {
        ...state,
        negocio: action.payload,
      };

    case SELECCIONAR_CATEGORIA:
      return {
        ...state,
        categoria: action.payload,
      };

    case SELECCIONAR_RESTAURANTE:
      return {
        ...state,
        restaurante: action.payload,
      };

    case SELECCIONAR_PRODUCTO:
      return {
        ...state,
        plato: action.payload,
      };

    case AGREGAR_PRODUCTO_FAVORITO:
      return {
        ...state,
        favoritos: [...state.favoritos, action.payload],
      };

    case ELIMINAR_PRODUCTO_FAVORITO:
      return {
        ...state,
        favoritos: state.favoritos.filter((producto) => producto.id !== action.payload),
      };

    case AGREGAR_PRODUCTO_CARRITO:
      return {
        ...state,
        pedidocarrito: [...state.pedidocarrito, action.payload],
      };

    case ELIMINAR_PRODUCTO_CARRITO:
      return {
        ...state,
        pedidocarrito: state.pedidocarrito.filter((producto) => producto.id !== action.payload),
      };

    case PAGO_TOTAL:
      return {
        ...state,
        pagototal: action.payload,
      };

    case CANTIDAD_TOTAL:
      return {
        ...state,
        cantidadtotal: action.payload,
      };

    case TIEMPO_ENTREGA:
      return {
        ...state,
        tiempoentrega: action.payload,
      };

    case DIRECCION_ORIGEN:
      return {
        ...state,
        direccionorigen: action.payload,
      };

    case DIRECCION_DESTINO:
      return {
        ...state,
        direcciondestino: action.payload,
      };

    case GUARDAR_PEDIDO:
      return {
        ...state,
        pedido: action.payload,
      };

    case PEDIDO_REALIZADO:
      return {
        ...state,
        pedidocarrito: [],
        pagototal: 0,
        cantidadtotal: 0,
        idpedido: action.payload,
      };

    default:
      return state;
  }
};
