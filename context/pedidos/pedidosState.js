import React, { useReducer } from 'react';

import PedidoReducer from './pedidosReducer';
import PedidoContext from './pedidosContext';

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

const PedidoState = (props) => {
  const initialState = {
    productos: [],
    productoscategoria: [],
    productosbusqueda: [],
    negocio: null,
    categoria: null,
    restaurante: null,
    plato: null,
    favoritos: [],
    pedidocarrito: [],
    pagototal: 0,
    cantidadtotal: 0,
    tiempoentrega: '',
    direccionorigen: '',
    direcciondestino: '',
    pedido: [],
    idpedido: '',
  };

  //useReducer con dispatch para ejecutar las funciones
  const [state, dispatch] = useReducer(PedidoReducer, initialState);

  const listarProductos = (productos) => {
    dispatch({
      type: LISTAR_PRODUCTOS,
      payload: productos,
    });
  };

  const listarProductosCategoria = (productoscategoria) => {
    dispatch({
      type: LISTAR_PRODUCTOS_CATEGORIA,
      payload: productoscategoria,
    });
  };

  const listarProductosBusqueda = (productosbusqueda) => {
    dispatch({
      type: LISTAR_PRODUCTOS_BUSQUEDA,
      payload: productosbusqueda,
    });
  };

  const limpiarListaProductos = () => {
    dispatch({
      type: LIMPIAR_LISTA_PRODUCTOS,
      // payload: id,
    });
  };

  const limpiarListaProductosCategoria = () => {
    dispatch({
      type: LIMPIAR_LISTA_PRODUCTOS_CATEGORIA,
      // payload: id,
    });
  };

  const limpiarListaProductosBusqueda = () => {
    dispatch({
      type: LIMPIAR_LISTA_PRODUCTOS_BUSQUEDA,
      // payload: id,
    });
  };

  const seleccionarNegocio = (negocio) => {
    // console.log(negocio);
    dispatch({
      type: SELECCIONAR_NEGOCIO,
      payload: negocio,
    });
  };

  const seleccionarCategoria = (categoria) => {
    // console.log(categoria);
    dispatch({
      type: SELECCIONAR_CATEGORIA,
      payload: categoria,
    });
  };

  const seleccionarRestaurante = (restaurante) => {
    // console.log(restaurante);
    dispatch({
      type: SELECCIONAR_RESTAURANTE,
      payload: restaurante,
    });
  };

  const seleccionarPlato = (plato) => {
    // console.log(plato);
    dispatch({
      type: SELECCIONAR_PRODUCTO,
      payload: plato,
    });
  };

  const agregarProductoFavorito = (favoritos) => {
    dispatch({
      type: AGREGAR_PRODUCTO_FAVORITO,
      payload: favoritos,
    });
  };

  const eliminarProductoFavorito = (id) => {
    dispatch({
      type: ELIMINAR_PRODUCTO_FAVORITO,
      payload: id,
    });
  };

  const agregarProductoCarrito = (pedidocarrito) => {
    dispatch({
      type: AGREGAR_PRODUCTO_CARRITO,
      payload: pedidocarrito,
    });
  };

  const eliminarProductoCarrito = (id) => {
    dispatch({
      type: ELIMINAR_PRODUCTO_CARRITO,
      payload: id,
    });
  };

  // Suma el pago total
  const pagoTotal = (pagototal) => {
    dispatch({
      type: PAGO_TOTAL,
      payload: pagototal,
    });
  };

  // Suma la cantidad total
  const cantidadTotal = (cantidadtotal) => {
    dispatch({
      type: CANTIDAD_TOTAL,
      payload: cantidadtotal,
    });
  };

  const guardarTiempoEntrega = (tiempoentrega) => {
    dispatch({
      type: TIEMPO_ENTREGA,
      payload: tiempoentrega,
    });
  };

  const guardarDireccionOrigen = (direccionorigen) => {
    dispatch({
      type: DIRECCION_ORIGEN,
      payload: direccionorigen,
    });
  };

  const guardarDireccionDestino = (direcciondestino) => {
    dispatch({
      type: DIRECCION_DESTINO,
      payload: direcciondestino,
    });
  };

  const guardarPedido = (pedido) => {
    dispatch({
      type: GUARDAR_PEDIDO,
      payload: pedido,
    });
  };

  const pedidoRealizado = (id) => {
    dispatch({
      type: PEDIDO_REALIZADO,
      payload: id,
    });
  };

  return (
    <PedidoContext.Provider
      value={{
        productos: state.productos, // Para guardar todos productos existentes
        productoscategoria: state.productoscategoria,
        productosbusqueda: state.productosbusqueda,
        negocio: state.negocio,
        categoria: state.categoria,
        restaurante: state.restaurante,
        plato: state.plato,
        favoritos: state.favoritos,
        pedidocarrito: state.pedidocarrito, // Para guardar el pedido en el carrito
        pagototal: state.pagototal, // Para guardar el pago total
        cantidadtotal: state.cantidadtotal, // Para guardar la cantidad total
        tiempoentrega: state.tiempoentrega,
        direccionorigen: state.direccionorigen,
        direcciondestino: state.direcciondestino,
        pedido: state.pedido,
        idpedido: state.idpedido, // Para guardar el id del pedido
        listarProductos, // Funcion para listar todos productos existentes
        listarProductosCategoria,
        listarProductosBusqueda,
        limpiarListaProductos,
        limpiarListaProductosCategoria,
        limpiarListaProductosBusqueda,
        seleccionarNegocio,
        seleccionarCategoria,
        seleccionarRestaurante,
        seleccionarPlato,
        agregarProductoFavorito,
        eliminarProductoFavorito,
        agregarProductoCarrito,
        eliminarProductoCarrito,
        pagoTotal, // funcion guardar suma de pago total
        cantidadTotal, // funcion guardar suma de cantidad total
        guardarTiempoEntrega,
        guardarDireccionOrigen,
        guardarDireccionDestino,
        guardarPedido, // Funcion que guarda el pedido del carrito
        pedidoRealizado, // Funcion que guarda el id del pedido
      }}
    >
      {props.children}
    </PedidoContext.Provider>
  );
};

export default PedidoState;
