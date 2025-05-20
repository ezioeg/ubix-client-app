/**
 * Ubix
 *
 * @format
 * @flow
 */

// Dependencies
import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Components
import HeaderIconButton from '../components/navigation/HeaderIconButton';

// Screens
import Splash from '../screens/splash/Splash';
import Onboarding from '../screens/onboarding/Onboarding';
import Welcome from '../screens/welcome/WelcomeD'; //
import SignUp from '../screens/signup/SignUpA'; //
import Verification from '../screens/verification/VerificationA'; //
import SignIn from '../screens/signin/SignInA'; //
import ForgotPassword from '../screens/forgotpassword/ForgotPasswordA'; //
import TermsConditions from '../screens/terms/TermsConditions';
import PoliticasPrivacidad from '../screens/terms/PoliticasPrivacidad';
import HomeSelect from '../screens/home/HomeSelect';
import HomeNavigator from './HomeNavigator';
import Restaurant from '../screens/restaurant/Restaurant';
import Product from '../screens/product/ProductB'; //
import Categories from '../screens/categories/CategoriesA'; //
import Category from '../screens/categories/Category';
import EditProfile from '../screens/profile/EditProfileA'; //
import ChangeEmail from '../screens/profile/ChangeEmail';
import ChangePassword from '../screens/profile/ChangePassword';
import DeliveryAddress from '../screens/address/DeliveryAddress';
import AddAddress from '../screens/address/AddAddress';
import EditAddress from '../screens/address/EditAddress';
import Favorites from '../screens/favorites/Favorites';
import AboutUs from '../screens/about/AboutUs';
import DireccionUsuario from '../screens/checkout/DireccionUsuario';
import MetodoPago from '../screens/checkout/MetodoPago';
import Zelle from '../screens/checkout/Zelle';
import Banesco from '../screens/checkout/Banesco';
import Plaza from '../screens/checkout/Plaza';
import PagoMovilPlaza from '../screens/checkout/PagoMovilPlaza';
import Efectivo from '../screens/checkout/Efectivo';

import Colors from '../theme/colors';

// Global States
import FirebaseState from '../../context/firebase/firebaseState';
import PedidoState from '../../context/pedidos/pedidosState';

// Firebase for screens filters
import firebase from '../../firebase';

// Stack navigator
const Stack = createStackNavigator();

// MainNavigator
const MainNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let unmounted = false;

    let timer = setTimeout(() => {
      // console.log(!unmounted);
      if (!unmounted) {
        setIsLoading(false);
      }
    }, 3000);

    try {
      firebase.auth.onAuthStateChanged((user) => {
        user ? setLoggedIn(true) : setLoggedIn(false);
      });
    } catch (error) {
      // console.log('error mamerto:', error);
    }

    // return function cleanup() {
    //   unmounted = true;
    //   clearTimeout(timer);
    // };
    return () => {
      unmounted = true;
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <>
      <FirebaseState>
        <PedidoState>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={!isLoggedIn ? 'Onboarding' : 'HomeSelect'}
              screenOptions={{
                cardOverlayEnabled: false,
                headerStyle: {
                  elevation: 1,
                  shadowOpacity: 0,
                  backgroundColor: Colors.background,
                },
                headerBackTitleVisible: false,
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerTintColor: Colors.onBackground,
                headerTitleAlign: 'center',
              }}
            >
              {!isLoggedIn ? (
                <>
                  <Stack.Screen
                    name="Onboarding"
                    component={Onboarding}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="HomeSelect"
                    component={HomeSelect}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="HomeNavigator"
                    component={HomeNavigator}
                    options={{ headerShown: false }}
                  />

                  <Stack.Screen
                    name="Categories"
                    component={Categories}
                    options={{
                      title: 'Todas las categorías',
                    }}
                  />
                  <Stack.Screen
                    name="Category"
                    component={Category}
                    options={{
                      title: 'Categoría',
                    }}
                  />
                  <Stack.Screen
                    name="Restaurant"
                    component={Restaurant}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Product"
                    component={Product}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="AboutUs"
                    component={AboutUs}
                    options={{
                      title: 'Acerca de',
                    }}
                  />
                  <Stack.Screen
                    name="Welcome"
                    component={Welcome}
                    options={{ headerShown: false }}
                  />

                  <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{
                      title: 'Registrarse',
                      headerStyle: {
                        elevation: 0,
                        shadowOpacity: 0,
                        backgroundColor: Colors.background,
                      },
                    }}
                  />
                  <Stack.Screen
                    name="Verification"
                    component={Verification}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="SignIn"
                    component={SignIn}
                    options={{
                      title: 'Iniciar sesión',
                      headerStyle: {
                        elevation: 0,
                        shadowOpacity: 0,
                        backgroundColor: Colors.background,
                      },
                    }}
                  />
                  <Stack.Screen
                    name="TermsConditions"
                    component={TermsConditions}
                    options={{
                      title: 'Términos y Condiciones',
                    }}
                  />
                  <Stack.Screen
                    name="PoliticasPrivacidad"
                    component={PoliticasPrivacidad}
                    options={{
                      title: 'Política de Privacidad',
                    }}
                  />
                  <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                    options={{
                      headerStyle: {
                        elevation: 0,
                        shadowOpacity: 0,
                      },
                      title: '¿Olvidaste la contraseña?',
                    }}
                  />
                </>
              ) : (
                <>
                  <Stack.Screen
                    name="HomeSelect"
                    component={HomeSelect}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="HomeNavigator"
                    component={HomeNavigator}
                    options={{ headerShown: false }}
                  />

                  <Stack.Screen
                    name="Categories"
                    component={Categories}
                    options={{
                      title: 'Todas las categorías',
                    }}
                  />
                  <Stack.Screen
                    name="Category"
                    component={Category}
                    options={{
                      title: 'Categoría',
                    }}
                  />

                  <Stack.Screen
                    name="Restaurant"
                    component={Restaurant}
                    options={{ headerShown: false }}
                  />

                  <Stack.Screen
                    name="Product"
                    component={Product}
                    options={{ headerShown: false }}
                  />

                  <Stack.Screen
                    name="DireccionUsuario"
                    component={DireccionUsuario}
                    options={{
                      title: 'Pago',
                      headerStyle: {
                        elevation: 0,
                        shadowOpacity: 0,
                        backgroundColor: Colors.background,
                      },
                      headerLeft: null,
                    }}
                  />

                  <Stack.Screen
                    name="MetodoPago"
                    component={MetodoPago}
                    options={{
                      title: 'Pago',
                      headerStyle: {
                        elevation: 0,
                        shadowOpacity: 0,
                        backgroundColor: Colors.background,
                      },
                      headerLeft: null,
                    }}
                  />

                  <Stack.Screen
                    name="Zelle"
                    component={Zelle}
                    options={{
                      title: 'Zelle',
                      headerStyle: {
                        elevation: 0,
                        shadowOpacity: 0,
                        backgroundColor: Colors.background,
                      },
                    }}
                  />

                  <Stack.Screen
                    name="Banesco"
                    component={Banesco}
                    options={{
                      title: 'Banesco',
                      headerStyle: {
                        elevation: 0,
                        shadowOpacity: 0,
                        backgroundColor: Colors.background,
                      },
                    }}
                  />

                  <Stack.Screen
                    name="Plaza"
                    component={Plaza}
                    options={{
                      title: 'Banco Plaza',
                      headerStyle: {
                        elevation: 0,
                        shadowOpacity: 0,
                        backgroundColor: Colors.background,
                      },
                    }}
                  />

                  <Stack.Screen
                    name="PagoMovilPlaza"
                    component={PagoMovilPlaza}
                    options={{
                      title: 'Pago Movil Banco Plaza',
                      headerStyle: {
                        elevation: 0,
                        shadowOpacity: 0,
                        backgroundColor: Colors.background,
                      },
                    }}
                  />

                  <Stack.Screen
                    name="Efectivo"
                    component={Efectivo}
                    options={{
                      title: 'Pago Efectivo',
                      headerStyle: {
                        elevation: 0,
                        shadowOpacity: 0,
                        backgroundColor: Colors.background,
                      },
                    }}
                  />

                  <Stack.Screen
                    name="EditProfile"
                    component={EditProfile}
                    options={{
                      title: 'Editar perfil',
                    }}
                  />

                  <Stack.Screen
                    name="ChangeEmail"
                    component={ChangeEmail}
                    options={{
                      title: 'Cambiar email',
                    }}
                  />
                  <Stack.Screen
                    name="ChangePassword"
                    component={ChangePassword}
                    options={{
                      title: 'Cambiar contraseña',
                    }}
                  />

                  <Stack.Screen
                    name="DeliveryAddress"
                    component={DeliveryAddress}
                    options={({ navigation }) => ({
                      title: 'Dirección de entrega',
                    })}
                  />
                  <Stack.Screen
                    name="AddAddress"
                    component={AddAddress}
                    options={{
                      title: 'Agregar nueva dirección',
                    }}
                  />
                  <Stack.Screen
                    name="EditAddress"
                    component={EditAddress}
                    options={{
                      title: 'Editar dirección',
                    }}
                  />

                  <Stack.Screen
                    name="Favorites"
                    component={Favorites}
                    options={{
                      title: 'Mis favoritos',
                    }}
                  />
                  <Stack.Screen
                    name="AboutUs"
                    component={AboutUs}
                    options={{
                      title: 'Acerca de',
                    }}
                  />
                  <Stack.Screen
                    name="TermsConditions"
                    component={TermsConditions}
                    options={{
                      title: 'Términos y Condiciones',
                    }}
                  />
                  <Stack.Screen
                    name="PoliticasPrivacidad"
                    component={PoliticasPrivacidad}
                    options={{
                      title: 'Política de Privacidad',
                    }}
                  />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </PedidoState>
      </FirebaseState>
    </>
  );
};

export default MainNavigator;
