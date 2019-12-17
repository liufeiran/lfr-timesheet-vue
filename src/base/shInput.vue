<template>
	<div>
		<div class="box">
		<!--这应该是一个组件，拿到父级传来的人名和当前日期的数据对象进行渲染-->
		<div class="title">&nbsp;{{zjname}}<span><!--2019年11月19日提交审批--></span></div>
							

		<div class="calendar" v-model="listAll">
			<ul>
				<li>ID 标题</li>
				<li v-for="(day, index) in zjdays" :key="index">
		          <!--本月-->
		          <span v-if="day.getMonth()+1 != zjcurrentMonth" class="other-month">周{{datareg(index+1)}} {{day.getDate() < 10 ? `0${day.getDate()}` : day.getDate()}}</span>
		          <span v-else>
		          <!--今天-->
		          <span v-if="day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate()" class="active">周{{datareg(index+1)}} {{day.getDate() < 10 ? `0${day.getDate()}` : day.getDate()}}</span>
		          <span v-else>周{{datareg(index+1)}} {{day.getDate() < 10 ? `0${day.getDate()}` : day.getDate()}}</span>
		          </span>
		        </li>
				<li>week ∑</li>
			</ul>
			<!--input事件，只要数值改变就会触发执行函数，传入当前循环的这一项（对象）-->
			<ul v-for="(item,index) in list" :key="index" :class="{active:item.showInput}">
				<li>{{item.id}} {{item.name}}</li>
				<li>{{weVal(item,week1)}}</li>
				<li>{{weVal(item,week2)}}</li>
				<li>{{weVal(item,week3)}}</li>
				<li>{{weVal(item,week4)}}</li>
				<li>{{weVal(item,week5)}}</li>
				<li>{{weVal(item,week6)}}</li>
				<li>{{weVal(item,week7)}}</li>
				<li>{{weVal(item,week1)+weVal(item,week2)+weVal(item,week3)+weVal(item,week4)+weVal(item,week5)+weVal(item,week6)+weVal(item,week7)}}</li>
			</ul>
			<ul class="lastul">
				<li>合计：</li>
				<li>{{sumweek("week1")}}</li>
				<li>{{sumweek("week2")}}</li>
				<li>{{sumweek("week3")}}</li>
				<li>{{sumweek("week4")}}</li>
				<li>{{sumweek("week5")}}</li>
				<li>{{sumweek("week6")}}</li>
				<li>{{sumweek("week7")}}</li>
				<li>{{sumtotal}}</li>
			</ul>
		</div>
						</div>
	</div>
</template>

<script>

export default{
	name:'shInput',
	data(){
		return{
			week1:'week1',
			week2:'week2',
			week3:'week3',
			week4:'week4',
			week5:'week5',
			week6:'week6',
			week7:'week7',
			sum:{
				week1:0,
				week2:0,
				week3:0,
				week4:0,
				week5:0,
				week6:0,
				week7:0
			},
			list:[]
		}
	},
	props:{
		zjcheckedCities:{
			type:Array,
			//default:''
			default:()=>{
				return []
			}
		},
		zjdays:{
			type:Array,
			default:()=>{
				return []
			}
		},
		zjtlist:{
			type:Array,
			default:()=>{
				return []
			}
		},
		zjcurrentMonth:{
			type:Number,
			default:1
		},
		zjname:{
			type:String,
			default:''
		}
	},
	async created(){
		await this.getData();
	},
	methods:{
		getData(){
			//console.log(this.zjtlist,"13");
			this.list = this.zjtlist.length !== 0 ? this.zjtlist.filter(item=>item.cname==this.zjname) : [];
		},
		weVal(item,week){
				//将当前循环的这一项item和周几传入，把字符串转为对象，通过obj.val取值
				let obj = eval("(" + item[week] + ")");
				return parseFloat(obj.val)
			},
		datareg(str){
				//匹配数字转换成大写的周
				str = str.toString();
				let ary = ["零","一","二","三","四","五","六","日","八","九"];
				str = str.replace(/\d/g,function(){
					return ary[arguments[0]]
				})
				return str
			},
		sumweek(str){
				//传进来的分别是字符串"week1""week2"...
				//将传进来的字符串作为对象名去匹配值，实现遍历到所有项目的当天值累加
				let total = 0;
				this.list.forEach(item => {
					let cur = eval("(" + item[str] + ")").val;
					if(isNaN(cur)) cur = 0;
					total += parseFloat(cur)
				})
				//将该列计算出来的值存到data的sum[str]上，以供计算属性sumtotal得出总合
				this.sum[str] = total;
				return total
			},
	},
	computed:{
		//设置一个计算属性，绑在表格的div上，如果父级的tlist改变，相应传进来的zjtlist也会改变，zjtlist改变通过计算属性listAll会自动更新自己的list
		listAll(){
			return this.list = this.zjtlist.length !== 0 ? this.zjtlist.filter(item=>item.cname==this.zjname) : [];
		},
		sumtotal() {
			let total = 0;
			for(let key in this.sum){
				if(this.sum.hasOwnProperty(key)){
					total += this.sum[key];
				}
			}
			return total;
		},
	}
}
</script>

<style lang="less">
.box{
		.title{
			width: 100%;
			height:40px;
			line-height: 40px;
			font-size:24px;
			span{float: right; font-size: 16px;}
		}
	.calendar {
		ul {
			display: flex;
			li {
				display: flex;
				line-height: 30px;
				flex: 1;
				justify-content: center;
				align-items: center;
				border: 1px solid #dedede;
				input {
					width: 100%;
					border: none;
					text-align: center;
				}
			}
			li:first-child {
				flex: 2;
			}
			li:last-child {
				background-color: #ededed;
			}
		}
		.lastul {
			background-color: #ededed;
		}
		.active{
			li{
				color:#00bb00;
			}
		}
	}
	}
</style>