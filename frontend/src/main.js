import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import App from './App.vue'

import '@/assets/css/tailwind.css'

import SubmitSession from './SubmitSession.vue'
import LogList from './LogList.vue'

const routes = [
    { path: '/', component: SubmitSession },
    { path: '/log', component: LogList },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App).use(router).mount('#app')