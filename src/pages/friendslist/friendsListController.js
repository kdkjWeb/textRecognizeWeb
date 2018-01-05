import friendsNote from '../friendsnote/friendsnote'
export default {
	data() {
		return {
			isShow: true,
			friendsList: [{
				friendsId: 1,
				friendsName: '好友1',
				friendsSrc: 'http://www.qqzhi.com/uploadpic/2014-09-24/084641953.jpg'
			},{
				friendsId: 2,
				friendsName: '好友2',
				friendsSrc: 'http://www.qqzhi.com/uploadpic/2014-09-24/084641953.jpg'
			},{
				friendsId: 3,
				friendsName: '好友4',
				friendsSrc: 'http://www.qqzhi.com/uploadpic/2014-09-24/084641953.jpg'
			},{
				friendsId: 4,
				friendsName: '好友4',
				friendsSrc: 'http://www.qqzhi.com/uploadpic/2014-09-24/084641953.jpg'
			},{
				friendsId: 5,
				friendsName: '好友5',
				friendsSrc: 'http://www.qqzhi.com/uploadpic/2014-09-24/084641953.jpg'
			},{
				friendsId: 6,
				friendsName: '好友6',
				friendsSrc: 'http://www.qqzhi.com/uploadpic/2014-09-24/084641953.jpg'
			}],
			nodeShowList: {}
		}
	},
	components: {
		friendsNote
	},
	methods: {
		nodeList(val) {
			this.isShow = false;
			this.nodeShowList = val;
			this.$refs['nodeShowList'].nodeList()
		}
	}
}