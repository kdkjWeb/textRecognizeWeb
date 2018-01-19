import scroll from 'better-scroll'
import axios from 'axios'
import services from './proposedmembersServices'
export default {
	data() {
		return {
			groupMembers: [],
			model: '',
			isShow: false
		}
	},
	methods: {
		// 添加选中的用户到selectArr
		/*inviteUser(id){
			console.log(id)
			const result = this.selectArr.findIndex((val=>{
				return val == id;
			}))
			if(result < 0){
				this.selectArr.push(id)
			}else{
				this.selectArr.splice(result,1)
			}
			
		},*/
		inviteUser(id){
			this.model = id.toString();
			//console.log(typeof this.model.toString())
		},
		goBack() {
			this.$router.back(-1)
		},
		deleteMember() {
			if(this.model == ''){
				this.$toast('你还没选择要删除的成员');
			}else{
				this.isShow = true;
			}
		},
		//提交需要踢出的群成员
		success() {
			//let userId = this.selectArr.map(item => item).join();
			let userId = this.model;
				console.log(userId);
			services.proposedMembers({
				Vue: this,
				model: {
					groupId: this.$route.params.id,
					userId: userId
				}
			}).then(res=>{
				/*if(res.code == 0){
					this.$router.push({
						name: 'GroupChat'
					})
				}*/
				//this.$toast(res.msg)
				this._searchGroupMembers()
			},err=>{
				this.$toast(err.msg)
			})
			this.isShow = false;
			this.model = ''
		},
		cancel() {
			this.isShow = false;
			this.mmodel = []
		},
			// 获取群成员的列表
		_searchGroupMembers(){
	        services.searchGroupMembers({
	        		Vue: this,
				model: {
					id: this.$route.params.id
				}
	        })
	        .then(res=>{
	        		console.log(res)
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
        //获取群成员的列表
		this._searchGroupMembers();
		
	}
}