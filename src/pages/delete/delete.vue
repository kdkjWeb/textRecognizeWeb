<template>
	<div class="FriendsList_model" :style="txtStyle">
		<div
            @touchstart="touchStart"
            @touchmove="touchMove"
            @touchend="touchEnd"
            >
            <slot></slot>
        </div>
        <div class="delete" @click.prevent="deleteItem(index)">删除</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			index: {
				type: Number
			}
		},
		data() {
            return {
                startX: 0,       //触摸位置
                moveX: 0,       //滑动时的位置
                disX: 0,       //移动距离
                txtStyle: '',
                // txtStyle: [],
                delWidth: 100,
                userIndex:0,
            }
        },
        methods: {
        	touchStart(e){
        		e = e || event;
        		if(e.touches.length == 1){
                    // 手指按下的位置
                    this.startX = e.touches[0].clientX;
                }
        	},
        	touchMove(e){
        		e = e || event;
        		if(e.touches.length == 1) {
                    // 滑动的实时位置
                    this.moveX = e.touches[0].clientX
                    // 滑动的距离
                    this.disX = this.startX - this.moveX;
                    
                    // 如果是向右滑动或者只是点击，不改变滑动位置
                    if(this.disX < 0 || this.disX == 0) {
                        this.txtStyle = "transform:translateX(0px)";
                    }else if (this.disX > 0) {
                    //如果是向左滑动，则实时给这个根元素一个向左的偏移-left，当偏移量到达固定值delWidth时，固定元素的偏移量为 delWidth
                        this.txtStyle = "transform:translateX(-" + this.disX + "px)";
                        if (this.disX >= this.delWidth) {
                            this.txtStyle = "transform:translateX(-" + this.delWidth	+ "px)";
                        }
                    }
                }
        	},
        	touchEnd(e){
        		e = e || event;
        		if (e.changedTouches.length == 1) {
                    //this.startX = 0;
                    // 手指移动结束后的水平位置
                    let endX = e.changedTouches[0].clientX;
                    // 触摸开始与结束,手指移动的距离
                    this.disX = this.startX - endX;
                    //如果距离小于删除按钮的1/2，不显示删除按钮
                    
                    if(this.disX<(this.delWidth/2)){
                    	this.txtStyle = "transform:translateX(0px)";
                    }else{
                    	this.txtStyle = "transform:translateX(-" + this.delWidth + "px)";
                    }
                }
        	},
        	deleteItem(index){
                
                this.$emit('deleteItem',index);
            }
        }
	}
</script>

<style type="text/css" scoped>
.FriendsList_model{
	position: relative;
	transition: all .5s;
}
.delete{
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