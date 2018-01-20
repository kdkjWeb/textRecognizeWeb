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
					<input type="text" placeholder="搜索用户" v-model="searchModel">
					<div class="verLine"></div>
					<mu-icon 
					value="search"
					@click="search"/>
				</div>
			</div>
			<div class="userList" ref="discreateUserList" :style="{height:height}">
				<div>
					<mu-list style="padding: 0">
						<mu-list-item
						v-for="user, index in userList"
						:key="index"
						style="border-bottom:1px solid #fafafa" 
						:title="user.username"
						@click.stop="pushUser(user.id)">
					      <mu-avatar 
					      :src="user.pictureAddress? 'static/headImg/' + user.pictureAddress + '.jpg' : 'static/headImg/6.jpg'" 
					      slot="leftAvatar"/>
					      <mu-checkbox
					      :nativeValue="user.id.toString()" 
					      v-model="model"  
					      slot="right" 
					      class="demo-checkbox"/>
					    </mu-list-item>
					</mu-list>
				</div>
			</div>
		</div>
		<div class="delDilog" v-show="isShow">
			<div class="delDilog_text">
				确认邀请该用户吗？
			</div>
			<div class="delDilog_btn">
				<div class="delDilog_btn_success" 
				@click="success">确定</div>
				<div class="delDilog_btn_cancel"
				@click="cancel">取消</div>
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
		overflow: hidden;
	}
	
	
/*弹出弹框样式*/
.delDilog{
	position: fixed;
	z-index: 999;
	left: 50%;
	top: 50%;
	margin-top: -75px;
	margin-left: -100px;
	width: 200px;
	height: 150px;
	border-radius: 6px;
	box-shadow: 3px 0px 5px 5px #ddd;
}
.delDilog_text{
	width: 100%;
	height: 110px;
	text-align: center;
	line-height: 110px;
	background-color: #fff;
	border-top-right-radius: 6px;
	border-top-left-radius: 6px;
}
.delDilog_btn{
	width: 100%;
	height: 40px;
	line-height: 40px;
	display: flex;
}
.delDilog_btn div{
	flex: 1;
	text-align: center;
}
.delDilog_btn div.delDilog_btn_success{
	background-color: red;
	border-bottom-left-radius: 6px;
}
.delDilog_btn div.delDilog_btn_cancel{
	background-color: #e6e6e6;
	border-bottom-right-radius: 6px;
}
</style>