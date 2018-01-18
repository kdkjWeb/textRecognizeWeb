<template>
	<div style="height:100%">
		<div class="header">
			<mu-appbar 
			style="text-align:center"
			title="消息">
			    <mu-icon-button
			    v-if="user.type != '0'"
			    style="position:absolute;right: 0;top:4px"
			    icon="add" 
			    slot="right"
			    @click="$router.push({
			    	name: 'CreateGroup'
			    })"/>
			</mu-appbar>
		</div>

		<div class="content" ref="chatList" :style="{height: height}">
			<div>
				<mu-list>
					<mu-sub-header>群聊天</mu-sub-header>
					<mu-list-item
					v-if="groupChatRoomList.length > 0"
					v-for="room in groupChatRoomList"
					:key="room.id" 
					:title="room.groupName"
					@click="enterGroupChatRoom(room)">
				      <mu-avatar :src="room.url" 
				      slot="leftAvatar"/>
				      <mu-icon 
				      value="chat_bubble" 
				      slot="right"/>
				    </mu-list-item>
				    <mu-content-block
				    v-if="groupChatRoomList.length == 0">
				    	您暂无群哟，赶紧去加一个吧
				    </mu-content-block>
				</mu-list>
				<mu-divider/>
				<mu-list>
					<mu-sub-header>好友聊天记录</mu-sub-header>
					<mu-list-item
					v-if="selfChatRoomList.length > 0"
					v-for="room in selfChatRoomList"
					:key="room.id"
					:title="room.password?room.password:room.nickname || '暂未设置昵称'"
					@click="enterSelfChatRoom(room)">
					  <!-- <mu-badge content="10" class="demo-icon-badge" circle secondary>
					  	
					  </mu-badge> -->
				      <mu-avatar 
				      :src="room.pictureAddress ? '/static/headImg/' + room.pictureAddress + '.jpg' : '/static/headImg/6.jpg'" 
				      slot="leftAvatar"/>
				      <mu-icon 
				      value="delete_forever"
				      color="red" 
				      slot="right"
				      @click.stop="openDeleteDialog(room)"/>
				    </mu-list-item>
				    <mu-content-block
				    v-if="selfChatRoomList.length == 0">
				    	当前暂无聊天历史记录
				    </mu-content-block>
				</mu-list>
			</div>
		</div>

		<mu-dialog :open="deleteDialog.show" @close="deleteCancel">
			您确定要删除此条聊天记录么?
			<footer>
				<mu-raised-button 
				secondary 
				@click="deleteSubmit" 
				label="确定"/>
				<mu-raised-button 
				@click="deleteCancel" 
				primary 
				label="取消"/>
			</footer>
		</mu-dialog>
	</div>
</template>

<script type="text/javascript">
	export {default} from './chatListController'
</script>

<style type="text/css" scoped>
	/*.header{
		position: relative;
		top: 0;
		right: 0;
		left: 0;
	}*/
	.content{
		/*height: calc(100% - 56px);
		overflow-y: scroll;*/
		overflow: hidden;
	}
	footer{
		margin-top: 30px;
		display: flex;
		justify-content: space-between;
	}
</style>