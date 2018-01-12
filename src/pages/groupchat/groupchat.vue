<template>
	<div class="groupchat">
		<!-- 头部 -->
		<div class="header">
			<mu-appbar 
			style="text-align:center"
			:title="roomDetail.title"
			>
				<mu-icon-button
			    icon="chevron_left" 
			    slot="left"
			    @click="goBack"/>
			    <mu-icon-button
			    icon="more_vert" 
			    slot="right"
			    @click="menuShow"
			   />
			 
			</mu-appbar>
			<!-- 下拉列表 -->
			<div class="menuDown" v-show="isShow">
				<ul v-for="(item,index) in menuList">
					<li 
					:class="{active: index == menuIndex}"
					@click="meunItem(index)">{{item}}</li>
				</ul>
			</div>
		</div>

		<!-- 内容 -->
		<div class="content" :style="{height: height}">
			<div 
			v-for="msg, index in chatHistory"
			:key="index"
			class="content_main"
			:style="{'flex-direction': msg.senderId == '-1'?'row-reverse':'row'}">
				 <mu-avatar :src="msg.header" slot="leftAvatar"/>
				 <div 
				 class="content_msg">
				    <div class="content_msg_icon" 
				    :class="[msg.senderId == '-1'?'rightIcon':'leftIcon']"></div>
				    <span v-text="msg.message"></span>
				    <mu-icon
				    v-if="msg.error && msg.senderId == '-1'" 
				    style="position:absolute;top:8px;left:-27px" 
				    color="red" 
				    value="error"
				    />
					
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
.active{
	color: #fff;
	background-color: #666;
}
.content{
	background: #f1f1f1;
	position: relative;
	width: 100%;
	/*height: calc(100% - 113px);*/
	overflow: hidden;
	padding: 5%;
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
	}
</style>




























