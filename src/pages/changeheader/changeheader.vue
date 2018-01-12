<template>
	<div>
		<div class="header">
			<mu-appbar 
			style="text-align:center"
			title="修改头像">
				<mu-icon-button 
				style="position:absolute;left: 0;top:4px"
			    icon="chevron_left" 
			    slot="left"
			    @click="goBack"/>   
			</mu-appbar>
			<button 
			class="successMember"
			@click="success">确定</button>
		</div>


		<!-- 可选头像区域 --> 
		<div class="changeHead"
			:style="{height:height}"
			ref="ChangeHead" >
			<ul class="changeHead_wrapper">
				<li v-for="item,index in headImg" 
				:key="index" 
				@click="shooseHead(item,index)"
				:class="{'active':itemIndex == index}">
					<img :src="item.url" width="100%" height="100%">
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/javascript">
	export {default} from './changeheaderController';
</script>

<style type="text/css" scoped>
.header{
	z-index: 999;
}
.successMember{
	position:absolute;
	right: 20px;
	top:15px;
	width: 40px;
	background-color: #429fe2;
	color: #fff;
	width: 50px;
	height: 26px;
	outline: none;
	border: none;
	border-radius: 4px;
}
.changeHead_wrapper{
	margin: 0 auto;
	overflow: hidden;
	width: 100%;
}
.changeHead_wrapper li{
	float: left;
	width: 31.3%;
	text-align: center;
	margin: 1%;
}
.changeHead_wrapper li img{
	display: block;
}
.active{
	border: 2px solid blue;
	padding: 5px;
}








/*.header_photo{
	position: absolute;
	left: 50%;
	top:50%;
	margin-top: -150px;
	margin-left: -150px;
	width: 300px;
	height: 300px;
}
.footer{
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 56px;
	line-height: 56px;
	display: flex;
	background-color: #474a4f;
}
.cancel,.success{
	flex: 1;
	text-align: center;
	color: #fff;
}*/
</style>




























