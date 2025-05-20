/**
 * Ubix
 *
 * @format
 * @flow
 */

// Dependencies
import React, { useContext } from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

// Components
import TabBadgeIcon from '../components/navigation/TabBadgeIcon';

// Screens
import Home from '../screens/home/Home';
import Search from '../screens/search/Search';
import Orders from '../screens/orders/OrdersB'; //
import Cart from '../screens/cart/Cart';
import Settings from '../screens/settings/SettingsA'; //

// Colors
import Colors from '../theme/colors';

import { useNavigation } from '@react-navigation/native';
import PedidoContext from '../../context/pedidos/pedidosContext';

// Firebase for screens filters
import firebase from '../../firebase';

// Config
type Props = {
  color: string,
  focused: string,
  size: number,
};

// create bottom tab navigator
const Tab = createBottomTabNavigator();

// HomeNavigator
const HomeNavigator = () => {
  // Redireccionar
  const navigation = useNavigation();
  const { cantidadtotal } = useContext(PedidoContext);
  const user = firebase.auth.currentUser; // Arreglar

  const avisoInicioSesion = () => {
    Alert.alert(
      'Aviso inicio de sesión',
      'Para utilizar esta función debe iniciar sesión',
      [
        { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
        {
          text: 'Iniciar sesión',
          onPress: () => navigation.navigate('Welcome'),
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused, size }: Props) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = `home${focused ? '' : '-outline'}`;
          } else if (route.name === 'Search') {
            iconName = 'magnify';
          } else if (route.name === 'Orders') {
            iconName = `card-text${focused ? '' : '-outline'}`;
          } else if (route.name === 'Settings') {
            iconName = `account${focused ? '' : '-outline'}`;
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.primaryColor,
        inactiveTintColor: Colors.secondaryText,
        showLabel: false, // hide labels
        style: {
          backgroundColor: Colors.whiteSmoke, // TabBar background
        },
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: (props) => (
            <TabBadgeIcon
              name={`cart${props.focused ? '' : '-outline'}`}
              badgeCount={cantidadtotal}
              {...props}
            />
          ),
        }}
      />
      {user && <Tab.Screen name="Orders" component={Orders} />}
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default HomeNavigator;
