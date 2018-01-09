import friendsNote from '../friendsnote/friendsnote'
import friendsDel from '../delete/delete'
import scroll from 'better-scroll'
import axios from 'axios'
export default {
	data() {
		return {
			height: 0,
			title: null,
			friendsList: [],
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
		deleteItem(index){
			this.friendsList.splice(index,1);
		},
		search() {
			this.$router.push('/friendssearch')
		}
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
        axios.get('/static/data.json')
        .then(res=>{
        	//console.log(res.data)
        	this.title = res.data.title;
        	this.friendsList = res.data.friendsList;
        })
        .catch(error=>{
        	console.log(error)
        })

	}
}