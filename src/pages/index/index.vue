<template>
	<div class="indexContainer">
		<div class="main">
		
			<router-view/>
			
		</div>
		<div class="footer">
			<mu-paper>
			  <mu-bottom-nav
			  :value="bottomNav" 
			  @change="handleChange">
			    <mu-bottom-nav-item 
			    value="chatList" 
			    title="消息"
			    :to="{
			    	name: 'ChatList'
			    }" 
			    icon="chat"/>

			    <mu-bottom-nav-item 
			    value="friendslist" 
			    title="好友"
			    :to="{
			    	name: 'FriendsList'
			    }"  
			    icon="people"/>

			    <mu-bottom-nav-item 
			    value="mine" 
			    title="个人中心" 
			    icon="account_circle"
			    :to="{
			    	name: 'Mine'
			    }"/>
			  </mu-bottom-nav>
			</mu-paper>
		</div>
		
	</div>
</template>

<script type="text/javascript">
	export {default} from './indexController'
</script>

<style type="text/css" scoped>
    .indexContainer{
    	height: 100%;
    }
    .main{
    	position: relative;
    	height: calc(100% - 56px);
    	overflow: hidden;
    }
	.footer{
		position: fixed;
		bottom: 0;
		right:  0;
		left:  0;
	}
</style>