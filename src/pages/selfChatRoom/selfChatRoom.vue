<template>
	<div style="height:100%">
		<div class="header">
			<mu-appbar 
			style="text-align:center"
			:title="roomDetail.title">
				<mu-icon-button 
			    icon="chevron_left" 
			    slot="left"
			    @click="goBack"/>
			    <mu-icon-button
			    icon="settings" 
			    slot="right"
			    @click="enterRoomSetting"/>
			</mu-appbar>
		</div>
		<div class="wrapper" :style="{height: height}" ref="wrapper">
			<div class="content" ref="content">
				<div 
				v-for="msg, index in chatHistory"
				:key="index"
				:style="{'flex-direction':msg.username == $store.state.user.username?'row-reverse':'row'}"
				class="content_main"
				ref="content_main">
					 <mu-avatar 
					 :src="msg.username == $store.state.user.username?
							 ($store.state.user.pictureAddress ? 'static/headImg/' + $store.state.user.pictureAddress + '.jpg' : 'static/headImg/6.jpg') :
							 (friendInfo.pictureAddress ? 'static/headImg/' + friendInfo.pictureAddress + '.jpg' : 'static/headImg/6.jpg')"
					 slot="leftAvatar"/>
					 <div 
					 class="content_msg">
					    <div class="content_msg_icon" 
					    :class="[msg.username == $store.state.user.username?'rightIcon':'leftIcon']"></div>
					    <span 
					    v-html="msg.message"></span>
					    <mu-icon
					    v-if="msg.status == 'error' && msg.username == $store.state.user.username" 
					    style="position:absolute;top:8px;left:-27px" 
					    color="red" 
					    value="error"
					    @click="openBottomSheet(index)"/>
						<!-- <img :src="msg.img"> -->
					 </div>

				</div>
			</div>
		</div>
		<div class="footer">
			<mu-icon-button 
		    icon="mic" 
		    slot="left"
		    @click="voiceEnter"/>
		    <mu-text-field
		    v-model="message" 
		    fullWidth/>
		    <mu-icon-button 
		    icon="panorama" 
		    slot="left"
		    @click="sendImg"/>
		    <mu-icon-button 
		    icon="send" 
		    slot="left"
		    @click="send"/>
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
	export {default} from './selfChatRoomController'
</script>

<style type="text/css" scoped>
	.footer{
		display: flex;
		position: fixed;
		border-top: 1px solid #f1f1f1;
		bottom: 0;
		right:  0;
		left:  0;
	}
	.wrapper{
		overflow: hidden;
		background: #f1f1f1;
		/*height: calc(100% - 113px);*/
	}
	.content{
		
		position: relative;
		width: 100%;
		/*height: 100%;*/
    	/*overflow: hidden;*/
    	padding: 0 5% 8% 5%;
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
		word-wrap: break-word; 
		word-break: normal; 
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
</style>