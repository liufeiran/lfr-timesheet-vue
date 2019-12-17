<template>
  <div id="app">
  	<div class="warp">
  	<router-link to="/fill" tag="button">提交工时</router-link>
  	<router-link to="/approval" tag="button">审核工时</router-link>
  	</div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
@import "assets/css/reset.less";
.warp{
	text-align: center;
	button{
		margin:10px;
	}
}
</style>
