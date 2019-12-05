<template>
	<div>
		<input type="text" v-model="list.val" @input="changer" />
	</div>
</template>

<script>
export default{
	name:'myInput',
	data(){
		return{
			list:{},
		}
	},
	props:{
		m:{
			type:Object,
			//default:''
			default:()=>{
				return {}
			}
		},
		w:{
			type:String,
			default:''
		}
	},
	created(){
		this.getData();
	},
	methods:{
		getData(){
			let week = this.w;
			let str = this.m[week];

			this.list = eval("("+str+")");

		},
		changer(e){
			let obj = {};
			this.list.val =  e.target.value;
			
			obj['bid'] = this.m['id'];
			obj['time'] = this.list['time'];
			obj['week'] = this.w;
			obj['val'] = parseFloat(this.list.val);
			this.$emit('zdyclick',obj);
			
		}
	},
//	computed:{
//		oVal(){
//			return this.list.val;
//		}
//	}
}
</script>

<style>
</style>