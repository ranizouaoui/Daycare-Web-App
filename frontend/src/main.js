import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router/routes';
import store from './store/index'
import { SYNC_FUSION_LICENSE_KEY } from './API/Api'; 
// CSS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css';
// // Import the CSS files
// import 'aos/dist/aos.css';
import 'boxicons/css/boxicons.min.css';
import 'glightbox/dist/css/glightbox.min.css';
import 'remixicon/fonts/remixicon.css';
import 'swiper/swiper-bundle.min.css';

import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(SYNC_FUSION_LICENSE_KEY);

const app = createApp({
    beforeCreate() {
        // Vérifiez si l'utilisateur est enregistré
        const uidUser = localStorage.getItem('uidUser');

        if (uidUser !== null) {
            // Redirigez l'utilisateur vers la page /user
            this.$router.push('/user');
        }
    },
    render: () => h(App),
});
app.use(store).use(router).mount('#app')