import friendsNote from '../friendsnote/friendsnote'
import friendsDel from '../delete/delete'
import scroll from 'better-scroll'
import services from './friendsListServices'
export default {
	data() {
		return {
			height: 0,
			title: '好友',
			friendsList: [], //{uid2: 用户id}
			isShow: false
		}
	},
	components: {
		friendsNote,
		friendsDel
	},
	created() {
		this.height = (window.innerHeight-112) + 'px';
	},
	methods: {
		nodeList(val) {
	
			let data = val;
			this.$router.push({name:'FriendsNote',params:data})

			
		},
		enterSelfChatRoom(room){
			 const {id, nickname} = room
			  this.$router.push({
			   	name: 'SelfChatRoom',
			   	params: {id, nickname }
			   })
		},
		deleteItem(index,item){
			this.friendsList.splice(index,1);
			console.log(item)
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
        	}
        })
        .then(res=>{
        	console.log(res)
        	this.$set(this, 'friendsList', res)
        })
        

	}
}