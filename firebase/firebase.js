// import app from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/storage';
// import 'firebase/auth';

import app from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

import firebaseConfig from './config';

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.db = app.firestore();
    this.fire = app.firestore;
    this.storage = app.storage();
    this.auth = app.auth();
  }
}

const firebase = new Firebase();
export default firebase;
