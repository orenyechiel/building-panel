import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'reset-css';
import './assets/style/fonts.scss'
// import './assets/style/general.scss'


router.beforeEach(function(to, from, next){
    if(to.fullPath === "/private-area" && !localStorage.getItem('contractIdStorage')) {
        next({fullPath: '/'})
    } else {
        next()
    }
})

const app = createApp(App);

app.use(store).use(router).mount('#app');
