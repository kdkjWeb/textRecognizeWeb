/*import vueCropper from 'vue-cropper'
export default {
	data() {
		return {
      crap: false,
      previews: {},
			option: {
				img: 'https://o90cnn3g2.qnssl.com/0C3ABE8D05322EAC3120DDB11F9D1F72.png',
				autoCrop: true,
				autoCropWidth: 200,
				autoCropHeight: 200,
				fixedBox: true
			}
		}
	},
	methods: {
		goBack(){
			this.$router.back(-1)
		},
		uploadImg (e, num) {
	      //上传图片
        this.crap = true;
	      // this.option.img
	      var file = e.target.files[0]
	      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
	         alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
	         return false
	       }
	      var reader = new FileReader()
	      reader.onload = (e) => {
	        let data
	        if (typeof e.target.result === 'object') {
	          // 把Array Buffer转化为blob 如果是base64不需要
	          data = window.URL.createObjectURL(new Blob([e.target.result]))
	        } else {
	          data = e.target.result
	        }
	        if (num === 1) {
	          this.option.img = data
	        } else if (num === 2) {
	          this.example2.img = data
	        }
	      }
	      // 转化为base64
	      // reader.readAsDataURL(file)
	      // 转化为blob
	      reader.readAsArrayBuffer(file)
	    },
      // 实时预览函数
      realTime (data) {
        this.previews = data
      },
      // start 开始截图
      startCrop () {
      
      //this.crap = true
      this.$refs.cropper.startCrop()
    },
	},
	components: {
		vueCropper
	}
}*/



export default{
	data() {
		return {
			height: 0,
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
		goBack(){
			this.$router.back(-1)
		}
	},
	created() {
		this.height = (window.innerHeight-56) + 'px';
	},
}




























