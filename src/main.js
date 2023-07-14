import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA4pkG0mtVQ8QQAPgsJz8EBz762q8QCljc",
  authDomain: "shutter-750b6.firebaseapp.com",
  projectId: "shutter-750b6",
  storageBucket: "shutter-750b6.appspot.com",
  messagingSenderId: "1071054973584",
  appId: "1:1071054973584:web:bf0a43c4359621e3e30615",
  measurementId: "G-GSPJQ7LJHV"
};
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
