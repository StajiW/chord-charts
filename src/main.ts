import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import MainVue from './Main.vue'
import LoginVue from './Login.vue'
import EditorVue from './Editor.vue'

const routes = [
    { path: '/', component: MainVue },
    { path: '/login', component: LoginVue },
    { path: '/editor', component: EditorVue }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App).use(router).mount('#app')