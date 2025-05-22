# Ubix Client App
Ubix Client App is a mobile application that allows users to register, explore products from affiliated restaurants, add items to their shopping cart, and select digital payment options. The app also includes a geolocation system that facilitates product delivery, as well as a user profile that stores general information and order history.

## Features
- **Registration and Authentication**: Allows users to create accounts and access the app.
- **Product Visualization**: Browse through the menus of affiliated restaurants.
- **Shopping Cart**: Add products and manage the order before finalizing the purchase.
- **Digital Payment Options**: Integrates multiple payment methods for greater convenience.
- **Geolocation**: Uses the user's location to facilitate product delivery.
- **User Profile**: Stores general information and displays the user's order history.

## Technologies Used
### Core
- [React Native](https://www.npmjs.com/package/react-native) `v0.64.0`  
- [React](https://www.npmjs.com/package/react) `v17.0.1`  
- [React Navigation](https://www.npmjs.com/package/@react-navigation/native) `v5`  
  - Stack: `v5.14.3`, Bottom Tabs: `v5.11.8`, Native: `v5.9.3`  
- [React Native Keyboard Aware Scroll View](https://www.npmjs.com/package/react-native-keyboard-aware-scroll-view) `v0.9.3`  
- [React Native Fast Image](https://www.npmjs.com/package/react-native-fast-image) `v8.3.4`  

### UI / Styling
- [React Native Vector Icons](https://www.npmjs.com/package/react-native-vector-icons) `v8.1.0`  
- [React Native Easy Toast](https://www.npmjs.com/package/react-native-easy-toast) `v2.0.0`  
- [React Native Swiper](https://www.npmjs.com/package/react-native-swiper) `v1.6.0-nightly.3`  
- [React Native Swipe List View](https://www.npmjs.com/package/react-native-swipe-list-view) `v3.2.6`  

### State Management
- Context API  

### Maps & Geolocation
- [React Native Maps](https://www.npmjs.com/package/react-native-maps) `v0.27.1`  
- [Maps Directions](https://www.npmjs.com/package/react-native-maps-directions) `v1.8.0`  
- [React Native Geolocation Service](https://www.npmjs.com/package/react-native-geolocation-service) `v5.2.0`  
- [React Native Geocoding](https://www.npmjs.com/package/react-native-geocoding) `v0.5.0`  
- [React Native Google Places Autocomplete](https://www.npmjs.com/package/react-native-google-places-autocomplete) `v2.2.0`  

### Utilities
- [React Native Config](https://www.npmjs.com/package/react-native-config) `v1.5`  
- [React Native Permissions](https://www.npmjs.com/package/react-native-permissions) `v3.0.1`  
- [Lodash](https://www.npmjs.com/package/lodash) `v4.17.21`  
- [React Native Image Picker](https://www.npmjs.com/package/react-native-image-picker) `v3.3.2`  

### Backend as a Service
- [React Native Firebase](https://www.npmjs.com/package/@react-native-firebase/app) `v11.1.2`  
  - Módulos usados: Auth, Firestore, Storage, Cloud Messaging, Cloud Functions  
- [Geofirestore](https://www.npmjs.com/package/geofirestore) `v4.4.1`  

## Setup

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Set up Firebase:

- Create a project in Firebase and obtain the credentials.
- Create a .env file in the root of the project and add your Firebase credentials.

## Run
To start the application in development mode, run:

```bash
npx react-native run-ios
```

## Contributions
For questions or suggestions, you can contact me at [ezioeg@gmail.com].

## Contact
For questions or suggestions, you can contact me at [ezioeg@gmail.com].
