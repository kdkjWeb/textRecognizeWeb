import scroll from 'better-scroll'
export default{
	data() {
		return {
			height: 0,
			itemIndex: null,
			userHead: {},
			headImg: [
				{
					id: '1',
					title: '1.jpg',
					url: '/static/headImg/1.jpg',
				},
				{
					id: '2',
					title: '2.jpg',
					url: '/static/headImg/2.jpg',
				},
				{
					id: '3',
					title: '3.jpg',
					url: '/static/headImg/3.jpg',
				},
				{
					id: '4',
					title: '4.jpg',
					url: '/static/headImg/4.jpg',
				},
				{
					id: '5',
					title: '5.jpg',
					url: '/static/headImg/5.jpg',
				},
				{
					id: '7',
					title: '7.jpg',
					url: '/static/headImg/7.jpg',
				},
				{
					id: '8',
					title: '8.jpg',
					url: '/static/headImg/8.jpg',
				},
				{
					id: '9',
					title: '9.jpg',
					url: '/static/headImg/9.jpg',
				},
				{
					id: '10',
					title: '10.jpg',
					url: '/static/headImg/10.jpg',
				},
				{
					id: '11',
					title: '11.jpg',
					url: '/static/headImg/11.jpg',
				},
				{
					id: '12',
					title: '12.jpg',
					url: '/static/headImg/12.jpg',
				},
				{
					id: '13',
					title: '13.jpg',
					url: '/static/headImg/13.jpg',
				},
				{
					id: '14',
					title: '14.jpg',
					url: '/static/headImg/14.jpg',
				},
				{
					id: '15',
					title: '15.jpg',
					url: '/static/headImg/15.jpg',
				},
				{
					id: '6',
					title: '6.jpg',
					url: '/static/headImg/6.jpg',
				}
				]
		}
	},
	methods: {
		//返回上一个页面
		goBack(){
			this.$router.back(-1)
		},
		//选择头像
		shooseHead(item,index) {
			this.itemIndex = index;
			this.userHead = item;
		},
		//提交所选择的头像
		success() {
			console.log(this.userHead)
		}
	},
	created() {
		this.height = (window.innerHeight-56) + 'px';
	},
	mounted() {
		//使用better-scroll添加滚动效果
		this.$nextTick(()=>{
	      new scroll(this.$refs['ChangeHead'],{
	      	click: true
	      })
	    })
	    // 监听窗口改变重置高度
        window.addEventListener('resize', () => {
            this.height = (window.innerHeight-56) + 'px';
        })
	}
}




























