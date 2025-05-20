import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import PedidoContext from '../../../context/pedidos/pedidosContext';
import firebase from '../../../firebase';

import { Caption } from '../../components/text/CustomText';
import Button from '../../components/buttons/Button';
import LinkButton from '../../components/buttons/LinkButton';
import Colors from '../../theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#fff',
  },
  button: {
    backgroundColor: '#FE5000',
  },
  tiempo: {
    marginBottom: 20,
    fontSize: 30,
    textAlign: 'center',
    marginTop: 30,
  },
  textoVerificado: {
    textAlign: 'center',
    marginBottom: 10,
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
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: Colors.background,
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

const StatusPedido = () => {
  const { idpedido } = useContext(PedidoContext);

  const [tiempo, setTiempo] = useState(0);
  const [verificado, setVerificado] = useState(false);
  const [entregado, setEntregado] = useState(false);

  const user = firebase.auth.currentUser; // arreglar
  const usuarioID = user.uid; // arreglar

  useEffect(() => {
    const obtenerStatusPedido = async () => {
      await firebase.db
        .collection('clientes')
        .doc(usuarioID)
        .collection('ordenes')
        .doc(idpedido)
        .onSnapshot(function (doc) {
          setTiempo(doc.data().tiempoentrega);
          setVerificado(doc.data().verificado);
          setEntregado(doc.data().entregado);
        });
    };
    obtenerStatusPedido();
  }, []);

  // Muestra el countdown en la pantalla
  const renderer = ({ minutes, seconds }) => {
    return (
      <Text style={styles.tiempo}>
        {minutes}: {seconds}
      </Text>
    );
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.stepIndicator}>
        <View style={styles.stepContainer}>
          <Caption style={styles.stepText}>Dirección</Caption>
          <Caption style={styles.stepText}>de entrega</Caption>
        </View>
        <View style={styles.line} />

        <View style={styles.stepContainer}>
          <Caption style={styles.stepText}>Método</Caption>
          <Caption style={styles.stepText}>de pago</Caption>
        </View>

        <View style={styles.line} />

        <View style={styles.stepContainer}>
          <Caption style={[styles.stepText, styles.activeStepText]}>Status</Caption>
          <Caption style={[styles.stepText, styles.activeStepText]}>orden</Caption>
        </View>
      </View>
      <View style={[styles.container, { marginTop: 170 }]}>
        {!verificado && (
          <>
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Verificando su pago!</Text>
            <Text style={{ textAlign: 'center' }}>Espere aquí o vaya a "mis órdenes"</Text>
            <Text style={{ textAlign: 'center' }}>para ver el status de su orden</Text>
            <View style={{ marginTop: 20 }}>
              <ActivityIndicator animating color={'#FE5000'} size="large" />
            </View>
          </>
        )}

        {verificado && tiempo > 0 && !entregado && (
          <>
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
              Su pago ha sido verificado!
            </Text>
            <Text style={{ textAlign: 'center' }}>Espere aquí o vaya a "mis órdenes"</Text>
            <Text style={{ textAlign: 'center' }}>para ver el status de su orden</Text>
            <Text></Text>
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
              Esté atento a su celular!
            </Text>
            <Text style={{ textAlign: 'center' }}>
              Pronto haremos contacto para la entrega de su orden
            </Text>
            <Text style={{ textAlign: 'center' }}>Tiempo de entrega estimado: {tiempo} min</Text>
          </>
        )}
        {verificado && entregado && (
          <>
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
              Su orden ha sido entregada!
            </Text>
            <Text style={{ textAlign: 'center' }}>Los detalles de sus órdenes quedan</Text>
            <Text style={{ textAlign: 'center' }}>registradas en la sección de "mis órdenes"</Text>
          </>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button onPress={() => navigation.navigate('Orders')} title="Ir a mis órdenes" />

        <View style={styles.linkButtonContainer}>
          <LinkButton
            onPress={() => navigation.navigate('Home')}
            title="Ir a home"
            titleStyle={styles.linkButton}
          />
        </View>
      </View>
    </View>
  );
};

export default StatusPedido;
