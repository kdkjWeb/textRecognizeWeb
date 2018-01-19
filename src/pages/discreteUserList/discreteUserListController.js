import services from './discreteUserListServices'
import scroll from 'better-scroll'
export default {
	data() {
		return {
			isShow: false,
			//所查询到的用户列表
			userList: [], 

			//所选择的活跃用户
			model: [], 
			height: 0,
			searchModel: ''
		}
	},
	methods:{
		goBack() {
			this.$router.goBack()
		},
		submit() {
			if(!this.model.length){
				this.$toast('你还没选择要邀请的用户');
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
			
			services.addDiscreteUserList({
				Vue: this,
				model: {
					id: this.$route.params.id,
					userIds: userId
				}
			}).then(res=>{
				if(res.code == 0){
					this.$router.push({
						name: 'GroupChat'
					})
				}
			})
			this.isShow = false;
			this.model = []
		},
		//取消弹出框并清空选中选项
		cancel() {
			this.isShow = false;
			this.model = []
		},
		search() {
			if(!this.searchModel){
				this.$toast('输入的内容不能为空')
			}else{
				const userName = this.userList.filter((el)=>{
					return el.username == this.searchModel
				})
				if(userName.length>0){
					this.userList = userName
				}else{
					this.$toast('没有搜索到此用户')
				}
				this.searchModel = ''
			}
			
			
			
			
			//console.log(this.searchModel)
			//services.searchUserList()
			//this.userList = this.userList.filter((el)=>{
			//	return el.username == this.searchModel
			//})
			//this.userList = ''
			//console.log(this.userList)
			
			
			/*if(this.model.length)
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
			this._initModel() //初始化model*/
		},

		_initModel() {
			this.model = []
		},
		//查询离散用户
		_discreteUserList(){
			services.discreteUserList({
				Vue: this
			})
			.then(res=>{
				//console.log(res)
				if(!res){
					this.$toast('当前还没有可添加的用户')
				}else{
					this.$set(this,'userList',res)
				}	
			})
		}
	},
	mounted(){
		//查询离散用户
		this._discreteUserList()
		//使用better-scroll添加滚动效果
		this.$nextTick(()=>{
	      new scroll(this.$refs['discreateUserList'],{
	      	click: true
	      })
	    })
		// 监听窗口改变重置高度
        window.addEventListener('resize', () => {
            this.height = (window.innerHeight-71) + 'px';
        })
		
	},
	created() {
		this.height = (window.innerHeight-71) + 'px';
	},
}