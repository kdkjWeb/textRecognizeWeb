<template>
	<div>
		<div class="header">
			<mu-appbar 
			style="text-align:center"
			title="聊天设置">
				<mu-icon-button
			    icon="chevron_left" 
			    slot="left"
			    @click="goBack"/>
			    <mu-icon-button
			    icon="" 
			    slot="right"/>

			</mu-appbar>
		</div>
		<div class="content">
			<mu-list style="margin-top: 20px">
				<mu-list-item 
				disableRipple
				title="消息免打扰"
				style="border:1px solid #f1f1f1"
				@click="handleToggle('mute')" >
			      <mu-switch v-model="mute"  slot="right"/>
			    </mu-list-item>
			</mu-list>
		</div>
	</div>
</template>
<script type="text/javascript">
	export {default} from './selfChatRoomConfigController'
</script>

<style type="text/css" scoped>
	
</style>