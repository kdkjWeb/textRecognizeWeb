<template>
	<div class="systemnews">
		<div class="header">
			<mu-appbar title="推送标题" class="header_title">
			    <mu-icon-button
			    icon="chevron_left" 
			    slot="left"
			    @click="backFriends"/>
			</mu-appbar>
		</div>
		<div class="systemnews_title">
			<mu-card-header 
			:title="title" 
			:subTitle="subTitle"
			:titleClass="['titleSize']">
			</mu-card-header>
		</div>
		<div class="systemnews_comtent">{{comtent}}</div>
	</div>
</template>

<script type="text/javascript">

	
	export {default} from './systemnewsController';

	
</script>

<style type="text/css">
.titleSize{
	font-size: 20px !important;
	color: red !important;
}
.systemnews_title{
	border-bottom: 1px solid #ddd;
}
.systemnews_comtent{
	padding: 15px 20px;
	font-size: 14px;
}
</style>




























