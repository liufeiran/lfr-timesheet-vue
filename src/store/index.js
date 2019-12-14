import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

//let store = new Vuex.Store({
//	state:{
//		count:0,
//	},
//	mutations:{
//		add:state=>state.count++,
//		reduce:state=>state.count--
//	},
//	actions:{
//		add(){
//			setTimeout(function(){
//				store.commit('add')
//			},500)
//			
//		},
//		reduce(){
//			setTimeout(function(){
//				store.commit('reduce')
//			},500)
//			
//		}
//	}
//})
let state = {
	count:0
};
let mutations = {
	add:state=>state.count++,
	reduce:state=>state.count--
};
let actions = {
	add({commit}){
		commit('add')
	},
	reduce:({commit})=>commit('reduce')
}

let store = new Vuex.Store({
	state,mutations,actions
})

export default store
