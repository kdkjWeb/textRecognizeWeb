<template>
	<div class="FriendsList">
		<div>
			<div class="header">
				<mu-appbar 
				:title="title" 
				class="header_title"
				style="text-align:center">
				    <mu-icon-button 
				    style="position:absolute;right: 0;top:4px"
				    icon="search" 
				    slot="right"
				    @click="search"/>
				</mu-appbar>	
			</div>
			<div>
				<div class="FriendsList_content" ref="FriendsListWrapper" :style="{height:height}">
					 <div>
						 <friendsDel v-for="(item,index) in friendsList" 
						 :key="item.friendsId" 
						 @deleteItem="deleteItem(index,item)"
						 :index = "index">
						 	<mu-list class="FriendsList_content_title">
							 	<mu-list-item :title="item.friendsName"
							 	@click="enterSelfChatRoom(item)">
							      <mu-avatar :src="item.friendsSrc" slot="leftAvatar"/>
							      <mu-icon value="chat_bubble" slot="right" @click="nodeList(item)"/>
							    </mu-list-item>
							 </mu-list>
						 </friendsDel>
					 </div>
				</div>
			</div>
		</div>
		<!-- <friendsNote ref="nodeShowList" v-show="isShow"></friendsNote> -->
	</div>
</template>

<script type="text/javascript">	
	export {default} from './friendsListController';	
</script>

<style type="text/css" scoped>
.header_title{
	text-align: center;
}
.FriendsList_search div{
	width: 95%;
	height: 30px;
	margin: 10px auto 0;
}
.FriendsList_search input{
	width: 100%;
	height: 100%;
	border: 1px solid #ddd;
	outline: none;
	text-align: center;
}
.FriendsList_content{
	margin: 0 auto;
	overflow: hidden;
	/*height: 500px;*/
	width: 100%;
}
.FriendsList_content_title{
	padding: 0;
	border-bottom: 1px solid #ddd;
	border-top: 1px solid #ddd;
}
.FriendsList_model{
	position: relative;
}
.del{
	position: absolute;
	top: 0;
	right: -101px;
	line-height: 56px;
	background: red;
	width: 100px;
	height: 100%;
	color: #fff;
	text-align: center;
	font-size: 16px;
	border-bottom: 1px solid #ddd;
	border-top: 1px solid #ddd;
}
</style>




























