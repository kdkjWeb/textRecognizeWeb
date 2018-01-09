import scroll from 'better-scroll'
import axios from 'axios'
export default {
	data() {
		return {
			groupMembers: [],
			selectArr: [],
			isShow: false
		}
	},
	methods: {
		goBack() {
			this.$router.back(-1)
		},
		deleteMember() {
			//var userId = this.selectArr.map(item => item).join();
			//console.log(userId)
			
			if(!this.selectArr.length){
				this.$toast('你还没选择要删除的成员');
			}else{
				this.isShow = true;
			}
		},
		success() {
			let userId = this.selectArr.map(item => item).join();
				console.log(userId);
			this.isShow = false;
			this.selectArr = []
		},
		cancel() {
			this.isShow = false;
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

		// 请求接口数据
        axios.get('/static/data.json')
        .then(res=>{
        	this.groupMembers = res.data.friendsList;
        })
        .catch(error=>{
        	console.log(error)
        })
	}
}