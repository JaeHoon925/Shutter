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
  apiKey: "AIzaSyCd2NzjeRvGrgxHDn390Sf4tcCLYtAYsuI",
  authDomain: "shutter-848c6.firebaseapp.com",
  databaseURL: "https://shutter-848c6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shutter-848c6",
  storageBucket: "shutter-848c6.appspot.com",
  messagingSenderId: "5713652290",
  appId: "1:5713652290:web:0111e35ef1856c3f4c9bdb",
  measurementId: "G-3NNH81L3PS"
};
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
