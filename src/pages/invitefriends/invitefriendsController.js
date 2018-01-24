import scroll from 'better-scroll'
import services from './invitefriendsServices'
export default {
	data() {
		return {
			groupMembers: [],
			selectArr: [],
			isShow: false,
			height: 0
		}
	},
	methods: {
		// 添加选中的用户到selectArr
		inviteUser(id){
			const result = this.selectArr.findIndex((val=>{
				return val == id;
			}))
			if(result < 0){
				this.selectArr.push(id)
			}else{
				this.selectArr.splice(result,1)
			}
			
		},
		//返回到上一级 
		goBack() {
			this.$router.back(-1)
		},
		//点击右上角确定按钮，打开弹出框
		addMember() {
			if(!this.selectArr.length){
				this.$toast('你还没选择要邀请的好友');
			}else{
				this.isShow = true;
			}
		},
		//点击确定提交选中的成员
		success() {
			let userId = this.selectArr.map(item => item).join();
			
			services.addMembersList({
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
			},err=>{
				this.$toast(err.msg)
			})
			this.isShow = false;
			this.selectArr = []
		},
		//取消弹出框并清空选中选项
		cancel() {
			this.isShow = false;
			this.selectArr = []
		},
		//获取可邀请好友的列表
		_groupMembersList(){
			services.groupMembersList({
				Vue: this,
				model: {
					id: this.$store.state.user.id
				}
			})
			.then(res=>{
				this.$set(this, 'groupMembers', res)
			})
		}
	},
	created() {
		this.height = (window.innerHeight-56) + 'px';
	},
	mounted() {
		//使用better-scroll添加滚动效果
		this.$nextTick(()=>{
	      new scroll(this.$refs['MembersWrapper'],{
	      	click: true
	      })
	    })
	    // 监听窗口改变重置高度
        window.addEventListener('resize', () => {
            this.height = (window.innerHeight-56) + 'px';
        })
	
	  //获取可邀请好友的列表
		this._groupMembersList()
		
		
	}
}