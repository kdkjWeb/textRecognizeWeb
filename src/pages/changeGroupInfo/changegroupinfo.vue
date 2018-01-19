<template>
	<div class="Creategroup">
		<div class="header">
			<mu-appbar 
			title="修改资料" 
			class="header_title"
			style="text-align:center">
			    <mu-icon-button
			    style="position:absolute;left: 0;top:4px"
			    icon="chevron_left" 
			    slot="left"
			    @click="backFriends"/>
			</mu-appbar>
		</div>
		<div class="Creategroup_wrapper">
			<div class="group_header_photo">
				<img width="100" height="100" :src="gropSrc">
			</div>
			<div class="grop_comtent">
				<h4>群昵称</h4>
				<div class="grop_comtent_name">
					<input type="text" name="" placeholder="昵称" v-model="gropName">
				</div>
				<h4>群公告</h4>
				
				<textarea class="userMessage" placeholder="暂无" v-model="gropAnnouncement"></textarea>
				<div class="userBtn" @click="save">保存</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">

	
	export {default} from './changegroupinfoController';

	
</script>

<style type="text/css" scoped>
.group_header_photo{
	width: 100px;
	height: 100px;
	border-radius: 50%;
	margin: 3% auto;
}
.group_header_photo img{
	border-radius: 50%;
}
.grop_comtent h4{
	font-size: 16px;
	font-weight: 200;
}
.grop_comtent{
	padding: 0 5%;
}
.grop_comtent_name{
	padding: 3% 0;
}
.grop_comtent_name input{

	text-indent: 1rem;
	width: 100%;
	height: 35px;
	border: 1px solid #ddd;
	border-radius: 15px;
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
/*.userMessage:empty::before{
 	content:attr(placeholder); 
	color:#bbb;
}
.userMessage:focus::before{
	content:none;
}*/
.userBtn{
	margin: 5% auto;
	text-align: center;
	width: 40%;
	height: 40px;
	line-height: 40px;
	font-size: 16px;
	color: #fff;
	border-radius: 6px;
	background: #429fe2;
}

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




























