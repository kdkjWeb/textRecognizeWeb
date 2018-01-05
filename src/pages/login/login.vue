<template>
	<div class="loginContainer">
		<mu-text-field
		v-model="userName" 
		hintText="请输入用户名"
		type="text" 
		label="用户名" 
		fullWidth
		labelFloat/>
		
		<mu-text-field 
		v-model="password"
		hintText="请输入密码"
		type="password" 
		label="密码" 
		fullWidth
		labelFloat/>

		<mu-raised-button 
		label="登录"
		secondary 
		fullWidth
		@click="login"/>

		<div class="other_link_div">
			<router-link to="" v-text="'忘记密码?'"></router-link>
			<router-link to="register" v-text="'立即注册'"></router-link>
		</div>
	</div>
</template>

<script type="text/javascript">
	export {default} from './loginController'
</script>

<style type="text/css" scoped>
    .loginContainer{
    	padding: 0 5%;
    }
	.other_link_div{
		margin-top: 10px;
		display: flex;
		justify-content: space-between;
	}
</style>