/**
 * Ubix
 *
 * @format
 * @flow
 */

// import dependencies
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

// import components
import Button from '../../components/buttons/Button';
import { Caption } from '../../components/text/CustomText';

// import colors
import Colors from '../../theme/colors';

// TermsConditionsA Config
const APP_NAME = 'Ubix';

// TermsConditionsA Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  caption: {
    paddingBottom: 12,
    textAlign: 'left',
  },
  heading: {
    paddingBottom: 16,
    fontWeight: '700',
    fontSize: 16,
    color: Colors.primaryColor,
    letterSpacing: 0.2,
    textAlign: 'left',
    // writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' // iOS
  },
  textBlock: {
    paddingBottom: 24,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.primaryText,
    letterSpacing: 0.4,
    textAlign: 'left',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    width: '100%',
    backgroundColor: Colors.whiteSmoke,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  button: {
    width: '48%',
  },
});

// TermsConditionsA
export default class TermsConditionsA extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />
        <ScrollView>
          <View style={styles.content}>
            <Caption style={styles.caption}>Última actualización: 9 Febrero, 2021</Caption>
            <Text
              style={styles.textBlock}
            >{`Lea estos términos y condiciones detenidamente antes de comenzar a utilizar la aplicación móvil. ${APP_NAME}.`}</Text>

            <Text style={styles.heading}>0. Información relevante</Text>
            <Text style={styles.textBlock}>
              {`Es requisito necesario para la adquisición de los productos que se ofrecen en esta app, que lea y acepte los siguientes Términos y Condiciones que a continuación se redactan. El uso de nuestros servicios así como la compra de estos productos implicará que usted ha leído y aceptado los Términos y Condiciones de Uso en el presente documento. Todas los productos que son ofrecidos por nuestra app móvil pudieran ser creados, cobrados, enviados o presentados por un restaurante o empresa tercera y en tal caso estarían sujetas a sus propios Términos y Condiciones. En tales casos, para adquirir un producto, será necesario el registro por parte del usuario, con ingreso de datos personales fidedignos y definición de una contraseña.

El usuario puede elegir y cambiar la clave para su acceso de administración de la cuenta en cualquier momento, en caso de que se haya registrado y que sea necesario para la compra de los productos ofrecidos a traves de nuestra app móvil. Ubix no asume la responsabilidad en caso de que entregue dicha clave a terceros.

Todas las compras y transacciones que se lleven a cabo por medio de este esta app móvil, están sujetas a un proceso de confirmación y verificación, el cual podría incluir la verificación del stock y disponibilidad de producto, validación de la forma de pago, validación de la factura (en caso de existir) y el cumplimiento de las condiciones requeridas por el medio de pago seleccionado. En algunos casos puede que se requiera una verificación por medio de correo electrónico.

Los precios de los productos ofrecidos en este servicio online es válido solamente en las compras realizadas en esta app móvil.`}
            </Text>

            <Text style={styles.heading}>1. Licencia</Text>
            <Text style={styles.textBlock}>
              {`Ubix Delivery, C.A. a través de su app móvil concede una licencia para que los usuarios utilicen los productos que son vendidos en esta app móvil de acuerdo a los Términos y Condiciones que se describen en este documento.`}
            </Text>

            <Text style={styles.heading}>2. Uso no autorizado</Text>
            <Text style={styles.textBlock}>
              {`En caso de que aplique (para venta de software,templates,u otro producto de diseño y programación) usted no puede colocar uno de nuestros productos, modificado o sin modificar, en un CD, sitio web o ningún otro medio y ofrecerlos para la redistribución o la reventa de ningún tipo.`}
            </Text>

            <Text style={styles.heading}>3. Propiedad</Text>
            <Text style={styles.textBlock}>
              {`Usted no puede declarar propiedad intelectual o exclusiva a ninguno de nuestros productos, modificado o sin modificar. Todos los productos son propiedad de los proveedores del contenido. En caso de que no se especifique lo contrario, nuestros productos se proporcionan sin ningún tipo de garantía, expresa o implícita. En ningún caso esta compañía será responsable de ningún daño incluyendo, pero no limitado a, daños directos, indirectos, especiales, fortuitos o consecuentes u otras pérdidas resultantes del uso o de la imposibilidad de utilizar nuestros productos.`}
            </Text>

            <Text style={styles.heading}>4. Política de reembolso y garantía</Text>
            <Text style={styles.textBlock}>
              {`Con algunas excepciones no realizamos reembolsos después de que se envíe el producto, usted tiene la responsabilidad de entender antes de comprarlo. Le pedimos que lea cuidadosamente antes de comprarlo. Hacemos solamente excepciones con esta regla cuando la descripción no se ajusta al producto. En otros casos, pudieran tener garantía y posibilidad de reembolso pero este será especificado al comprar el producto. En tales casos la garantía solo cubrirá daños del producto y sólo se hará efectiva cuando el producto se haya dañado bajo nuestra responsabilidad.`}
            </Text>

            <Text style={styles.heading}>5. Comprobante antifraude</Text>
            <Text style={styles.textBlock}>
              {`La compra del cliente puede ser aplazada para la comprobación antifraude. También puede ser suspendida por más tiempo para una investigación más rigurosa, para evitar transacciones fraudulentas.`}
            </Text>

            <Text style={styles.heading}>5. Privacidad</Text>
            <Text style={styles.textBlock}>
              {`Ubix Delivery, C.A. garantiza que la información personal que usted envía cuenta con la seguridad necesaria. Los datos ingresados por usuario o en el caso de requerir una validación de los pedidos no serán entregados a terceros, salvo que deba ser revelada en cumplimiento a una orden judicial o requerimientos legales.

La suscripción a boletines de correos electrónicos publicitarios es voluntaria y podría ser seleccionada al momento de crear su cuenta.

Ubix Delivery, C.A. reserva los derechos de cambiar o de modificar estos términos sin previo aviso.`}
            </Text>
          </View>
        </ScrollView>

        <View style={styles.buttonsContainer}>
          <Button onPress={this.goBack} buttonStyle={styles.button} title="Rechazar" outlined />

          <Button onPress={this.goBack} buttonStyle={styles.button} title="Aceptar" />
        </View>
      </SafeAreaView>
    );
  }
}
