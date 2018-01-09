<template>
	<div class="proposedmembers">
		<div class="header">
			<mu-appbar 
			style="text-align:center"
			title="踢出成员">
				<mu-icon-button 
				style="position:absolute;left: 0;top:4px"
			    icon="chevron_left" 
			    slot="left"
			    @click="goBack"/>   
			</mu-appbar>
			<button 
			@click="deleteMember" 
			class="deleteMember">删除</button>
		</div>
		<div class="proposedmembers_wrapper" ref="MembersWrapper" :style="{height:height}">
			<div>
				<mu-list 
				v-for="(item,index) in groupMembers" 
				:key="item.friendsId"
				class="proposedmembers_wrapper_title">
					<mu-list-item disableRipple :title="item.friendsName">
						<mu-avatar :src="item.friendsSrc" slot="leftAvatar"/>
				        <mu-checkbox slot="right" v-model="selectArr"/>
				    </mu-list-item>
				</mu-list>
			</div>
		</div>
		
	</div>
</template>

<script type="text/javascript">

	export {default} from './proposedmembersController';

</script>

<style type="text/css" scoped>
.proposedmembers_wrapper{
	margin: 0 auto;
	overflow: hidden;
	width: 100%;
}
.proposedmembers_wrapper_title{
	padding: 0;
	border-bottom: 1px solid #ddd;
	border-top: 1px solid #ddd;
}
.deleteMember{
	position:absolute;
	right: 20px;
	top:15px;
	width: 40px;
	background-color: red;
	color: #fff;
	width: 50px;
	height: 26px;
	outline: none;
	border: none;
	border-radius: 4px;
}
</style>




























