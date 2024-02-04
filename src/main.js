import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/router.js";
import { createPinia } from "pinia";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiPlusCircle } from "oh-vue-icons/icons";
addIcons(BiPlusCircle);

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(pinia)
  .component("v-icon", OhVueIcon)
  .mount("#app");
