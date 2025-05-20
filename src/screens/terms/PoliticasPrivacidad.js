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

// PoliticasPrivacidad
export default class PoliticasPrivacidad extends Component {
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
            >{`Lea estas políticas de privacidad detenidamente antes de comenzar a utilizar la aplicación móvil. ${APP_NAME}.`}</Text>

            <Text style={styles.heading}>0. Información relevante</Text>
            <Text style={styles.textBlock}>
              {`La presente Política de Privacidad establece los términos en que Ubix Delivery, C.A. usa y protege la información que es proporcionada por sus usuarios al momento de utilizar su app móvil. Esta compañía está comprometida con la seguridad de los datos de sus usuarios. Cuando le pedimos llenar los campos de información personal con la cual usted pueda ser identificado, lo hacemos asegurando que sólo se empleará de acuerdo con los términos de este documento. Sin embargo esta Política de Privacidad puede cambiar con el tiempo o ser actualizada por lo que le recomendamos y enfatizamos revisar continuamente esta página para asegurarse que está de acuerdo con dichos cambios.`}
            </Text>

            <Text style={styles.heading}>1. Información recogida</Text>
            <Text style={styles.textBlock}>
              {`Nuestra app móvil podrá recoger información personal por ejemplo: Nombre, información de contacto como su dirección de correo electrónica e información demográfica. Así mismo cuando sea necesario podrá ser requerida información específica para procesar algún pedido o realizar una entrega o facturación.`}
            </Text>

            <Text style={styles.heading}>2. Uso de la información recogida</Text>
            <Text style={styles.textBlock}>
              {`Nuestra app móvil emplea la información con el fin de proporcionar el mejor servicio posible, particularmente para mantener un registro de usuarios, de pedidos en caso que aplique, y mejorar nuestros productos y servicios.  Es posible que sean enviados correos electrónicos periódicamente a través de nuestra app con ofertas especiales, nuevos productos y otra información publicitaria que consideremos relevante para usted o que pueda brindarle algún beneficio, estos correos electrónicos serán enviados a la dirección que usted proporcione y podrán ser cancelados en cualquier momento.

Ubix Delivery, C.A. está altamente comprometido para cumplir con el compromiso de mantener su información segura. Usamos los sistemas más avanzados y los actualizamos constantemente para asegurarnos que no exista ningún acceso no autorizado.`}
            </Text>

            <Text style={styles.heading}>3. Uso del caché</Text>
            <Text style={styles.textBlock}>
              {`La memoria caché es el área de almacenamiento temporal de un dispositivo que guarda algunos datos para acelerar la velocidad y el funcionamiento del móvil a no tener que almacenar los datos una y otra vez.

Nuestra app móvil emplea el uso del cache en su dispositivo móvil para poder mejorar la velocidad de carga de la app. Esto nos ayuda a brindarle un mejor servicio. Sin embargo, si usted lo desea puede dirigirse a las aplicaciones instaladas en su dispositivo móvil y eliminar el cache utilizado por nuestra app`}
            </Text>

            <Text style={styles.heading}>4. Control de su información personal</Text>
            <Text style={styles.textBlock}>
              {`Esta compañía no venderá, cederá ni distribuirá la información personal que es recopilada sin su consentimiento, salvo que sea requerido por un juez con un orden judicial.

Ubix Delivery, C.A. Se reserva el derecho de cambiar los términos de la presente Política de Privacidad en cualquier momento.`}
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
