<template>
	<div>
		<div class="header">
			<mu-appbar title="Title">
			    <mu-icon-button icon="chevron_left" 
			    slot="left"/>
			    <mu-icon-menu 
			    icon="more_vert" 
			    slot="right"
			    :anchorOrigin="{
			    	vertical: 'top',
			    	horizontal: 'right'
			    }"
			    :targetOrigin="{
			    	vertical: 'bottom',
			    	horizontal: 'right'
			    }">
			      <mu-menu-item title="菜单 1"/>
			      <mu-menu-item title="菜单 2"/>
			      <mu-menu-item title="菜单 3"/>
			    </mu-icon-menu>
			</mu-appbar>
		</div>
		<div class="main">
			
		</div>
		<div class="footer">
			<mu-paper>
			  <mu-bottom-nav 

			  :value="bottomNav" 
			  @change="handleChange">
			    <mu-bottom-nav-item 
			    value="chat" 
			    title="聊天" 
			    icon="chat"/>

			    <mu-bottom-nav-item 
			    value="friends" 
			    title="好友" 
			    icon="people"/>

			    <mu-bottom-nav-item 
			    value="nearby" 
			    title="个人中心" 
			    icon="account_circle"/>
			  </mu-bottom-nav>
			</mu-paper>
		</div>
		
	</div>
</template>

<script type="text/javascript">
	export {default} from './indexController'
</script>

<style type="text/css" scoped>
	.header{
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
	}
	.footer{
		position: fixed;
		bottom: 0;
		right:  0;
		left:  0;
	}
</style>