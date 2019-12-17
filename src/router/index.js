import Vue from 'vue';
import Router from 'vue-router';
import fill from '@/components/fill.vue';
import approval from '@/components/approval.vue';

Vue.use(Router)


export default new Router({
	//mode:'history',
  routes: [
    {path: '/',redirect:"/fill"},
    {path: '/fill',name: 'fill',component: fill},
    {path: '/approval',name: 'approval',component: approval},
  ]
})
