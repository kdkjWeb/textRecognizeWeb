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
				      <mu-icon-menu
				      :anchorOrigin="{vertical: 'bottom', horizontal: 'right'}"
				      :targetOrigin="{vertical: 'top', horizontal: 'right'}" 
				      icon="more_vert" 
				      slot="right">
					    <mu-menu-item title="删除"/>
					  </mu-icon-menu>
				    </mu-list-item>
				    <mu-content-block
				    v-else>
				    	您暂无群哟，赶紧去加一个吧
				    </mu-content-block>
				</mu-list>
				<mu-divider/>
				<mu-list>
					<mu-sub-header>好友聊天记录</mu-sub-header>
					<mu-list-item
					v-for="room in selfChatRoomList"
					:key="room.id"
					:title="room.title"
					@click="enterSelfChatRoom(room)">
				      <mu-avatar :src="room.url" slot="leftAvatar"/>
				      <mu-icon value="chat_bubble" slot="right"/>
				      <mu-icon-menu
				      style="position:relative;"
				      :anchorOrigin="{vertical: 'bottom', horizontal: 'right'}"
				      :targetOrigin="{vertical: 'top', horizontal: 'right'}" 
				      icon="more_vert" 
				      slot="right"
				      @click.stop="test">
						    <mu-menu-item title="删除"/>
					  </mu-icon-menu>
				    </mu-list-item>
				</mu-list>
			</div>
		</div>
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
</style>