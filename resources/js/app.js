/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

// import Dashboard from "./components/Dashboard";

require('./bootstrap');

import Vue from 'vue';
import MainApp from './components/MainApp.vue';
import VueRouter from 'vue-router';
import Routes from "./routes";
Vue.use(VueRouter)


const router = new VueRouter({
        routes:Routes,
    mode:'history'

    });
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/MainApp.vue -> <example-component></example-component>
 */



/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router,

});
