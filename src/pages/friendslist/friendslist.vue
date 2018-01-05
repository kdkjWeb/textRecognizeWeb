<template>
	<div class="FriendsList">
		<div v-show="isShow">
			<div class="FriendsList_search">
				<div>
					<input type="text" name="" placeholder="搜索好友">
				</div>
			</div>
			<div class="FriendsList_content">
				 <mu-list v-for="item in friendsList" class="FriendsList_content_title" :key="item.friendsId">
				 	<mu-list-item :title="item.friendsName">
				      <!-- <mu-icon value="account_circle" slot="left"/> -->
				      <mu-avatar :src="item.friendsSrc" slot="leftAvatar"/>
				      <mu-icon value="chat_bubble" slot="right" @click="nodeList(item)"/>
				    </mu-list-item>
				 </mu-list>	
			</div>
		</div>
		 <friendsNote :nodeShowList="nodeShowList" ref="nodeShowList"></friendsNote>
	</div>
</template>

<script type="text/javascript">	
	export {default} from './friendsListController';	
</script>

<style type="text/css" scoped>
.FriendsList_search div{
	width: 95%;
	height: 30px;
	margin: 0 auto;
}
.FriendsList_search input{
	width: 100%;
	height: 100%;
	border: 1px solid #ddd;
	outline: none;
	text-align: center;
}
.FriendsList_content{
	margin: 20px auto 0;
}
.FriendsList_content_title{
	padding: 0 5%;
	text-align: left;
	border-bottom: 1px solid #ddd;
}
</style>




























