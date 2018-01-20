<template>

	<div class="groupchat" style="height: 100%">
		<!-- 头部 -->

		<div class="header">
			
				<mu-appbar 
				style="text-align:center"
				:title="roomDetail.groupName">
					<mu-icon-button
				    icon="chevron_left" 
				    slot="left"
				    @click="goBack"/>
				    <mu-icon-button
				    icon="more_vert" 
				    slot="right"
				    @click="menuShow"/> 
				</mu-appbar>
		
			<!-- 下拉列表 -->
			<div class="menuDown" v-show="isShow">
				<ul v-for="(item,index) in user.type != '0' ? menuList : menuList1">
					<li 
					@click="meunItem(index)">{{item}}</li>
				</ul>
			</div>
		</div>

		<!-- 内容 -->
		<div class="content" :style="{height: height}" ref="groupChat">
			<div class="contentMsg" ref="Msg">
				<div 
				v-for="msg, index in chatHistory"
				:key="index"
				class="content_main"
				:style="{'flex-direction': msg.username == $store.state.user.username?'row-reverse':'row'}">
					 <mu-avatar :src="msg.pictureAddress ? 'static/headImg/' + msg.pictureAddress + '.jpg' : 'static/headImg/6.jpg'" slot="leftAvatar"/>
					 <div 
					 class="content_msg">
					    <div class="content_msg_icon" 
					    :class="[msg.username == $store.state.user.username?'rightIcon':'leftIcon']"></div>
					    <span v-text="msg.message"></span>
					    <mu-icon
					    v-if="msg.status == 'error' && msg.username == $store.state.user.username" 
					    style="position:absolute;top:8px;left:-27px" 
					    color="red" 
					    value="error"
					    @click="openBottomSheet(index)"/>		
					 </div>
				</div>
			</div>
		</div>


		<!--  底部 -->
		<div class="footer">
			<mu-icon-button 
		    icon="mic" 
		    slot="left"
		    @click="voiceEnter"
		    />
		    <mu-text-field
		    v-model="message" 
		    fullWidth/>
		    <mu-icon-button 
		    icon="panorama" 
		    slot="left"
		    @click="sendImg"
		    />
		    <mu-icon-button 
		    icon="send" 
		    slot="left"
		    @click="send"
		   />
		</div>
		<!--确认清除聊天记录／确认解散该群／确认退出该群-->
		<div class="delDilog" v-show="isShow1">
			<div class="delDilog_text" v-text="user.type != '0'? (dialog ? '确认解散该群' : '确认清空聊天记录') : (dialog ? '确认退出该群' : '确认清空聊天记录')">
			</div>
			<div class="delDilog_btn">
				<div class="delDilog_btn_success" 
				@click="success">确定</div>
				<div class="delDilog_btn_cancel"
				@click="cancel">取消</div>
			</div>
		</div>
		
		
		<!--遮罩层-->
		<div class="layout" 
		:style="{height:height1}"  
		v-show="isShow2"
		@click="close">
		</div>

		<mu-bottom-sheet :open="bottomSheet.show" @close="closeBottomSheet">
		    <mu-list @itemClick="closeBottomSheet">
		      <mu-list-item 
		      title="重新发送"
		      @click="sendAgain"/>
		      <mu-list-item 
		      title="删除"
		      @click="deleteMsg"/>
		      <mu-list-item 
		      title="取消" 
		      @click="closeBottomSheet"/>
		    </mu-list>
		</mu-bottom-sheet>
	</div>
		
</template>

<script type="text/javascript">

	export {default} from './groupchatController';

</script>

<style type="text/css" scoped>
.menuDown{
	position: absolute;
	right: 10px;
	width: 120px;
	box-shadow: 3px 3px 3px 3px #ddd;
	margin-top: 5px;
	z-index: 999;
	background-color: #fff;
}
.menuDown li{
	padding: 7px;
	text-align: center;
	border-bottom: 1px solid #ddd;
}
.content{
	background: #f1f1f1;
	position: relative;
	width: 100%;
	/*height: calc(100% - 113px);*/
	/*overflow-y: scroll;*/
	overflow: hidden;
	padding: 2% 5%;
}
.contentMsg{
	margin-top: -15px;
}
.content_main{
	display: flex;
	margin-top: 10px;
	/*flex-direction: row-reverse;*/
}
.content_msg{
	max-width: 60%;
	font-size: 16px;
	line-height: 40px;
	background-color: #bbdefb;
	margin: 0 15px;
	padding: 0 10px;
	border-radius: 10px;
	position: relative;
	z-index: 2;
}
.content_msg_icon{
	position: absolute;
	top: -10px;
	z-index: -1;
	margin: 10px auto;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-top-color: #bbdefb;
}
.rightIcon{
	right: -10px;
}
.leftIcon{
	left: -10px;
}
.footer{
	display: flex;
	position: fixed;
	border-top: 1px solid #f1f1f1;
	bottom: 0;
	right:  0;
	left:  0;
	background-color: #fff;
}
.layout{
	position: fixed;
	left: 0;
	top: 0;
	z-index: 99;
	width: 100%;
	background-color: rgba(0,0,0,.1);
}

/*确认弹出框样式*/
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




























