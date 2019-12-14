<template>
	<div class="approval">
		<el-row>
			<el-col :span="4">
				<h4>工时审批</h4>
				<el-collapse v-model="activeNames">
				  <el-collapse-item title="等待审批" name="1">
				    <div @click="handleChange">
				    	<el-collapse v-model="activeNames1" class="other">
						  <el-collapse-item title="2019   审批所有周" name="1" >
						    <div class="day">11月11日</div>
						    <div class="day">11月18日</div>
						    <!--获取json中所有待审核的周-->
						  </el-collapse-item>
						</el-collapse>
				    </div>
				  </el-collapse-item>
				</el-collapse>
			</el-col>
			<el-col :span="20" class="bkleft">
				<el-row>
					<el-col :span="24" class="bkbottom">
						<div class="left">2019年11月18日<br />第47周 （本周）</div>
						<div class="right"><span>90小时</span></div>
					</el-col>
					<el-col :span="6">
						<div class="biaotou">
							<div class="biaotou_left"><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox></div>
							<div class="biaotou_right"><el-button type="primary" size="mini" @click="">批准已选工时</el-button></div>
						</div>
						<div class="list">
							等待审批资源列表
							<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
							    <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
							</el-checkbox-group>
						</div>
					</el-col>
					<el-col :span="18" class="nbkleft">
						<div class="nbiaotou">
							<el-button type="primary" size="mini" @click="">批准当前工时</el-button>
							<el-button type="danger" size="mini" @click="">驳回</el-button>
						</div>
						<div class="box">
							<div class="title">&nbsp;张三<span>2019年11月19日提交审批</span></div>
							
						</div>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import {getTableData,subTable} from '../api/index.js';
	export default{
		name:'approval',
		data() {
			return{
				activeNames: ['1'],
				activeNames1: ['1'],
				checkAll: false,
		        checkedCities: ['张三', '李四'],
		        cities: ['张三', '李四', '王五', '郑六'],
		        isIndeterminate: true,
		        
		        	currentYear: 1970,   // 年份
			        currentMonth: 1,  // 月份
			        currentDay: 1,    // 日期
			        currentWeek: 1,    // 星期
			        days: [],//标准时间格式
			        dayNum:[],//年-月-日格式
					search: '',
					xitong: '',
					options: [{
						value: 'val1',
						label: '系统1'
					}, {
						value: 'val2',
						label: '系统2'
					}],
					list: [],
					tlist: [],
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
					}
			}
		},
		async created(){
			await this.getData();
			this.tlist = this.list.concat();//数组克隆
		},
		methods:{
			async getData(){
				//let time = '2019-12-06'
				this.list.length=0;
				this.list = await getTableData();//获取数据是将日期数组发过去
				//得到提交的数据了
				this.list = this.list.filter(item=>item.submitVal===1);
			},
			
			
			
			
			
			
			
			
			
			handleChange(e) {
				//用事件委托可以到的被点击的标签，但是不能加在el标签上
	        	console.log(e.target);
	      	},
	      	handleCheckAllChange(val) {
	        	this.checkedCities = val ? this.cities : [];
	        	this.isIndeterminate = false;
	      	},
	      	handleCheckedCitiesChange(value) {
	        	let checkedCount = value.length;
	        	this.checkAll = checkedCount === this.cities.length;
	        	this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
	      	}
		},
		computed:{
			
		}
	}
</script>

<style lang="less">
.approval{
	width: 80%;
	height:557px;
	margin: 20px auto;
	.el-row{
		height:100%;
	}
	.other{
		padding-left: 25px;
		.day{
			padding-left: 25px;
		}
	}
	.bkleft{
		height:557px;
		border-left:3px solid #ddd;
		.biaotou{
			height:49px;
			border-bottom: 1px solid #ddd;
			display: flex;
			.biaotou_left{
				text-align: left;
				padding-top:5px ;
			}
			.biaotou_right{
				flex: 1;
				text-align: right;
				
			}
			button {
				width: 100px;
				height: 30px;
				margin: 10px;
				}
		}
		.list{
			margin-top: 10px;
			padding-left:25px;
		}
		.el-checkbox{
			display: block;
			margin:10px auto;
		}
	}
	.bkbottom{
		height:57px;
		border-bottom:1px solid #ddd;
		display: flex;
		.left{
			text-align: left;
		}
		.right{
			flex: 1;
			text-align: right;
			padding-top:10px;
			span{
				border: 1px solid #ddd;
				font-size: 20px;
				padding: 5px 15px;
			}
		}
		
	}
	.nbkleft{
		height:500px;
		border-left:3px solid #ddd;
		.nbiaotou{
			height:49px;
			border-bottom: 1px solid #ddd;
			button {
				width: 100px;
				height: 30px;
				margin: 10px;
			}
		}
	}
	.box{
		.title{
			width: 100%;
			height:40px;
			line-height: 40px;
			font-size:24px;
			span{float: right; font-size: 16px;}
		}
	}
}
</style>