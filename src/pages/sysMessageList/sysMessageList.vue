<template>
	<div style="height: 100%">
		<div class="header">
			<mu-appbar 
			style="text-align:center"
			title="消息推送">

				<mu-icon-button 
			    icon="chevron_left" 
			    slot="left"
			    @click="goBack"/>

			    <mu-raised-button
			    label="建议" 
			    class="demo-raised-button"
			    slot="right" 
			    secondary
			    @click="suggestDialog.show = true"/>
			</mu-appbar>
		</div>
		<div class="content" ref="sysMsg">
			<mu-list>
				<div
				style="border-bottom: 1px solid #f1f1f1"
				v-for="(msg, index) in sysMsgList"
				:key="index"
				@click="$router.push({
					name: 'SysMessageDetail',
					params: msg
				})">
					<mu-list-item 
					:title="msg.title" 
					:afterText="msg.date">
					</mu-list-item>
					<!-- <mu-divider/> -->
				</div>
			</mu-list>
			<mu-content-block
			v-if="sysMsgList.length <= 0">
				暂无管理员推送消息！！！
			</mu-content-block>
		</div>

		<!-- 建议弹出框 -->
		<mu-dialog :open="suggestDialog.show" @close="suggestCancel">
			<mu-text-field
			v-model="suggestDialog.title" 
			hintText="请输入标题"
			type="text" 
			fullWidth
			/>
			<mu-text-field 
			hintText="推送建议:" 
			multiLine :rows="3" 
			:rowsMax="6"
			v-model="suggestDialog.model" 
			fullWidth/>
			<footer>
				<mu-raised-button 
				secondary 
				@click="suggestSubmit" 
				label="确定"/>
				<mu-raised-button 
				
				@click="suggestCancel" 
				primary 
				label="取消"/>
			</footer>
		</mu-dialog>
	</div>
</template>

<script type="text/javascript">
	export {default} from './sysMessageListController'
</script>

<style>
   .mu-card-header-title{
	   padding: 0;
   }
   .mu-item-title{
	   overflow: hidden;
	   text-overflow:ellipsis;
	   white-space: nowrap;
   }
</style>
<style type="text/css" scoped>
	.content{
		overflow: hidden;
		height: -webkit-calc(100% - 56px);
		height: -moz-calc(100% - 56px);
		height: calc(100% - 56px);
	}
	footer{
		display: flex;
		justify-content: space-between;
	}
</style>