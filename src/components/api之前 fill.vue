<template>
	<div class="fill">
		<h4>工时填报</h4>
		<div class="fill_title">
			<div class="fill_title_left">
				<a href="javascript:;" class="iconfont iconshixiangzuojiantou-" @click="weekPre"></a>
				<div class="time">{{ currentYear }} 年{{this.days[0].getMonth()+1}}月{{this.days[0].getDate()}}日 - {{this.days[6].getMonth()+1}}月{{this.days[6].getDate()}}日</div>
				<a href="javascript:;" class="iconfont iconshixiangyoujiantou-" @click="weekNext"></a>
				<a href="javascript:;" class="thisTime">本周</a>
				<el-button type="primary" size="mini" @click="add">增加</el-button>
			</div>
			<div class="fill_title_right">
				<el-button type="primary" size="mini">保存</el-button>
				<el-button type="primary" size="mini">提交审批</el-button>
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
		          <span v-if="day.getMonth()+1 != currentMonth" class="other-month">周{{datareg(index+1)}} {{ day.getDate() }}</span>
		          <span v-else>
		          <!--今天-->
		          <span v-if="day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate()" class="active">周{{datareg(index+1)}} {{ day.getDate() }}</span>
		          <span v-else>周{{datareg(index+1)}} {{ day.getDate() }}</span>
		          </span>
		        </li>
				<li>week ∑</li>
			</ul>
			<ul v-for="(item,index) in list" :key="index">
				<li>{{item.id}} {{item.name}}</li>
				<li><input type="text" v-model="item.week1.val" @input="mytotal" /></li>
				<li><input type="text" v-model="item.week2.val" @input="mytotal" /></li>
				<li><input type="text" v-model="item.week3.val" @input="mytotal" /></li>
				<li><input type="text" v-model="item.week4.val" @input="mytotal" /></li>
				<li><input type="text" v-model="item.week5.val" @input="mytotal" /></li>
				<li><input type="text" v-model="item.week6.val" @input="mytotal" /></li>
				<li><input type="text" v-model="item.week7.val" @input="mytotal" /></li>
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
	</div>
</template>

<script>
	import {getTableData} from '../api/index.js';
	import lds from "lodash";
	export default {
		name: 'fill',
		data() {
			return {
				currentYear: 1970,   // 年份
		        currentMonth: 1,  // 月份
		        currentDay: 1,    // 日期
		        currentWeek: 1,    // 星期
		        days: [],
		        
				search: '',
				xitong: '',
				options: [{
					value: 'val1',
					label: '系统1'
				}, {
					value: 'val2',
					label: '系统2'
				}],
				table: [{
						id: '50',
						name: '开发任务01',
						total: '',
						week1: {bid:'1574640000000',val:'5'},
						week2: {bid:'1574726400000',val:'3'},
						week3: {bid:'1574812800000',val:'4'},
						week4: {bid:'1574899200000',val:'2'},
						week5: {bid:'1574985600000',val:'5'},
						week6: {bid:'1575072000000',val:'6'},
						week7: {bid:'1575158400000',val:'1'}
					}, {
						id: '51',
						name: '开发任务02',
						total: '',
						week1: {bid:'1574640000000',val:'21'},
						week2: {bid:'1574726400000',val:'34'},
						week3: {bid:'1574812800000',val:'2'},
						week4: {bid:'1574899200000',val:'9'},
						week5: {bid:'1574985600000',val:'7'},
						week6: {bid:'1575072000000',val:'4'},
						week7: {bid:'1575158400000',val:'4'}
				}],
				list: [],
				tabList:[]
			}
		},
		created() {
			this.clolist();
			this.mytotal();
			this.initData(null);
			this.getData();
		},
		methods: {
			async getData(){
				this.tabList = await getTableData();
				console.log(this.tabList)
			},
			add(){
				let newId = parseFloat(this.list[this.list.length-1]["id"]) + 1;
				let obj = {
					id: newId,
					name: '',
					total: '',
					week1: {bid:'',val:''},
					week2: {bid:'',val:''},
					week3: {bid:'',val:''},
					week4: {bid:'',val:''},
					week5: {bid:'',val:''},
					week6: {bid:'',val:''},
					week7: {bid:'',val:''}
				};
				this.list.push(obj);
				obj = null;
			},
			datareg(str){
				str = str.toString();
				let ary = ["零","一","二","三","四","五","六","日","八","九"];
				str = str.replace(/\d/g,function(){
					return ary[arguments[0]]
				})
				return str
			},
			clolist() {
				this.table.map(item => {
					return this.list.push(item);
				});
			},
			mytotal() {
				let total = 0;
				
				this.list.forEach(item=>{
				let {week1,week2,week3,week4,week5,week6,week7} = item;
				if(isNaN(parseFloat(week1.val))) week1.val = 0;
				if(isNaN(parseFloat(week2.val))) week2.val = 0;
				if(isNaN(parseFloat(week3.val))) week3.val = 0;
				if(isNaN(parseFloat(week4.val))) week4.val = 0;
				if(isNaN(parseFloat(week5.val))) week5.val = 0;
				if(isNaN(parseFloat(week6.val))) week6.val = 0;
				if(isNaN(parseFloat(week7.val))) week7.val = 0;
				item.total = parseFloat(week1.val)+parseFloat(week2.val)+parseFloat(week3.val)+parseFloat(week4.val)+parseFloat(week5.val)+parseFloat(week6.val)+parseFloat(week7.val);
			})

			},
			input: lds.debounce(function() {
				let keyword = this.search;
				if(keyword === '') {
					this.list = [];
					this.clolist();
					return
				}
				this.list = this.list.filter(item => item["name"].indexOf(keyword) >= 0);
			}, 300),
			formatDate (year, month, day) {
		        let y = year;
		        let m = month;
		        if (m < 10) m = `0${m}`;
		        let d = day;
		        if (d < 10) d = `0${d}`;
		        return `${y}-${m}-${d}`;
		    },
		
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
		        }
		      },
		      //  上个星期
		      weekPre () {
		        let d = this.days[0];   // 如果当期日期是7号或者小于7号
		        d.setDate(d.getDate() - 7);
		        this.initData(d);
		      },
		      //  下个星期
		      weekNext () {
		        let d = this.days[6];    // 如果当期日期是7号或者小于7号
		        d.setDate(d.getDate() + 7);
		        this.initData(d);
		      },
		      
		},
		
		computed: { //计算属性
//			dweek1:{
//				get(){
//					let tempVal = null;
//					tempVal = this.table.filter(item=>parseFloat(item.id) === 50)[0];
//					
//					//console.log(tempVal.week1.val)
//					return tempVal.week1.val;
//				},
//				set(value){
//					let tempVal = null;
//					tempVal = this.table.filter(item=>parseFloat(item.id) === 50)[0];
//					tempVal.week1.val = value;
//				}
//					
//			},
			sumweek1() {
				let total = 0;
				this.list.forEach(item => {
					let cur = item.week1.val;
					if(isNaN(parseFloat(cur))) cur = 0;
					total += parseFloat(cur)
				})
				return total
			},
			sumweek2() {
				let total = 0;
				this.list.forEach(item => {
					let cur = item.week2.val;
					if(isNaN(parseFloat(cur))) cur = 0;
					total += parseFloat(cur)
				})
				return total
			},
			sumweek3() {
				let total = 0;
				this.list.forEach(item => {
					let cur = item.week3.val;
					if(isNaN(parseFloat(cur))) cur = 0;
					total += parseFloat(cur)
				})
				return total
			},
			sumweek4() {
				let total = 0;
				this.list.forEach(item => {
					let cur = item.week4.val;
					if(isNaN(parseFloat(cur))) cur = 0;
					total += parseFloat(cur)
				})
				return total
			},
			sumweek5() {
				let total = 0;
				this.list.forEach(item => {
					let cur = item.week5.val;
					if(isNaN(parseFloat(cur))) cur = 0;
					total += parseFloat(cur)
				})
				return total
			},
			sumweek6() {
				let total = 0;
				this.list.forEach(item => {
					let cur = item.week6.val;
					if(isNaN(parseFloat(cur))) cur = 0;
					total += parseFloat(cur)
				})
				return total
			},
			sumweek7() {
				let total = 0;
				this.list.forEach(item => {
					let cur = item.week7.val;
					if(isNaN(parseFloat(cur))) cur = 0;
					total += parseFloat(cur)
				})
				return total
			},
			sumtotal() {
				let total = 0;
				return total += this.sumweek1 + this.sumweek2 + this.sumweek3 + this.sumweek4 + this.sumweek5 + this.sumweek6 + this.sumweek7;
			}
		},
		components: {}
	}
</script>

<style lang="less">
	.fill {
		width: 80%;
		margin: 20px auto;
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
				justify-content: space-around;
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
	.date {
    height: px2rem(180);
    color: #333;

    .month {
      font-size: px2rem(24);
      text-align: center;
      margin-top: px2rem(20);
    }

    .weekdays {
      display: flex;
      font-size: px2rem(28);
      margin-top: px2rem(20);

      li {
        flex: 1;
        text-align: center;
      }
    }

    .days {
      display: flex;
      li {
        flex: 1;
        font-size: px2rem(30);
        text-align: center;
        margin-top: px2rem(10);
        line-height:  px2rem(60);
      }
    }
  }
</style>