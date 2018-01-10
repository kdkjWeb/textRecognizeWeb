import LoadingVue from './Loading.vue'
let Loading = {}

Loading.install = (Vue, options) =>{
	let loadingConstructor = Vue.extend(LoadingVue),
        tpl = new loadingConstructor().$mount()

    tpl.show = true
	Vue.prototype.$Loading = {
		process() {
			if(document.getElementsByClassName('loading').length){
	            // 如果loading还在，则不再执行
	            return;
	        }

		    Vue.nextTick(()=>{
	            document.body.appendChild(tpl.$el)
	        })
		},
		done() {
			tpl.show = false
        	document.body.removeChild(tpl.$el)
		},
	}
}

export default Loading