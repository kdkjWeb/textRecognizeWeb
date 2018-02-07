<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<script>
export default {
  name: 'app',
  created() {
	//物理回退键的监听
	window.addEventListener('popstate', ()=>{
		this.$toast('监听物理回退键成功')
	})
  }
}
</script>

<style>
*{
  margin:  0;
  padding: 0;
}
</style>
