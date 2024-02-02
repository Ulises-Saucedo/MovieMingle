import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router.js'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiPlusCircle } from "oh-vue-icons/icons";
addIcons(BiPlusCircle);

createApp(App).use(router).component("v-icon", OhVueIcon).mount('#app')