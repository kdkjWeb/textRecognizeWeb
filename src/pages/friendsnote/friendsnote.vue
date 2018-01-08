<template>
	<div class="FriendsNote">
		<div class="header">
			<mu-appbar :title="title" class="header_title">
			    <mu-icon-button
			    icon="chevron_left" 
			    slot="left"
			    @click="backFriends"/>
			</mu-appbar>
		</div>
		
		<div id="user">
			<div class="userImg">
				<img width="75" height="75" :src="this.$route.params.friendsSrc">
			</div>
			<div class="userName">
				<h3>昵称</h3>
				<span>{{this.$route.params.friendsName}}</span>
			</div>
		</div>
		<div class="userInfo">
			<mu-text-field 
			hintText="设置备注名称"
			:fullWidth="true"
			v-model="noteName"
			class="demo-divider-form"/>
			<p>更多介绍</p>
			<div class="userMessage" contenteditable="true" placeholder="暂无"></div>
			<div class="userBtn" @click="save">保存</div>
		</div>
	</div>
</template>

<script type="text/javascript">

	
	export {default} from './friendsNoteController';

	
</script>

<style type="text/css" scoped>
#user{
	padding: 20px 0 0 10px;
	overflow: hidden;
}
.userImg{
	width: 75px;
	height: 75px;
	border-radius: 50%;
	float: left;
}
.userImg img{
	border-radius: 50%;
}
.userName{
	float: left;
	margin: 20px 0 0 20px;
}
.userInfo{
	padding: 0 5%;
	margin-top: 20px;
}
.userMessage{
	width: 100%;
	height: 200px;
	margin-top: 10px;
	border: 1px solid #ddd;
	border-radius: 6px;
	padding: 5px 10px;
	outline: none;
}
.userMessage:empty::before{
 	content:attr(placeholder); 
	color:#bbb;
}
.userMessage:focus::before{
	content:none;
}
.userBtn{
	margin: 50px auto;
	text-align: center;
	width: 40%;
	height: 40px;
	line-height: 40px;
	font-size: 16px;
	color: #fff;
	border-radius: 6px;
	background: #429fe2;
}
.demo-divider-form{
	font-size: 12px;
}
</style>




























