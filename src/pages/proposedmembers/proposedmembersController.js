import scroll from 'better-scroll'
import axios from 'axios'
export default {
	data() {
		return {
			groupMembers: [],
			selectArr: []
		}
	},
	methods: {
		goBack() {
			this.$router.back(-1)
		},
		deleteMember() {
			/*let arr = [];
			var len = this.groupMembers.length;
			for(var i=0; i<len; i++){
				if(this.selectArr.indexOf(i)>=0){
					console.log(this.selectArr.indexOf(i))
				}else{
		            arr.push(groupMembers[i])
		        }
			}
			this.groupMembers = arr;
			this.selectArr = []*/
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