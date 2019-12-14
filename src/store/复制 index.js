import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

let store = new Vuex.Store({
	state:{
		count:0;
	},
	mutations:{
		add:state=>state.count++,
		reduce:state=>state.count--
	},
	actions:{
		add(){
			return store.commit('add')
		},
		reduce(){
			return store.commit('reduce')
		}
	}
})

export default store
