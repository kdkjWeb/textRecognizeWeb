export default {
	props: {
		nodeShowList: {
			type: Object,
			default: {}
		}
	},
	data() {
		return {
			title: '备注信息',
			nodeShow: false
		}
	},
	methods: {
		nodeList(){
			this.nodeShow = true;
		}
	}
}