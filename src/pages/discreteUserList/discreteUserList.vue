<template>
	<div>
		<div class="header">
			<mu-appbar 
			style="text-align:center"
			title="活跃用户">
				<mu-icon-button
			    icon="chevron_left" 
			    slot="left"
			    @click="goBack"/>
			    <mu-icon-button
			    icon="add" 
			    slot="right"
			    @click="submit"/>
			</mu-appbar>
		</div>
		<div class="content">
			<div class="middle">
				<div class="search">
					<input type="text" placeholder="搜索用户">
					<div class="verLine"></div>
					<mu-icon 
					value="search"
					@click="search"/>
				</div>
			</div>
			<div class="userList">
				<mu-list style="padding: 0">
					<mu-list-item
					v-for="user, index in userList"
					:key="index"
					style="border-bottom:1px solid #fafafa" 
					:title="user.userName"
					@click.stop="pushUser(user.id)">
				      <mu-avatar 
				      :src="user.header" 
				      slot="leftAvatar"/>
				      <mu-checkbox
				      :nativeValue="user.id" 
				      v-model="model"  
				      slot="right" 
				      class="demo-checkbox"/>
				    </mu-list-item>
				</mu-list>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export {default} from './discreteUserListController'
</script>

<style type="text/css" scoped>
	.header{
		position: fixed;
	}
	.content{
		margin-top: 56px;
		position: relative;
		overflow-y: scroll;
	}
	.middle{
		padding: 4% 0;
		background-color: #fafafa;
	}
	.search{
		width: 80%;
		margin: 0 auto;
		border: 1px solid #2196f3;
		display: flex;
		background-color: #fff;
		padding: 2% 5%;
		border-radius: 20px;
	}
	.search input{
		border: none;
		width: 100%;
	}
	.verLine{
		width: 1px;
		height: 24px;
		background: #2196f3;
		margin: 0 9px;
	}
	.userList{
		background-color: #fff;
	}
</style>