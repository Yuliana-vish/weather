import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as firebase from 'firebase/app';

firebase.initializeApp({
  apiKey: 'AIzaSyBB3QUPwuAq8isKCO68xfCT-3PXkWimC2w',
  authDomain: 'weather-app-52604.firebaseapp.com',
  projectId: 'weather-app-52604',
  storageBucket: 'weather-app-52604.appspot.com',
  messagingSenderId: '273700270071',
  appId: '1:273700270071:web:27ac3f2414187fb47e08f2',
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
