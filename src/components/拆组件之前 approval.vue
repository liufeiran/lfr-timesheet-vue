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
						    <div class="day" v-for="(item,index) in mondy" :key="index">{{item}}</div>
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
							    <el-checkbox v-for="(name,index) in cName" :label="name" :key="index">{{name}}</el-checkbox>
							</el-checkbox-group>
						</div>
					</el-col>
					<el-col :span="18" class="nbkleft">
						<div class="nbiaotou">
							<el-button type="primary" size="mini" @click="submit">批准当前工时</el-button>
							<el-button type="danger" size="mini" @click="open">驳回</el-button>
						</div>
	<div class="box">
		<!--这应该是一个组件-->
		<div class="title">&nbsp;<font v-for="(c,i) in checkedCities" :key="i">{{c}}</font><span>2019年11月19日提交审批</span></div>
							

		<div class="calendar">
			<ul>
				<li>ID 标题</li>
				<li v-for="(day, index) in days" :key="index">
		          <!--本月-->
		          <span v-if="day.getMonth()+1 != currentMonth" class="other-month">周{{datareg(index+1)}} {{day.getDate() < 10 ? `0${day.getDate()}` : day.getDate()}}</span>
		          <span v-else>
		          <!--今天-->
		          <span v-if="day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate()" class="active">周{{datareg(index+1)}} {{day.getDate() < 10 ? `0${day.getDate()}` : day.getDate()}}</span>
		          <span v-else>周{{datareg(index+1)}} {{day.getDate() < 10 ? `0${day.getDate()}` : day.getDate()}}</span>
		          </span>
		        </li>
				<li>week ∑</li>
			</ul>
			<!--input事件，只要数值改变就会触发执行函数，传入当前循环的这一项（对象）-->
			<ul v-for="(item,index) in tlist" :key="index" :class="{active:item.showInput}">
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
					</el-col>
				</el-row>
			</el-col>
		</el-row>

	</div>
</template>

<script>
	import {getTableData,subTable} from '../api/index.js';
	//import shInput from '../base/shInput.vue';
	export default{
		name:'approval',
		data() {
			return{
				activeNames: ['1'],
				activeNames1: ['1'],
				checkAll: false,
		        checkedCities: [],
		        cName: [],
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
					list: [],//接口获取数据
					tlist: [],//克隆的数据
					mondy: [],//数据中周一的日期
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
			await this.initData(null);
			await this.getData();
			await this.changeName();
			//this.tlist = this.list.concat();//数组克隆
			this.getMondy();
			this.handleChange(this.curMondy);
			//this.getdays();
			//默认显示第一个
			this.checkedCities.push(this.cName[0]);
		},
		methods:{
			changeName(str){
				if(str === undefined){
					this.tlist = this.list.concat();//数组克隆
					return;
				}
				this.tlist = this.list.filter(item=>item.cname===str);
				console.log(this.tlist)
			},
			async getData(){
				//let time = '2019-12-06'
				this.list.length=0;
				this.list = await getTableData();//获取数据是将日期数组发过去
				//得到提交的数据了
				this.list = this.list.filter(item=>item.submitVal===1);
			},
			getMondy(){
				this.tlist.forEach(item=>{
					let obj = eval("(" + item["week1"] + ")");
					this.mondy.push(obj.time);
					this.cName.push(item.cname);
				})
				this.aryDup(this.mondy);
				this.aryDup(this.cName);
			},
			aryDup(ary){
				for(let i=0;i<ary.length-1;i++){
					let cur = ary[i];
					for(let j=i+1;j<ary.length;j++){
						if(ary[j]==cur){
							ary.splice(j,1);
							j--;
						}
					}
				}
				return ary
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
			
			//网上找的切换日期
			formatDate (year, month, day) {
		        let y = year;
		        let m = month;
		        //不足两位的时间前面补零，但是补零后的时间差与不补零的时间差是不一样的！！！
		        //time.getTime('2019-12-4')和time.getTime('2019-12-04')结果不一样！！！
		        if (m < 10) m = `0${m}`;
		        let d = day;
		        if (d < 10) d = `0${d}`;
		        return `${y}-${m}-${d}`;
		    },
			//网上找的切换日期
		    initData (cur) {
		        let date = '';
		        if (cur) {
		          date = new Date(cur);
		        } else {
		          date = new Date();
		        }
		        this.currentDay = date.getDate();          // 今日日期 几号
		        this.currentYear = date.getFullYear();       // 当前年份
		        this.currentMonth = date.getMonth() + 1;    // 当前月份
		        this.currentWeek = date.getDay(); // 1...6,0   // 星期几
		        if (this.currentWeek === 0) {
		          this.currentWeek = 7;
		        }
		        let str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay);// 今日日期 年-月-日
		        this.days.length = 0;
		        // 今天是周日，放在第一行第7个位置，前面6个 这里默认显示一周，如果需要显示一个月，则第二个循环为 i<= 35- this.currentWeek
		        for (let i = this.currentWeek - 1; i >= 0; i -= 1) {
		          let d = new Date(str);
		          d.setDate(d.getDate() - i);
		          
		          this.days.push(d);
		        }
		        for (let i = 1; i <= 7 - this.currentWeek; i += 1) {
		          let d = new Date(str);
		          d.setDate(d.getDate() + i);
		          this.days.push(d);
		          //得到了每天的标准格式
		        }
		        
		       	//每次遍历之前清空数组
		        this.dayNum.length = 0;
		        this.days.forEach(item=>{
		        	let time = new Date(item);
		        	let y = time.getFullYear();
		        	let m = time.getMonth()+1;
		        	let d = time.getDate();
		        	//得到了每天的日期格式
		        	this.dayNum.push(this.formatDate(y,m,d))
		        	//得到了每天的时间戳
		        	//push(item.getTime());
		        });
		        
		      },
		      //  上个星期
//		      async weekPre() {
//		        let d = this.days[0];   // 如果当期日期是7号或者小于7号
//		        d.setDate(d.getDate() - 7);
//		        this.initData(d);
//		        await this.getData();
//		      },
//		      //  下个星期
//		      async weekNext() {
//		        let d = this.days[6];    // 如果当期日期是7号或者小于7号
//		        d.setDate(d.getDate() + 7);
//		        this.initData(d);
//		        await this.getData();
//		      },
//		      async weekCur() {
//		        this.initData();
//		        await this.getData();
//		      },
		      sumweek(str){
				//传进来的分别是字符串"week1""week2"...
				//将传进来的字符串作为对象名去匹配值，实现遍历到所有项目的当天值累加
				let total = 0;
				this.tlist.forEach(item => {
					let cur = eval("(" + item[str] + ")").val;
					if(isNaN(cur)) cur = 0;
					total += parseFloat(cur)
				})
				//将该列计算出来的值存到data的sum[str]上，以供计算属性sumtotal得出总合
				this.sum[str] = total;
				return total
			},

			submit(){
				this.tlist.forEach(item=>{
					item.showInput=true;
				})
				subTable(this.tlist)
			},
			open(){
				this.tlist.forEach(item=>{
					item.showInput=false;
				})
				subTable(this.tlist)
			},
			
			
			
			
			
			
			
			
			handleChange(str) {
				//用事件委托可以到的被点击的标签，但是不能加在el标签上
	        	let reg = /^[\d|-]+$/;//匹配以数字或-开头结尾   1到多个
	        	let cur = event.target.innerText;
	        	if(reg.test(str)){
	        		this.tlist = this.list.filter(item=>str === eval("(" + item["week1"] + ")")["time"]);
	        		return;
	        	}
	        	if(reg.test(cur)){
	        		this.tlist = this.list.filter(item=>cur === eval("(" + item["week1"] + ")")["time"]);
	        		this.initData(cur);//初始化日期，更改days，将点击的周一日期传进去
	        		return;
	        	}
	        	
	        	
	        
	      	},
	      	handleCheckAllChange(val) {
	        	this.checkedCities = val ? this.cName : [];
	        	this.isIndeterminate = false;
	      	},
	      	handleCheckedCitiesChange(value) {
	        	let checkedCount = value.length;
	        	this.checkAll = checkedCount === this.cName.length;
	        	this.isIndeterminate = checkedCount > 0 && checkedCount < this.cName.length;
	        	console.log(value)
	      	}
		},
		computed:{
			//计算右下角总合
			sumtotal() {
				let total = 0;
				for(let key in this.sum){
					if(this.sum.hasOwnProperty(key)){
						total += this.sum[key];
					}
				}
				return total;
			},
			curMondy(){
				return this.dayNum[0];
			}
		},
		components:{
			//shInput
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
}
</style>