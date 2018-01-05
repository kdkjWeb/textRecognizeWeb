<template>
	<div class="FriendsNote" v-show="nodeShow">
		<!-- <div class="header">
			<mu-appbar :title="title" class="header_title">
			    <mu-icon-button icon="chevron_left" 
			    slot="left"/>
			</mu-appbar>
			<mu-raised-button label="确认" class="demo-raised-button header_btn"/>
		</div> -->
		<div class="FriendsNote_content">
			<mu-list-item title="图片" disabled>
			    <mu-avatar slot="left" src="/images/uicon.jpg"/>
			  </mu-list-item>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">

	
	export {default} from './friendsNoteController';

	
</script>

<style type="text/css" scoped>
.header_title{
	/*position: relative;*/
	text-align: left;
}
/*.header_btn{
	position: absolute;
	right: 0;
	top: 0;
}*/
</style>




























