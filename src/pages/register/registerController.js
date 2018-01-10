import {phoneRegExp} from '@/utils/publicFunctions'
import services from './registerServices'

export default {
	data() {
		return {
			activeStep: 0,
			get_vc_btn: {
				label: '获取验证码',
				disabled: false,
			},
			registerForm: {
				userName: '',
				verification_code: '',
				confirmPwd: '',
				password: '',
			},
		}
	},
	methods: {
		/**
		 * 下一步
		 */
		handleNext () {
			switch(this.activeStep){
				case 0:
				/**验证 1.手机号是否正确
				       2.验证码 是否正确*/
				this._verifyVerificationCode()
				.then(res=>{
					console.log(res)
					if(true)
						this.activeStep++
				})
				break;

				case 1:
				//验证 两次密码是否正确
				if(this._verifyPassword()){
					//验证通过 将用户数据传递给后端
					services.register({
						model: {
							phone: this.registerForm.userName,
							password: this.registerForm.password
						},
						Vue: this
					})
					.then(res=>{
						console.log(res)
					})
				}
					
				break;

				case 2:
				//注册成功
				this.reset()
				break 
			}
	    },

	    /**
	     * 上一步
	     */
	    handlePrev () {
	      this.activeStep--
	    },

	    reset () {
	      this.activeStep = 0
	    },

	    /**
	     * 获取手机验证码
	     */
	    getVerificationCode() {
	    	//先验证手机是否正确
	    	if(!phoneRegExp(this.registerForm.userName)){
	    		this.$toast('请输入正确的手机号')
	    		return
	    	}
	    	//获取验证码api
	    	
	    	this.$set(this.get_vc_btn, 'disabled', true)
	    	this.$set(this.get_vc_btn, 'label', 60 + 's后再试')
	    	let times = 60,
		    	timer = setInterval(()=>{
		    		times --
		    		console.log(times)
		    		if(!times){
		    			try{
		    				clearInterval(timer)
		    				this.$set(this, 'get_vc_btn', {
		    					disabled: false,
		    					label: '获取验证码'
		    				})
		    			}catch(err){
		    				throw new Error(err)
		    			}
		    		}else{
		    			this.$set(this.get_vc_btn, 'label', times + 's后再试')
		    		}
	    	}, 1000)
	    },


	    /* private function */

	    /**
	     * 验证验证码
	     * @return Boolean
	     */
	    async _verifyVerificationCode() {
	    	if(!phoneRegExp(this.registerForm.userName)){
	    		this.$toast('请输入正确的手机号')
	    		return false
	    	}
	    	//后端验证 是否正确
	    	// const result = await services.verifyVerificationCode() 
	    	// console.log(result)
	    	// return result
	    	return true
	    },

	    /**
	     * 验证密码
	     * @return Boolean
	     */
	    _verifyPassword() {
	    	if(!this.registerForm.password || !this.registerForm.confirmPwd){
	    		this.$toast('请输入您的密码')
	    		return false
	    	}else if(this.registerForm.password != this.registerForm.confirmPwd){
	    		this.$toast('两次密码必须一致')
	    		return false
	    	}
	    	return true
	    },

	}
}