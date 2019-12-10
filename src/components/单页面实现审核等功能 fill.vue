<template>
	<div class="fill">
		<h4>工时填报</h4>
		<div class="fill_title">
			<div class="fill_title_left">
				<a href="javascript:;" class="iconfont iconshixiangzuojiantou-" @click="weekPre"></a>
				<div class="time">{{ currentYear }} 年{{this.days[0].getMonth()+1 < 10 ? `0${this.days[6].getMonth()+1}` : this.days[0].getMonth()+1}}月{{this.days[0].getDate() < 10 ? `0${this.days[0].getDate()}`:this.days[0].getDate()}}日 - {{this.days[6].getMonth()+1 < 10 ? `0${this.days[6].getMonth()+1}` : this.days[6].getMonth()+1}}月{{this.days[6].getDate() < 10 ? `0${this.days[6].getDate()}`:this.days[6].getDate()}}日</div>
				<a href="javascript:;" class="iconfont iconshixiangyoujiantou-" @click="weekNext"></a>
				<a href="javascript:;" class="thisTime" @click="weekCur">本周</a>
				<!--<el-button type="primary" size="mini" @click="add">增加</el-button>-->
			</div>
			<div class="fill_title_right">
				<el-button type="primary" size="mini" @click="submitVal">提交审批</el-button>
				<el-button type="primary" size="mini" @click="recall">撤回</el-button>
				<el-button type="primary" size="mini" @click="submit">审批通过</el-button>
				<el-button type="primary" size="mini" @click="open">打开</el-button>
			</div>
		</div>
		<div class="search">
			<div class="demo-input-suffix">
				<el-input v-model="search" placeholder="关键词过滤" prefix-icon="iconfont iconfilter" size="mini" @input="input">
				</el-input>
			</div>
			<div class="xitong">
				<el-select v-model="xitong" placeholder="系统">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
		</div>
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
			<ul v-for="(item,index) in list" :key="index">
				<li>{{item.id}} {{item.name}}</li>
				<li><myInput :meta="item" :w="dayNum[0]"></myInput></li>
				<li><myInput :meta="item" :w="dayNum[1]"></myInput></li>
				<li><myInput :meta="item" :w="dayNum[2]"></myInput></li>
				<li><myInput :meta="item" :w="dayNum[3]"></myInput></li>
				<li><myInput :meta="item" :w="dayNum[4]"></myInput></li>
				<li><myInput :meta="item" :w="dayNum[5]"></myInput></li>
				<li><myInput :meta="item" :w="dayNum[6]"></myInput></li>
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
		<p><br />*已提交审核的工时为<font class="wz">红色</font></p>
	</div>
</template>

<script>
	import myInput from '../base/myInput.vue';
	import {getTableData,subTable} from '../api/index.js';
	import lds from "lodash";
	export default {
		name: 'fill',
		data() {
			return {
				currentYear: 1970,   // 年份
		        currentMonth: 1,  // 月份
		        currentDay: 1,    // 日期
		        currentWeek: 1,    // 星期
		        days: [],//标准时间格式
		        dayNum:[],//年-月-日格式
		        vv:'123',
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
		async created() {
			this.initData(null);
			await this.getData();
		},
		methods: {
			async getData(){
				//let time = '2019-12-06'
				this.list.length=0;
				this.list = await getTableData(this.dayNum);//获取数据是将日期数组发过去
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

			//搜索的功能，清空后重新发请求拿值
			input: lds.debounce(async function() {
				let keyword = this.search;
				if(keyword === '') {
					this.list = [];
					await this.getData();
					return
				}
				this.list = this.list.filter(item => item["name"].indexOf(keyword) >= 0);
			}, 300),
			
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
		      async weekPre() {
		        let d = this.days[0];   // 如果当期日期是7号或者小于7号
		        d.setDate(d.getDate() - 7);
		        this.initData(d);
		        await this.getData();
		      },
		      //  下个星期
		      async weekNext() {
		        let d = this.days[6];    // 如果当期日期是7号或者小于7号
		        d.setDate(d.getDate() + 7);
		        this.initData(d);
		        await this.getData();
		      },
		      async weekCur() {
		        this.initData();
		        await this.getData();
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
			submitVal(){
				this.list.forEach(item=>{
					item.submitVal=1
				})
				subTable(this.list)
			},
			recall(){
				this.list.forEach(item=>{
					item.submitVal=0
				})
				subTable(this.list)
			},
			
			
			submit(){
				this.list.forEach(item=>{
					item.showInput=true;
				})
				subTable(this.list)
			},
			open(){
				this.list.forEach(item=>{
					item.showInput=false;
				})
				subTable(this.list)
			}
		},
		
		computed: { //计算属性
			
			//计算右下角总合
			sumtotal() {
				let total = 0;
				for(let key in this.sum){
					if(this.sum.hasOwnProperty(key)){
						total += this.sum[key];
					}
				}
				return total;
			}
		},
		components: {
			myInput
		}
	}
</script>

<style lang="less">
	.fill {
		width: 80%;
		margin: 20px auto;
		.wz{color:#FF0000;}
	}
	.fill_title {
		border-bottom: 1px solid #ededed;
		width: 100%;
		display: flex;
		padding-bottom: 5px;
		.fill_title_left {
			line-height: 30px;
			display: flex;
			text-align: left;
			.thisTime {
				margin-left: 20px;
			}
			.iconfont {
				font-size: 18px;
			}
			button {
				width: 100px;
				height: 30px;
				margin-left: 20px;
			}
		}
		.fill_title_right {
			flex: 1;
			text-align: right;
			button {
				width: 100px;
				height: 30px;
			}
		}
	}
	.search {
		box-sizing: border-box;
		width: 100%;
		padding: 5px 10px;
		background-color: #ededed;
		margin-top: 5px;
		display: flex;
		.demo-input-suffix {
			width: 300px;
			height: 25px;
			input.el-input__inner {
				background: none;
				border: none;
			}
		}
		.xitong {
			flex: 1;
			text-align: right;
			width: 120px;
			height: 25px;
			.el-input__icon {
				line-height: 25px;
			}
			.el-input__inner {
				width: 120px;
				height: 25px;
				line-height: 25px;
				padding-left: 30px;
				background: none;
				border: none;
			}
		}
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
	}
</style>