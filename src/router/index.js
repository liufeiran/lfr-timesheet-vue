import Vue from 'vue';
import Router from 'vue-router';
import fill from '@/components/fill.vue';
import test from '@/components/test.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',redirect:"/fill"},
    {path: '/fill',name: 'fill',component: fill},
    {path: '/test',name: 'test',component: test},
  ]
})
