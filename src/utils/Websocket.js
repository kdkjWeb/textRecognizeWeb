import {deepClone} from './publicFunctions'
import store from '@/store'

if(!'WebSocket' in window){
	alert("当前浏览器不支持在线聊天功能，请更换版本较新的浏览器")
}

const baseURL = 'ws://192.168.20.126:8080'
let ws
const bindFunc = (cntor, model) =>{
	if(!ws)
		return
	ws.onopen = (res) =>{
		console.log('链接成功')
	}

	ws.onmessage = (res)=>{
		console.log('接收信息成功')
		let result = JSON.parse(res.data)
		console.log(result)
		//先判断这条信息是否是这个人发送的， 是则再判断对应的消息设置发送状态为成功，不是则直接将信息push到history中
		if(result.msgFrom == cntor.username){
			for(let i = model.length - 1; i > -1 ; i--){
				if(model[i].message == result.msg 
					&& model[i].date - new Date(result.date) == 0){
					//找到发送者发送的该条信息
					model[i].status = 'success'
					break
				}
			}
		}else if(model){
			model.push({
				username: result.msgFrom,
				message: result.msg,
				groupId: result.groupId,
				date: new Date(result.date)
			})
		}else{
			//主要未读消息提醒
			//先清空未读消息
			
			store.commit('addUnReadCount', result.count) //添加总的未读消息数
			store.commit('addSelfUnReadCount', { //设置单个聊天室的未读消息
				msgFrom: result.msgFrom,
				count: result.count
			})	
		}
	}

	ws.onclose = (res)=> {
		console.log('链接已被关闭')
	}

	ws.onerror = (err) =>{
		console.log(err)
	}
}

export default {
	connect({url, params, model, connector}){
		const cntor = deepClone(connector)

		url? url = baseURL + '/' + url : url = baseURL
		if(JSON.stringify(params) != '{}'){
			url += '?'
			for(let [index, elem] of Object.entries(params)){
				url = url + index + '='  + elem + '&'
			}
			url = url.substring(0, url.length - 1)
		}

		
		if(ws){
			switch(ws.readyState){
				case 0 || 1://正在连接、连接成功
				let timer1 = setInterval(()=>{
					console.log(ws.readyState)
					console.log('关闭ws请求发送ing...')
					ws.close()
					if(ws.readyState == 3){
						clearInterval(timer1)
						ws = new WebSocket(url)
						store.commit('resetUnReadInfoNum')
						bindFunc(cntor, model)
						
					}
				}, 500)
				break

				case 2://正在关闭
				let timer2 = setInterval(()=>{
					console.log(ws.readyState)
					ws.close()
					if(ws.readyState == 3){
						clearInterval(timer2)
						ws = new WebSocket(url)
						store.commit('resetUnReadInfoNum')
						bindFunc(cntor, model)
					}
				}, 500)
				break

				default: //为空
				ws = new WebSocket(url)
				store.commit('resetUnReadInfoNum')
				bindFunc(cntor, model)
			}
		}else{
			store.commit('resetUnReadInfoNum')
			ws = new WebSocket(url)
		}
		

		if(!ws.onmessage){
			bindFunc(cntor, model)
		}
		
	},
	send(msg) {
		console.log(ws)
		if(!ws || ws.readyState != 1)
			return '当前不存在websocket链接信息'

		ws.send(JSON.stringify(msg))
	},
	close() {
		if(ws)
			ws.close()
	},
}