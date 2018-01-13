<template>
	<div class="registerContainer">
		<mu-stepper :activeStep="activeStep" orientation="vertical">
		    <mu-step>
		      <mu-step-label>
		        验证手机号
		      </mu-step-label>
		      <mu-step-content>
		        <div class="phone_form">
		        	<mu-text-field
					v-model="registerForm.userName" 
					hintText="请输入手机号"
					icon="phone"
					type="text" 
					fullWidth/>

					<!-- 获取验证码 -->
					<!-- <div class="get_vc_line">
						<mu-text-field
						v-model="registerForm.verification_code" 
						hintText="请输入验证码"
						icon="vpn_key"
						type="text"
						fullWidth/>

						<mu-raised-button
						:disabled="get_vc_btn.disabled" 
						:label="get_vc_btn.label" 
						primary
						@click="getVerificationCode"/>
					</div> -->
		        </div>
		        <mu-raised-button 
		        label="下一步" 
		        class="demo-step-button" 
		        @click="handleNext" 
		        primary/>
		      </mu-step-content>
		    </mu-step>
		    <mu-step>
		      <mu-step-label>
		        填写密码
		      </mu-step-label>
		      <mu-step-content>
		        <div class="password_form">

		        	<mu-text-field
					v-model="registerForm.password" 
					hintText="请输入密码"
					icon="lock"
					type="password" 
					fullWidth/>

					<mu-text-field
					v-model="registerForm.confirmPwd" 
					hintText="请再次输入密码"
					icon="lock_outline"
					type="password" 
					fullWidth/>
		        </div>
		        <mu-raised-button 
		        label="立即注册" 
		        class="demo-step-button" 
		        @click="handleNext" 
		        primary/>

		        <mu-flat-button 
		        label="上一步" 
		        class="demo-step-button" 
		        @click="handlePrev"/>
		      </mu-step-content>
		    </mu-step>
		    <mu-step>
		      <mu-step-label>
		        注册成功
		      </mu-step-label>
		      <mu-step-content>
		        <p>
		          注册成功!!!
		        </p>

		        <!-- <mu-raised-button 
		        label="立即登录" 
		        class="demo-step-button" 
		        @click="handleNext" 
		        secondary/> -->

		      </mu-step-content>
		    </mu-step>
		</mu-stepper>
		<footer>
			<mu-raised-button 
	        label="返回登录" 
	        class="demo-step-button" 
	        @click="$router.push({
	        	path: '/'
	        })" 
           primary
           fullWidth/>
		</footer>
	</div>
</template>

<script type="text/javascript">
	export {default} from './registerController'
</script>

<style type="text/css" scoped>
    footer{
    	margin-top: 20px;
    	padding: 0 10%;
    }
	.registerContainer{

	}
	.demo-vsteper-container{
	  max-width: 380px;
	  max-height: 400px;
	  margin: auto;
	}

	.demo-step-button {
	  margin-top: 12px;
	  margin-right: 12px;
	}

	/* 其他样式 */
	.phone_form .get_vc_line{
		display: flex;
	}
</style>