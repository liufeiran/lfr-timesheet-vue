<template>
	<div>
		<!--<el-input type="text" v-model="val" @input="changer" :disabled="meta.showInput" :class="{act:meta.submitVal}" ></el-input>-->
		<!--el-input-number不能用@input事件！！-->
		<el-input-number v-model="val" controls-position="right" @change="changer" :step="0.5" :min="0" :max="8" :disabled="meta.showInput" :class="{act:meta.submitVal}"></el-input-number>
	</div>
</template>

<script>
import {updataTable} from '../api/index.js';
export default{
	name:'myInput',
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
		changer(){
			this.cur = this.meta;//当前要修改的这一组对象（原始）
			//this.val =  parseFloat(e.target.value);//将输入的值覆盖原始值，为什么这句没有也好用呢，难道是v-model?
			//对，因为v-model双向绑定val的值自动改变了，不需要再value去赋值
			let num = this.val;
			if(isNaN(num)){
				this.list.val = 0;
			}else{
				this.list.val = parseFloat(this.val);//改好后的当前input值，覆盖list对象中的val
			}
			//let bid = this.meta['id'];//当前这一组的id，不需要id了
			this.cur[this.curWeek] = JSON.stringify(this.list);//在原始对象中用周几来找到要修改的值，把list存的新值转成json字符串，替换cur中的同名的
			//将整理好的对象和id发给接口
			updataTable(this.cur);
		}
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
	input{
		color:#ff0000;
	}
}
</style>