import '@/assets/tailwind.css'
import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import Firebase from '@/services/firebase';

const app = createApp(App)
const pinia = createPinia();

Firebase.authStateReady(() => {
    app.use(pinia);
    app.use(router);
    
    app.mount('#app');
})
