<template>
	<div class="loading">
		<div class="spinner">
		  <div class="double-bounce1"></div>
		  <div class="double-bounce2"></div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				show: false
			}
		},
		methods: {

		}
	}
</script>

<style type="text/css" scoped>
	.loading{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index:  9999;
	}
	.spinner {
	  width: 60px;
	  height: 60px;
	  top: 48%;
	  left: 48%;
	  position: relative;
	}
	 
	.double-bounce1, .double-bounce2 {
	  width: 100%;
	  height: 100%;
	  border-radius: 50%;
	  background-color: #67CF22;
	  opacity: 0.6;
	  position: absolute;
	  top: 0;
	  left: 0;
	   
	  -webkit-animation: bounce 2.0s infinite ease-in-out;
	  animation: bounce 2.0s infinite ease-in-out;
	}
	 
	.double-bounce2 {
	  -webkit-animation-delay: -1.0s;
	  animation-delay: -1.0s;
	}
	 
	@-webkit-keyframes bounce {
	  0%, 100% { -webkit-transform: scale(0.0) }
	  50% { -webkit-transform: scale(1.0) }
	}
	 
	@keyframes bounce {
	  0%, 100% {
	    transform: scale(0.0);
	    -webkit-transform: scale(0.0);
	  } 50% {
	    transform: scale(1.0);
	    -webkit-transform: scale(1.0);
	  }
	}
</style>