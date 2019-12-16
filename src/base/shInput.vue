<template>
	<div>
		暂时不用这个组件
		<!--<el-input type="text" v-model="val" @input="changer" :disabled="meta.showInput" :class="{act:meta.submitVal}" ></el-input>-->
		<!--el-input-number不能用@input事件！！-->
		<el-input v-model="val" ></el-input>
		{{val}}
	</div>
</template>

<script>

export default{
	name:'shInput',
	data(){
		return{
			//showInput:false,
			list:{},
			cur:{},
			val:0,	//这个val的主要作用是v-model
			curWeek:''
		}
	},
	props:{
		meta:{
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
		datareg(str){
				//匹配数字转换成大写的周
				str = str.toString();
				let ary = ["week7","week1","week2","week3","week4","week5","week6"];
				str = str.replace(/\d/g,function(){
					return ary[arguments[0]]
				})
				return str
			},
		getData(){
			let time = new Date(this.w);
			let num = time.getDay();
			this.curWeek = this.datareg(num);
			
			
			let week = this.curWeek;//得到传进来的周几
			let str = this.meta[week];//在传进来的对象中得到该周的数据（字符串）
			this.list = eval("("+str+")");//将这个字符串转为对象
			this.val = this.list.val;//把读出来的input原始值放到这里
		},
		
	},

}
</script>

<style lang="less">
.el-input-number{
	width:auto;
}
.el-input-number__decrease, .el-input-number__increase{
	width:15px;
}
.el-input-number.is-controls-right .el-input__inner{
	padding-left:0;
	padding-right:0;
}
.act{
	input {
		color:#ff0000;
	}
}
</style>