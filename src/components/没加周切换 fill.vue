<template>
	<div class="fill">
		<h4>工时填报</h4>
		<div class="fill_title">
			<div class="fill_title_left">
				<a href="javascript:;" class="iconfont iconshixiangzuojiantou-"></a>
				<div class="time">2019 11月25日 - 12月1日</div>
				<a href="javascript:;" class="iconfont iconshixiangyoujiantou-"></a>
				<a href="javascript:;" class="thisTime">本周</a>
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
		<ftable :tableData="list"></ftable>
	</div>
</template>

<script>
	import lds from "lodash"
	import ftable from "@/base/ftable.vue";
	export default {
		name: 'fill',
		data() {
			return {
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
					week1: '5',
					week2: '3',
					week3: '4',
					week4: '2',
					week5: '3',
					week6: '1',
					week7: '0'
				}, {
					id: '51',
					name: '开发任务02',
					total: '',
					week1: '2',
					week2: '3',
					week3: '5',
					week4: '2',
					week5: '3',
					week6: '1',
					week7: '0'
				}, {
					id: '52',
					name: '开发任务03',
					total: '',
					week1: '6',
					week2: '3',
					week3: '4',
					week4: '2',
					week5: '7',
					week6: '1',
					week7: '0'
				}],
				list:[]
			}
		},
		created(){
			this.clolist();
		},
		methods: {
			clolist(){
				this.table.map(item => {
					return this.list.push(item);
				});
			},
			input:lds.debounce(function(){
				let keyword = this.search;
				if(keyword===''){
					this.list=[];
					this.clolist();
					return
				}
				this.list = this.list.filter(item => item["name"].indexOf(keyword) >= 0);
			},300)
		},
		components: {
			ftable
		}
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
			/*.el-input__suffix{
			left:0;
			right:auto;
		}*/
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
</style>