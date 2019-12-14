<template>
<div>
	<p>{{num}}</p>
	<p><button @click="add">+</button> <button @click="reduce">-</button></p>
</div>
</template>

<script>
import store from '../store/index.js'
export default{
	name:'cc',
	data(){
		return{}
	},
	store,
	methods:{
		add(){
			this.$store.dispatch('add')
		},
		reduce(){
			this.$store.dispatch('reduce')
		}
	},
	computed:{
		num(){
			return this.$store.state.count;
		}
	}
}
</script>

<style>
</style>