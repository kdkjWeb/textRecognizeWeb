import Axios from './index'
import Vue from 'vue'
/**
 * 公用的server 方法
 */
export default {
	/**
	 * 查询数据 并且赋值
	 * @param  {[type]} options.url          查询的url
	 * @param  {[type]} options.searchModel  查询的params对应的model
	 * @param  {[type]} options.model        需要赋值的model 例如需要给user.model赋值，传入'user'即可
	 * @param  {[type]} options.Vue          Vue
	 * @param  {[type]} options.progress     是否需要加载动画
	 * @return {[type]}                      response
	 */
	fetchAssignment:({url, searchModel, model, Vue, progress})=>{
		if(progress)  
			Vue.$progress()
		return new Promise((resolve, reject)=>{
			axios.get(url, {
				params: searchModel
			})
			.then(res=>{
				if(progress)  Vue.$done()
				if(res.data.code === 0){
					Vue.$set(Vue[model], 'model', res.data.data.list)
					Vue.$set(Vue[model]['searchModel'], 'total', res.data.data.total)
					resolve(res)
				}else{
					reject(res)
				}
			}, errRes=>{
				if(progress)  Vue.$done()
				Vue.$toast('网络好像出问题了 = v =')
				reject(errRes)
			})
			.catch(err=>{
				if(progress)  Vue.$done()
				Vue.$toast('网络好像出问题了 = v =')
				reject(err)
			})
		})
	},
	//拿数据
	fetch: ({url, model, Vue, hidenLoading})=>{
		if(!hidenLoading) 
			Vue.$Loading.process()
		return new Promise((resolve, reject)=>{
			Axios.get(url, {
				params: model
			})
			.then(res=>{
				if(!hidenLoading)  Vue.$Loading.done()
				if(res.data.code === 0){
					resolve(res.data.data)
				}else{
					Vue.$toast(res?res.data.msg:"网络好像出问题了 = v =")
					reject(res)
					console.log(res)
				}
			}, errRes=>{
				console.log()
				if(!hidenLoading)  Vue.$Loading.done()
				Vue.$toast(errRes && errRes.data?errRes.data.msg : "网络好像出问题了 = v =")
				console.log(errRes)
				reject(errRes)
			})
			.catch(err=>{
				if(!hidenLoading)  Vue.$Loading.done()
				Vue.$toast("网络好像出问题了 = v =")
				console.log(err)
				reject(err)
			})
		})
	},
	//post数据	
	transport:({url, model, Vue, hidenLoading})=>{
		if(!hidenLoading){
			Vue.$Loading.process()
		}
		
		return new Promise((resolve, reject)=>{
			Axios.post(url, model)
			.then(res=>{
				if(!hidenLoading)  Vue.$Loading.done()
				if(res.data.code === 0){
					resolve(res.data.data || res.data)
				}else{
					Vue.$toast(res?res.data.msg:"网络好像出问题了 = v =")
					reject(res)
					console.log(res)
				}
			},errRes=>{
				if(!hidenLoading)  Vue.$Loading.done()
				Vue.$toast(errRes && errRes.data?errRes.data.msg : "网络好像出问题了 = v =")
				console.log(errRes)
				reject(errRes)
			})
			.catch(err=>{
				if(!hidenLoading)  Vue.$Loading.done()
				Vue.$toast("网络好像出问题了 = v =")
				console.log(err)
				reject(err)
			})
		})
	}
}