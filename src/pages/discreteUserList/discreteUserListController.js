import services from './discreteUserListServices'

export default {
	data() {
		return {
			isShow: false,
			//所查询到的用户列表
			userList: [
				{
					header: '/static/header1.jpeg',
					userName: 'Macao Mai',
					id: '1'
				},
				{
					header: '/static/header2.jpg',
					userName: 'Paca Tie',
					id: '2'
				},
				{
					header: '/static/header3.jpg',
					userName: 'Mikey',
					id: '3'
				},
				{
					header: '/static/header2.jpg',
					userName: 'Tom',
					id: '4'
				}
			], 

			//所选择的活跃用户
			model: [], 
		}
	},
	methods:{
		goBack() {
			this.$router.goBack()
		},
		submit() {
			if(!this.model.length){
				this.$toast('你还没选择要邀请的好友');
			}else{
				this.isShow = true;
			}
		},
		//添加选中的用户到model
		pushUser(id) {
			const result = this.model.findIndex((val)=>{
				return val == id
			})

			if(result < 0){
				//未添加
				this.model.push(id)
			}else{
				this.model.splice(result, 1)
			}
		},
		//点击确定提交选中的成员
		success() {
			let userId = this.model.map(item => item).join();
			console.log(userId);
			//console.log(this.selectArr);
			
			/*services.addMembersList({
				Vue: this,
				model: {
					id: this.$route.params.id,
					userIds: userId
				}
			}).then(res=>{
				if(res.code == 0){
					this.$router.push({
						name: 'ChatList'
					})
				}
			})*/
			this.isShow = false;
			this.model = []
		},
		//取消弹出框并清空选中选项
		cancel() {
			this.isShow = false;
			this.model = []
		},
		search() {
			if(this.model.length)
				this.$toast('之前选择未添加的用户已被初始化')
			const res = [
				{
					header: '/static/header2.jpg',
					userName: 'Mikey Jacson',
					id: '7'
				},
				{
					header: '/static/header3.jpg',
					userName: 'Jerry Tom',
					id: '8'
				},
			]

			this.$set(this,'userList', res)
			this._initModel() //初始化model
		},

		_initModel() {
			this.model = []
		}
	}
}