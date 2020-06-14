import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

import firebase from 'firebase/app'
import 'firebase/database'

import './js/main.js'
import './css/main.css' // На всякий случай, но возможно, что не будет использоваться
import './scss/imports.scss' // В нем импортируются все наши стили и line-awesome

Vue.component('notelist-component', require('./components/NoteList.vue').default)

Vue.component("modal", require('./components/Modal.vue').default)

firebase.initializeApp({
  apiKey: 'AIzaSyDxDAN88gHxnXl4z4rg5UyT7QGTNbPEoTY',
  authDomain: 'vue-note-board.firebaseapp.com',
  databaseURL: 'https://vue-note-board.firebaseio.com',
  projectId: 'vue-note-board',
  storageBucket: 'vue-note-board.appspot.com',
  messagingSenderId: '220367961435',
  appId: '1:220367961435:web:940b34d49537cac8a02e7e',
  measurementId: 'G-ZCE31D48G7'
})

const app = new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')