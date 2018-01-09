<template>
	<div class="FriendsNote">
		<div class="header">
			<mu-appbar 
			title="好友搜索" 
			class="header_title"
			style="text-align:center">
			    <mu-icon-button
			    style="position:absolute;left: 0;top:4px"
			    icon="chevron_left" 
			    slot="left"
			    @click="backFriends"/>
			</mu-appbar>
		</div>
		<div class="mine_wrapper">
			<mu-text-field 
			v-model="FriendsAccount"
			icon="search"
			type="text" 
			class="appbar-search-field"  
			slot="right" 
			hintText="请输入搜索账号"
			fullWidth/>
		</div>
		<div class="passBtn">
			<mu-raised-button label="保存" 
			class="demo-raised-button" 
			secondary
			@click="save"/>
		</div>
		
	</div>
</template>

<script type="text/javascript">

	
	export {default} from './friendsSearchController';

	
</script>

<style type="text/css" scoped>
.mine_wrapper{
	background-color: #fff;
	padding: 0 5% 10px 0;
	margin-top: 5%;
}
.passBtn{
	margin: 30px auto;
	width: 40%;
	height: 40px;
	line-height: 40px;
	font-size: 16px;
	color: #fff;	
}
.passBtn .demo-raised-button{
	width: 100%;
	height: 100%;
	background: #429fe2;
	border-radius: 6px;
}
</style>




























