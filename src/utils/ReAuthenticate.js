// import firebase from '../../firebase';
import app from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

export const reauthenticate = (password) => {
  const user = app.auth().currentUser; // firebase.auth().currentUser
  const credentials = app.auth.EmailAuthProvider.credential(user.email, password); // // firebase.auth.EmailAuthProvider
  return user.reauthenticateWithCredential(credentials);
};
