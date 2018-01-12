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
			class="successMember">确定</button>
		</div>


		<!-- 可选头像区域 --> 
		<!-- <div class="changeHead">
			<ul>
				<li v-for="item in headImg">
					<img :src="item.url">
				</li>
			</ul>
		</div> -->

		<div class="gridlist-demo-container">
		  <mu-grid-list class="gridlist-demo" :style="{height:height}">
		    <mu-grid-tile v-for="tile, index in headImg" :key="index">
		      <img :src="tile.url"/>
		    </mu-grid-tile>
		  </mu-grid-list>
		</div>



		<!-- 显示头像位置 -->
		<!-- {{this.$route.params.userId}} -->
		<!-- <img :src="this.$route.params.userImg"> -->

		<!-- <div class="header_photo">
				<vueCropper
				ref="cropper3"
				:img="option.img"
				:autoCrop="option.autoCrop"
				:autoCropWidth="option.autoCropWidth"
				:autoCropHeight="option.autoCropHeight"
				:fixedBox="option.fixedBox"
				@realTime="realTime"
			></vueCropper>
			<label class="btn" for="uploads">upload</label>
    		<input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
		</div>
		<div class="footer" v-show="crap">
			<div class="cancel">取消</div>
			<div class="success" @click＝"startCrop">完成</div>
		</div> -->
	</div>
</template>

<script type="text/javascript">
	export {default} from './changeheaderController';
</script>

<style type="text/css" scoped>
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
.changeHead ul li{
	float: left;
	width: 31.3%;
	text-align: center;
	border: 1px solid #ddd;
	padding: 5px 0;
	margin: 0 1% 10px;
}
.gridlist-demo-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.gridlist-demo{
  width: 500px;
  overflow-y: auto;
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




























