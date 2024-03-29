/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

// import Dashboard from "./components/Dashboard";

require('./bootstrap');
import Vue from 'vue';
import {Form , HasError , AlertError } from 'vform';
window.Form = Form;
Vue.component(HasError.name , HasError)
Vue.component(AlertError.name , AlertError)
import MainApp from './components/MainApp.vue';
import VueRouter from 'vue-router';

import Routes from "./routes";
Vue.use(VueRouter)

//import progress bar
import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
    height:'2px',
    failedColor: 'red',
    speed: '0.2s',
});

//import sweetalert2
import Swal from 'sweetalert2';
window.Swal= Swal;

let Fire = new Vue();
window.Fire = Fire;
/***
or
window.Fire =new Vue();

 ***/


const router = new VueRouter({
        routes:Routes,
    mode:'history'

    });


Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue').default
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue').default
);



const app = new Vue({
    el: '#app',
    router,

});
