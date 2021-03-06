import {deepClone} from './publicFunctions'
import store from '@/store'
import Shock from './Shock'
import {getItem,setItem} from './localStorage'





if(!'WebSocket' in window){
	alert("当前浏览器不支持在线聊天功能，请更换版本较新的浏览器")
}

const BASEURL = 'ws://192.168.20.50:8081'
 //const BASEURL = 'ws://192.168.20.3:8080/chatroom'
 //const BASEURL = 'ws://192.168.20.136:8088/chatroom'
let ws = {}
const bindFunc = (cntor, model, type) =>{

	if(!ws[type])
		return
	ws[type].onopen = (res) =>{
		console.log('链接成功')
	}//sss

	ws[type].keepAliveTimer = setInterval(()=>{
		ws[type].send('ping')
	}, 30000)

	ws[type].detectAliveTimer = setInterval(()=>{
		if(ws[type].readyState != 1){
			//console.log(ws[type].readyState)
			//console.log('关闭心跳 定时器...')
			//console.log(ws[type].detectAliveTimer)
			clearInterval(ws[type].keepAliveTimer)
			clearInterval(ws[type].detectAliveTimer)
		}
	}, 30000)


	ws[type].onmessage = (res)=>{
		// console.log(res)
		if(res.data == '禁言'){
			console.log(666)
			store.commit('setBan','你已被禁言！') 
			return;
		}else{
			store.commit('setBan','') 
		}
		let result
		if(!res.data)
			return
		try{
			let reg = /\\n/g;
			result = typeof res.data == 'string' ?JSON.parse(res.data.replace(reg, '<br/>')) : res.data
			console.log(result)	
		}catch(e){
			return false
		}
		

		//先判断这条信息是否是这个人发送的， 是则再判断对应的消息设置发送状态为成功，不是则直接将信息push到history中
		if(result.msgFrom == cntor.username && result.masterName == undefined){
			for(let i = model.length - 1; i > -1 ; i--){
				if(model[i].message == result.msg 
					&& model[i].date - new Date(result.date) == 0){
					//找到发送者发送的该条信息
					model[i].status = 'success'
					break
				}
			}
		}else if(typeof res.data == 'object' && model){
			// 二进制图片
			model.push({
				username: result.msgFrom,
				img: URL.createObjectURL(res.data),
				groupId: result.groupId,
				date: new Date(result.date),
				pictureAddress: result.pictureAddress
			})
		}else if(model){
			//console.log(result.msg)
			let str = result.msg;
			let arr = [];
			let arr1 = [];
			let resultMsg;
			if(str.includes('`]')){
				console.log(666)
				arr = str.split('[`');
				for(var i=0; i<arr.length; i++){
					if(arr[i].includes('`]')){
						let b = arr[i];
						arr1.push(b.split('`]')[0].replace(b.split('`]')[0],'<img style="width:15px;height:15px;" class="face" src="static/icon/'+b.split('`]')[0]+'.png"/>'));
						
						arr1.push(arr[i].split('`]')[1])
					}else if(arr[i]){
						arr1.push(arr[i])
					}
				}
				resultMsg = arr1.join('');
			}else{
				resultMsg = str
				console.log(resultMsg)
			}
			model.push({
				username: result.msgFrom,
				//message: result.msg,
				message: resultMsg,
				groupId: result.groupId,
				date: new Date(result.date),
				pictureAddress: result.pictureAddress
			})
			if(getItem('mute')){
				Shock()
			}
			
		}else{
			//主要未读消息提醒
			//先清空未读消息
			
			store.commit('addUnReadCount', result.count) //添加总的未读消息数
			store.commit('addSelfUnReadCount', { //设置单个聊天室的未读消息
				msgFrom: result.msgFrom,
				count: result.count
			})
			if(result.count && getItem('mute')){
				Shock()	
			}
		}
	}

	ws[type].onclose = (res)=> {
		console.log(res)
		if(res.reason){
			console.log(res.reason)
			store.commit('setKickOut',res.reason) 
			return;	
		}else{
			store.commit('setKickOut','') 
		}
		console.log('链接已被关闭')

	}

	ws[type].onerror = (err) =>{
		console.log(`WebSocket建立失败,失败原因为: ${err}`)
	}
}

export default {
	connect({url, params, model, connector}){
		const cntor = deepClone(connector)
		const type = url == 'totalWs' ? 'root': 'chat'

		url? url = BASEURL + '/' + url : url = BASEURL
		if(JSON.stringify(params) != '{}'){
			url += '?'
			for(let [index, elem] of Object.entries(params)){
				url = url + index + '='  + elem + '&'
			}
			url = url.substring(0, url.length - 1)
		}

		
		if(ws[type]){
			switch(ws[type].readyState){
				case 0 || 1://正在连接、连接成功
				let timer1 = setInterval(()=>{
					ws[type].close()
					if(ws[type].readyState == 3){
						clearInterval(timer1)
						ws[type] = new WebSocket(url)
						store.commit('resetUnReadInfoNum')
						bindFunc(cntor, model, type)
						
					}
				}, 500)
				break

				case 2://正在关闭
				let timer2 = setInterval(()=>{
					ws[type].close()
					if(ws[type].readyState == 3){
						clearInterval(timer2)
						ws[type] = new WebSocket(url)
						store.commit('resetUnReadInfoNum')
						bindFunc(cntor, model, type)
					}
				}, 500)
				break

				default: //为空
				ws[type] = new WebSocket(url)
				store.commit('resetUnReadInfoNum')
				bindFunc(cntor, model, type)
			}
		}else{
			store.commit('resetUnReadInfoNum')
			ws[type] = new WebSocket(url)
		}
		

		if(!ws[type].onmessage){
			bindFunc(cntor, model, type)
		}
		
	},
	send(msg) {
		if(!ws['chat'] || ws['chat'].readyState != 1)
			return '当前不存在websocket链接信息'
		console.log('发送消息ing...')
		ws['chat'].send(JSON.stringify(msg))
	},//sss
	close(type) {
		if(type && ws && ws[type]){
			clearInterval(ws[type].keepAliveTimer)
			clearInterval(ws[type].detectAliveTimer)
			ws[type].close()
		}
	},
}