/**
 * Ubix
 *
 * @format
 * @flow
 */

import React from 'react';
import { Platform } from 'react-native';
import Config from 'react-native-config';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const BuscarLocalizacion = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Escribe una dirección o lugar"
      placeholderTextColor="#333"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        // console.log(data, details);
      }}
      query={{
        key: Config.FIREBASE_API_KEY,
        language: 'es',
        components: 'country:ve',
      }}
      textInputProps={{
        autoCapitalize: 'none',
        autoCorrect: false,
      }}
      fetchDetails
      enablePoweredByContainer={false}
      styles={{
        container: {
          position: 'absolute',
          top: Platform.select({ ios: 60, android: 4 }),
          width: '100%',
        },
        textInputContainer: {
          flex: 1,
          backgroundColor: 'transparent',
          height: 54,
          marginHorizontal: 50,
          borderTopWidth: 0,
          borderBottomWidth: 0,
        },
        textInput: {
          height: 39,
          margin: 0,
          borderRadius: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 20,
          paddingRight: 20,
          //   marginTop: 0,
          //   marginBottom: 0,
          //   marginLeft: 0,
          //   marginRight: 0,
          elevation: 5,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { x: 0, y: 0 },
          shadowRadius: 15,
          borderWidth: 1,
          borderColor: '#DDD',
          fontSize: 16,
          borderRadius: 4,
        },
        listView: {
          borderWidth: 1,
          borderColor: '#DDD',
          backgroundColor: '#FFF',
          marginHorizontal: 29,
          elevation: 5,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { x: 0, y: 0 },
          shadowRadius: 15,
          marginTop: 10,
          borderRadius: 4,
        },
        description: { fontSize: 15 },
        row: { padding: 20, height: 58 },
      }}
    />
  );
};

export default BuscarLocalizacion;
