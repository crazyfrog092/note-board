import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from './components/Main.vue' // Главная страница

Vue.use(VueRouter)

export default new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
		path: '/',
		name: 'main',
		meta: { layout: 'app-layout' },
		component: Main
	}, {
		path: '/edit/:id',
		name: 'edit',
		meta: { layout: 'app-layout' },
		component: () => import('./components/Edit.vue'),
		prors: true
	}]
})