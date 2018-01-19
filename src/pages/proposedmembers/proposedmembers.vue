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
				:key="index"
				class="proposedmembers_wrapper_title">
					<mu-list-item disableRipple 
						:title="item.nickname"
						@click.stop="inviteUser(item.id)">
						<mu-avatar 
						:src="item.pictureAddress? '/static/headImg/' + item.pictureAddress + '.jpg' : '/static/headImg/6.jpg'" 
						slot="leftAvatar"/>
				        <mu-radio 
				        :nativeValue="item.id.toString()"
				        v-model="model" 
				        slot="right" 
				        />
				    </mu-list-item>
		
				</mu-list>
			</div>
		</div>
		<div class="delDilog" v-show="isShow">
			<div class="delDilog_text">
				确认踢出该成员吗？
			</div>
			<div class="delDilog_btn">
				<div class="delDilog_btn_success" 
				@click="success">确定</div>
				<div class="delDilog_btn_cancel"
				@click="cancel">取消</div>
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




























