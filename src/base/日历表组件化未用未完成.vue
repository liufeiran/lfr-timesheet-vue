<template>
	<div class="calendar">
		<ul>
			<li>ID 标题</li>
			<li>周一25</li>
			<li>周二26</li>
			<li>周三27</li>
			<li>周四28</li>
			<li>周五29</li>
			<li>周六30</li>
			<li>周日1</li>
			<li>week ∑</li>
		</ul>
		<ul v-for="(item,index) in tableData" :key="index">
			<li>{{item.id}} {{item.name}}</li>
			<li><input type="text" v-model="item.week1" @input="mytotal"/></li>
			<li><input type="text" v-model="item.week2" @input="mytotal"/></li>
			<li><input type="text" v-model="item.week3" @input="mytotal"/></li>
			<li><input type="text" v-model="item.week4" @input="mytotal"/></li>
			<li><input type="text" v-model="item.week5" @input="mytotal"/></li>
			<li><input type="text" v-model="item.week6" @input="mytotal"/></li>
			<li><input type="text" v-model="item.week7" @input="mytotal"/></li>
			<li>{{item.total}}</li>
		</ul>
		<ul class="lastul">
			<li>合计：</li>
			<li>{{sumweek1}}</li>
			<li>{{sumweek2}}</li>
			<li>{{sumweek3}}</li>
			<li>{{sumweek4}}</li>
			<li>{{sumweek5}}</li>
			<li>{{sumweek6}}</li>
			<li>{{sumweek7}}</li>
			<li>{{sumtotal}}</li>
		</ul>
  	</div>
</template>
<script type="text/javascript">
export default{
	name:"ftable",
	data(){
		return{
			
		}
	},
	props:{//接收父传属性
		tableData:{
			type:Array,
			default:()=>{
				return []
			}
		}
	},
	created(){//初始化
		this.mytotal();
	},
	mounted(){//挂载操作dom

	},
	methods:{//方法
		 mytotal(){
			let total = 0;
//做法1
//			this.tableData.forEach(item=>{
//				let ary = [];
//				for(let i in item){
//					let cur = item[i];
//					if(isNaN(parseFloat(cur))) cur=0;
//					ary.push(parseFloat(cur));
//				}
//				ary = ary.slice(3);
//				item.total = eval(ary.join('+'))
//			})

//做法2
			this.tableData.forEach(item=>{
				//let ary = [];
				let {week1,week2,week3,week4,week5,week6,week7} = item;
				if(isNaN(parseFloat(week1))) week1 = 0;
				if(isNaN(parseFloat(week2))) week2 = 0;
				if(isNaN(parseFloat(week3))) week3 = 0;
				if(isNaN(parseFloat(week4))) week4 = 0;
				if(isNaN(parseFloat(week5))) week5 = 0;
				if(isNaN(parseFloat(week6))) week6 = 0;
				if(isNaN(parseFloat(week7))) week7 = 0;
				item.total = parseFloat(week1)+parseFloat(week2)+parseFloat(week3)+parseFloat(week4)+parseFloat(week5)+parseFloat(week6)+parseFloat(week7);
			})
		},
		
	},
	computed:{//计算属性
		sumweek1(){
			let total = 0;
			this.tableData.forEach(item=>{
				let cur = item.week1;
				if(isNaN(parseFloat(cur))) cur=0;
				total += parseFloat(cur)
			})
			return total
		},
		sumweek2(){
			let total = 0;
			this.tableData.forEach(item=>{
				let cur = item.week2;
				if(isNaN(parseFloat(cur))) cur=0;
				total += parseFloat(cur)
			})
			return total
		},
		sumweek3(){
			let total = 0;
			this.tableData.forEach(item=>{
				let cur = item.week3;
				if(isNaN(parseFloat(cur))) cur=0;
				total += parseFloat(cur)
			})
			return total
		},
		sumweek4(){
			let total = 0;
			this.tableData.forEach(item=>{
				let cur = item.week4;
				if(isNaN(parseFloat(cur))) cur=0;
				total += parseFloat(cur)
			})
			return total
		},
		sumweek5(){
			let total = 0;
			this.tableData.forEach(item=>{
				let cur = item.week5;
				if(isNaN(parseFloat(cur))) cur=0;
				total += parseFloat(cur)
			})
			return total
		},
		sumweek6(){
			let total = 0;
			this.tableData.forEach(item=>{
				let cur = item.week6;
				if(isNaN(parseFloat(cur))) cur=0;
				total += parseFloat(cur)
			})
			return total
		},
		sumweek7(){
			let total = 0;
			this.tableData.forEach(item=>{
				let cur = item.week7;
				if(isNaN(parseFloat(cur))) cur=0;
				total += parseFloat(cur)
			})
			return total
		},
		sumtotal(){
			let total = 0;
			return total += this.sumweek1 + this.sumweek2 + this.sumweek3 + this.sumweek4 + this.sumweek5 + this.sumweek6 + this.sumweek7;
		}
//		total(){
//			let total = 0;
//			this.tableData.forEach(item=>{
//				//if(isNaN(parseFloat(item.week1))) item.week1=0;
//				item.total = parseFloat(item.week1)+parseFloat(item.week2)+parseFloat(item.week3)+parseFloat(item.week4)+parseFloat(item.week5)+parseFloat(item.week6)+parseFloat(item.week7);
//			})
//		}
	},
	components:{}//注册组件
}
</script>
<style lang="less">
/*scoped*/
.calendar{
	ul{
		display:flex;
		li{
			display: flex;
			line-height: 30px;
			flex: 1;
			justify-content: space-around;
			align-items: center;
			border:1px solid #dedede;
			input{
				width:100%;
				border:none;
				text-align: center;
			}
		}
		li:first-child{
			flex: 2;
		}
		li:last-child{
			background-color: #ededed;
		}
	}
	.lastul{
		background-color: #ededed;
	}
}
</style>