<template>
	<div>
		<div class="header">
			<mu-appbar 
			style="text-align:center"
			title="消息">
			    <!-- <mu-icon-button
			    icon="chevron_left" 
			    slot="left"/> -->
			    <!-- <mu-icon-menu 
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
			    </mu-icon-menu> -->
			</mu-appbar>
		</div>
	</div>
</template>

<script type="text/javascript">
	export {default} from './chatListController'
</script>

<style type="text/css" scoped>
	.header{
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
	}
</style>