
import friendsDel from '../delete/delete'
import scroll from 'better-scroll'
import services from './friendsListServices'
import commonServices from '@/server/commonServices'

export default {
	data() {
		return {
			height: 0,
			title: '好友',
			isShow: false,

			//删除确认框
			deleteDialog: {
				show: false,
				friendId: null,
				index: null,
			},
			
		}
	},
	computed: {
		friendsList() {
			return this.$store.getters.getFriendList
		}
	},
	components: {
		friendsDel
	},
	created() {
		this.height = (window.innerHeight-112) + 'px';
	},
	methods: {
		nodeList(val) {
			this.$router.push({name:'FriendsNote',params:val})

			
		},
		enterSelfChatRoom(room){
			 const {nickname, username, password, pictureAddress} = room
			 console.log(room)
			  this.$router.push({
			   	name: 'SelfChatRoom',
			   	params: {nickname,  username, password, pictureAddress}
			   })
		},

		deleteItem(index,item){
			this.deleteDialog.show = true
			Object.assign(this.deleteDialog, {
				friendId: item.id,
				index: index
			})
		},

		deleteSubmit() {
			//提交删除好友信息
			commonServices.fetch({
				url: 'user/delFriend',
				model: {
					id: this.deleteDialog.friendId
				},
				Vue: this,
			})
			.then(res=>{
			    console.log(res)
			    if(res == '删除成功'){
			    	this.friendsList.splice(this.deleteDialog.index,1);
			    }
			}, err=>{
				console.log(err)
			})
			this.deleteDialog.show = false
		},
		deleteCancel() {
			this.deleteDialog.show = false
		},
			
	},
	mounted() {
		//使用better-scroll添加滚动效果
		this.$nextTick(()=>{
	      new scroll(this.$refs['FriendsListWrapper'],{
	      	click: true
	      })
	    })
	    // 监听窗口改变重置高度
        window.addEventListener('resize', () => {
            this.height = (window.innerHeight-112) + 'px';
        })

        // 请求接口数据
        services.searchFriendList({
        	Vue: this,
        	model: {
        		id: this.$store.state.user.id
        	},
        	hidenLoading: true,
        })
        .then(res=>{
        	if(res){
				this.$store.commit('setFriendList', res)
			} 
        })
      
    
       
      
	}
}