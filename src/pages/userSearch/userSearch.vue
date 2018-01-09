<template>
	<div style="height:100%">
		<div class="header">
			<mu-appbar 
			style="text-align:center"
			title="搜索">
				<mu-icon-button 
			    icon="chevron_left" 
			    slot="left"
			    @click="goBack"/>
			    <mu-icon-button
			    icon="" 
			    slot="right"/>
			</mu-appbar>
		</div>
		<div class="content">
			<div class="search">
				<mu-text-field 
				icon="search" 
				hintText="请输入搜索账号"
				v-model="userName" 
				fullWidth />
			</div>
			<div class="submit">
				<mu-raised-button 
				label="确定" 
				class="demo-raised-button" 
				secondary
				fullWidth
				@click="submit"/>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export {default} from './userSearchController'
</script>

<style type="text/css" scoped>
	.content{
		width: 100%;
		height: 100%;
		background-color: #fafafa;
		padding-top: 5%;
	}
	.search{
		background-color: #fff;
		padding: 4% 5% 0 0;
	}
	.submit{
		margin-top: 20px;
		display: flex;
		justify-content: center;
		padding: 0 25%;
	}
</style>